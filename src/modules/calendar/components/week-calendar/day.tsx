import { FC, useState } from 'react';

import { users } from '../../../../__mock__/users';
import { ICalendarEvent } from '../../calendar.interface';
import { CalendarEvent } from './event';
import { CALENDAR_DAY_HEIGHT, Hour } from './hour';

interface DayProps {
  events: ICalendarEvent[];
  day: Date;
}
export const Day: FC<DayProps> = ({ events, day }) => {
  const [e, setEvents] = useState(events);

  function onUpdate(event: ICalendarEvent) {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  }

  return (
    <div className="w-full flex flex-col relative overflow-hidden" style={{ maxHeight: CALENDAR_DAY_HEIGHT }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <Hour key={i} />
      ))}
      {e.map((event, i) => (
        <CalendarEvent key={i} event={event} day={day} attendees={users} onUpdate={onUpdate} />
      ))}
    </div>
  );
};
