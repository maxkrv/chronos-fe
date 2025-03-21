import { FC } from 'react';

import dayjs from '../../../../../shared/lib/dayjs';
import { EventCategory, ICalendarEvent } from '../../../calendar.interface';
import { CALENDAR_DAY_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventCard } from './event-card';
import { EventReminder } from './event-reminder';

const getReminderOccurrenceToday = (startAt: Date, repeatAfter?: number, nowTime: Date = new Date()): Date | null => {
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

interface CalendarEventProps {
  event: ICalendarEvent;
  day: Date;
  onUpdate: (event: ICalendarEvent) => void;
  setIsEditEventOpen: (event: ICalendarEvent) => void;
}

export const CalendarEvent: FC<CalendarEventProps> = ({ event, day, onUpdate, setIsEditEventOpen }) => {
  if (event.category === 'OCCURANCE') {
    return null;
  }

  const now = dayjs(day);
  const startIsToday = dayjs(event.startAt).isSame(now, 'day');
  const endIsToday = dayjs(event.endAt).isSame(now, 'day');
  const reminderTime = getReminderOccurrenceToday(event.startAt, event.repeat?.repeatTime, now.toDate());
  const isReminderNotToday = event.category === EventCategory.REMINDER && !reminderTime;

  if (!event || !(startIsToday || endIsToday) || isReminderNotToday) return null;

  const minutesFromStartOfDay = dayjs(event.startAt).diff(now.startOf('day'), 'minute');
  const indentTop = Math.max((minutesFromStartOfDay / MINUTES_IN_DAY) * CALENDAR_DAY_HEIGHT, 0);
  const eventHeight = Math.min(
    indentTop,
    (dayjs(event.endAt).diff(event.startAt, 'minute') / MINUTES_IN_DAY) * CALENDAR_DAY_HEIGHT
  );

  return event.category === EventCategory.REMINDER ? (
    <EventReminder event={event} indentTop={indentTop} onUpdate={onUpdate} setIsEditEventOpen={setIsEditEventOpen} />
  ) : (
    <EventCard
      event={event}
      day={day}
      eventHeight={eventHeight}
      indentTop={indentTop}
      onUpdate={onUpdate}
      setIsEditEventOpen={setIsEditEventOpen}
    />
  );
};
