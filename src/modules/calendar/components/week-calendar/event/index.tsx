import type { FC } from 'react';
import type { DateRange } from 'react-day-picker';

import dayjs from '../../../../../shared/lib/dayjs';
import { EventCategory, type ICalendarEvent } from '../../../calendar.interface';
import { CALENDAR_DAY_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventCard } from './event-card';
import { EventReminder } from './event-reminder';

export const getOccurrenceToday = (startAt: Date, repeatAfter?: number, nowTime: Date = new Date()): Date | null => {
  if (!repeatAfter || repeatAfter <= 0) return null;
  const now = dayjs(nowTime);
  const todayStart = now.startOf('day');
  const todayEnd = now.endOf('day');
  const start = dayjs(startAt); // Start of the day

  if (start.isBetween(todayStart, todayEnd, null, '[)')) return start.toDate();

  const diff = now.diff(start, 'minute');
  const lastOccurrence = start.add(Math.floor(diff / repeatAfter) * repeatAfter, 'minute');
  const nextOccurrence = start.add(Math.ceil(diff / repeatAfter) * repeatAfter, 'minute');

  if (nextOccurrence.isBetween(todayStart, todayEnd, null, '[)')) return nextOccurrence.toDate();
  if (lastOccurrence.isBetween(todayStart, todayEnd, null, '[)')) return lastOccurrence.toDate();

  return null;
};

export const getTodayEvent = (event: ICalendarEvent, day: Date): DateRange | null => {
  const now = dayjs(day).hour(0).minute(0).second(0).millisecond(0);
  const startAt = dayjs(event.startAt);
  const endAt = event.endAt ? dayjs(event.endAt) : null;

  if (endAt && startAt.isAfter(endAt)) return null;

  // 1. If it's a repeating event, get today's occurrence
  const repeatStartTime = getOccurrenceToday(event.startAt, event.eventRepeat?.repeatTime, now.toDate());
  if (event.eventRepeat && !repeatStartTime) return null;
  // 2. Check if the event is ongoing or happening on the given day
  if (!endAt && !repeatStartTime) return startAt.isSame(now, 'day') ? { from: startAt.toDate(), to: undefined } : null;

  const startsOnOrBeforeDay = (repeatStartTime ? dayjs(repeatStartTime) : startAt).isSameOrBefore(now, 'day');
  const endsOnOrAfterDay = endAt ? (repeatStartTime ? dayjs(repeatStartTime) : endAt).isSameOrAfter(now, 'day') : true; // If no end, it's ongoing

  if (!startsOnOrBeforeDay || !endsOnOrAfterDay) return null; // Event does not overlap with the day

  return {
    from: repeatStartTime || startAt.toDate(),
    to: endAt
      ? repeatStartTime
        ? dayjs(repeatStartTime).add(endAt.diff(startAt)).toDate()
        : endAt.toDate()
      : undefined
  };
};
const MILISECONDS_IN_DAY = 86400000;

interface CalendarEventProps {
  event: ICalendarEvent;
  day: Date;
  onUpdate: (event: ICalendarEvent) => void;
  onEdit: (event: ICalendarEvent) => void;
  activeEventId: number | null;
  setActiveEventId: (id: number | null) => void;
}

export const CalendarEvent: FC<CalendarEventProps> = ({
  event,
  day,
  onUpdate,
  onEdit,
  activeEventId,
  setActiveEventId
}) => {
  if (event.category === EventCategory.OCCASION) {
    return null;
  }
  const dayStart = dayjs(day).hour(0).minute(0).second(0).millisecond(0);
  const dayEnd = dayjs(day).hour(23).minute(59).second(59).millisecond(999);
  const todayEvent = getTodayEvent(event, day);

  if (!todayEvent) return null;
  if (todayEvent.to) {
    if (
      dayjs(todayEvent.to).diff(todayEvent.from) >= MILISECONDS_IN_DAY &&
      !dayjs(todayEvent.to).isBetween(dayStart, dayEnd, null, '(]') &&
      !dayjs(todayEvent.from).isBetween(dayStart, dayEnd, null, '[)')
    ) {
      return null;
    }
    if (dayjs(todayEvent.to).isSame(dayStart, 'minute')) {
      return null;
    }
  }

  const minutesFromStartOfDay = dayjs(todayEvent.from).diff(dayStart, 'minute');
  const indentTop = Math.max((minutesFromStartOfDay / MINUTES_IN_DAY) * CALENDAR_DAY_HEIGHT, 0);

  if (event.category === EventCategory.REMINDER) {
    return (
      <EventReminder
        event={{ ...event, startAt: todayEvent.from || event.startAt }}
        indentTop={indentTop}
        onUpdate={onUpdate}
        setIsEditEventOpen={onEdit}
        activeEventId={activeEventId}
        setActiveEventId={setActiveEventId}
      />
    );
  }
  if (!todayEvent.to) {
    todayEvent.to = dayjs(todayEvent.from).add(30, 'minute').toDate();
  }
  const to = dayjs(todayEvent.to).isAfter(dayEnd) ? dayEnd : dayjs(todayEvent.to);
  const from = dayjs(todayEvent.from).isBefore(dayStart) ? dayStart : dayjs(todayEvent.from);

  let eventHeight = (dayjs(to).diff(dayjs(from), 'minute') / MINUTES_IN_DAY) * CALENDAR_DAY_HEIGHT;
  if (eventHeight > CALENDAR_DAY_HEIGHT - indentTop) {
    eventHeight = CALENDAR_DAY_HEIGHT - indentTop;
  }
  return (
    <EventCard
      event={{ ...event, startAt: todayEvent.from || event.startAt, endAt: todayEvent.to }}
      day={day}
      eventHeight={eventHeight}
      indentTop={indentTop}
      onUpdate={onUpdate}
      onEdit={onEdit}
      activeEventId={activeEventId}
      setActiveEventId={setActiveEventId}
    />
  );
};
