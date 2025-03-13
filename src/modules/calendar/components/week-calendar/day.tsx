import { useState } from 'react';

import { events } from '../../../../__mock__/events';
import { users } from '../../../../__mock__/users';
import { ICalendarEvent } from '../../calendar.interface';
import { CalendarEvent } from './event/event';
import { CALENDAR_DAY_HEIGHT, Hour } from './hour';

export const Day = () => {
  const [e, setEvents] = useState(events);
  function onUpdate(event: ICalendarEvent) {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  }
  return (
    <div className="w-full flex flex-col relative overflow-hidden" style={{ maxHeight: CALENDAR_DAY_HEIGHT }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <Hour key={i} />
      ))}
      {e
        // .sort((a, b) => {
        //   if (!a.endAt && !b.endAt) return 0;
        //   if (!a.endAt) return -1;
        //   if (!b.endAt) return 1;
        //   const durationA = a.endAt.getTime() - a.startAt.getTime();
        //   const durationB = b.endAt.getTime() - b.startAt.getTime();
        //   return durationA - durationB;
        // })
        .map((event, i) => (
          <CalendarEvent
            key={i}
            event={event}
            day={new Date('2025-03-01T00:00:00Z')}
            attendees={users}
            onUpdate={onUpdate}
          />
        ))}
    </div>
  );
};
