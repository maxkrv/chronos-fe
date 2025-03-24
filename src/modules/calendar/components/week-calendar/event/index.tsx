import { FC } from 'react';
import { DateRange } from 'react-day-picker';

import dayjs from '../../../../../shared/lib/dayjs';
import { EventCategory, ICalendarEvent } from '../../../calendar.interface';
import { CALENDAR_DAY_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventCard } from './event-card';
import { EventReminder } from './event-reminder';

const getOccurrenceToday = (startAt: Date, repeatAfter?: number, nowTime: Date = new Date()): Date | null => {
  if (!repeatAfter || repeatAfter <= 0) return null;
  const now = dayjs(nowTime);
  const todayStart = now.startOf('day');
  const todayEnd = now.endOf('day');
  const start = dayjs(startAt); // Start of the day

  if (start.isBetween(todayStart, todayEnd, null, '[)')) return start.toDate();

  const diff = now.diff(start, 'millisecond');
  const lastOccurrence = start.add(Math.floor(diff / repeatAfter) * repeatAfter, 'millisecond');
  const nextOccurrence = start.add(Math.ceil(diff / repeatAfter) * repeatAfter, 'millisecond');

  if (lastOccurrence.isBetween(todayStart, todayEnd, null, '[)')) return lastOccurrence.toDate();
  if (nextOccurrence.isBetween(todayStart, todayEnd, null, '[)')) return nextOccurrence.toDate();

  return null;
};

export const getTodayEvent = (event: ICalendarEvent, day: Date): DateRange | null => {
  const now = dayjs(day).hour(0).minute(0).second(0).millisecond(0);
  const startAt = dayjs(event.startAt);
  const endAt = event.endAt ? dayjs(event.endAt) : null;

  if (startAt.isAfter(endAt)) return null;

  // 1. If it's a repeating event, get today's occurrence
  const repeatStartTime = getOccurrenceToday(event.startAt, event.repeat?.repeatTime, now.toDate());
  if (event.repeat && !repeatStartTime) return null;

  // 2. Check if the event is ongoing or happening on the given day
  if (!endAt && !repeatStartTime && !startAt.isSame(now, 'day')) return null; // Event has no end and is not repeating
  const startsOnOrBeforeDay = startAt.isSameOrBefore(now, 'day');
  const endsOnOrAfterDay = endAt ? endAt.isSameOrAfter(now, 'day') : true; // If no end, it's ongoing

  if (!startsOnOrBeforeDay || !endsOnOrAfterDay) return null; // Event does not overlap with the day

  return {
    from: repeatStartTime || startAt.toDate(),
    to: endAt
      ? repeatStartTime
        ? dayjs(repeatStartTime).add(endAt.diff(startAt)).toDate()
        : endAt.toDate()
      : undefined
  }; //todo: fix same on backend and month calendar
};
const MILISECONDS_IN_DAY = 86400000;

interface CalendarEventProps {
  event: ICalendarEvent;
  day: Date;
  onUpdate: (event: ICalendarEvent) => void;
  onEdit: (event: ICalendarEvent) => void;
}

export const CalendarEvent: FC<CalendarEventProps> = ({ event, day, onUpdate, onEdit }) => {
  if (event.category === EventCategory.OCCASION) {
    return null;
  }
  const dayStart = dayjs(day).hour(0).minute(0).second(0).millisecond(0);
  const dayEnd = dayjs(day).hour(23).minute(59).second(59).millisecond(999);
  const todayEvent = getTodayEvent(event, day);
  if (
    !todayEvent ||
    (todayEvent.to &&
      dayjs(todayEvent.to).diff(todayEvent.from) >= MILISECONDS_IN_DAY &&
      !dayjs(todayEvent.to).isBetween(dayStart, dayEnd, null, '(]') &&
      !dayjs(todayEvent.from).isBetween(dayStart, dayEnd, null, '(]'))
  )
    return null;

  const minutesFromStartOfDay = dayjs(todayEvent.from).diff(dayStart, 'minute');
  const indentTop = Math.max((minutesFromStartOfDay / MINUTES_IN_DAY) * CALENDAR_DAY_HEIGHT, 0);
  const eventHeight = Math.min(
    CALENDAR_DAY_HEIGHT,
    Math.max(
      0,
      dayjs(todayEvent.to).diff(
        dayjs(todayEvent.from).year(day.getFullYear()).month(day.getMonth()).date(day.getDate()),
        'minute'
      ) / MINUTES_IN_DAY
    ) * CALENDAR_DAY_HEIGHT
  );

  return event.category === EventCategory.REMINDER ? (
    <EventReminder event={event} indentTop={indentTop} onUpdate={onUpdate} setIsEditEventOpen={onEdit} />
  ) : (
    <EventCard
      event={event}
      day={day}
      eventHeight={eventHeight}
      indentTop={indentTop}
      onUpdate={onUpdate}
      onEdit={onEdit}
    />
  );
};
