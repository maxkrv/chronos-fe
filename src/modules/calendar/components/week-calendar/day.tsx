import { FC, useState } from 'react';

import { users } from '../../../../__mock__/users';
import { ICalendarEvent } from '../../calendar.interface';
import { AddEventModal } from '../modal/add-event-modal';
import { CalendarEvent } from './event';
import { CALENDAR_DAY_HEIGHT, Hour } from './hour';

interface DayProps {
  events: ICalendarEvent[];
  day: Date;
}
export const Day: FC<DayProps> = ({ events, day }) => {
  const [e, setEvents] = useState(events);
  const [open, setOpen] = useState(false);
  const [startAt, setStartAt] = useState<Date | undefined>(undefined);
  const [endAt, setEndAt] = useState<Date | undefined>(undefined);

  function onUpdate(event: ICalendarEvent) {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  }

  const setDate = (timeStart: number, timeEnd: number) => {
    const startAt = new Date(day);
    startAt.setHours(timeStart);
    startAt.setMinutes(0);

    const endAt = new Date(day);
    endAt.setHours(timeEnd);
    endAt.setMinutes(0);

    setStartAt(startAt);
    setEndAt(endAt);
    setOpen(true);
  };

  return (
    <>
      <div
        className="w-full flex flex-col relative overflow-hidden min-w-24"
        style={{ maxHeight: CALENDAR_DAY_HEIGHT }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <Hour hour={i} key={i} setDate={setDate} />
        ))}
        {e.map((event, i) => (
          <CalendarEvent key={i} event={event} day={day} attendees={users} onUpdate={onUpdate} />
        ))}
      </div>

      <AddEventModal open={open} onClose={() => setOpen(false)} endDate={endAt} startDate={startAt} action="add" />
    </>
  );
};
