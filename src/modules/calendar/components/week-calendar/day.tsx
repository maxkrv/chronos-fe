import { useMutation } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import { ICalendarEvent } from '../../calendar.interface';
import { EventService } from '../../services/event.service';
import { AddEventModal } from '../modal/add-event-modal';
import { EditEventModal } from '../modal/edit-event-modal';
import { CalendarEvent } from './event';
import { CALENDAR_DAY_HEIGHT, Hour } from './hour';

interface DayProps {
  events: ICalendarEvent[];
  day: Date;
}
export const Day: FC<DayProps> = ({ events, day }) => {
  const [e, setEvents] = useState(events);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [startAt, setStartAt] = useState<Date | undefined>(undefined);
  const [endAt, setEndAt] = useState<Date | undefined>(undefined);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [event, setEvent] = useState<ICalendarEvent | undefined>(undefined);

  const { mutate } = useMutation({
    mutationFn: EventService.update
  });

  function onUpdate(event: ICalendarEvent) {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    mutate(event);
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
    setIsAddEventOpen(true);
  };

  // refactor to react-query cache update
  useEffect(() => {
    setEvents(events);
  }, [events]);

  return (
    <>
      <div
        className="w-full flex flex-col relative overflow-hidden min-w-24"
        style={{ maxHeight: CALENDAR_DAY_HEIGHT }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <Hour hour={i} key={i} setDate={setDate} />
        ))}
        {e.map((event, i) => (
          <CalendarEvent
            key={i}
            event={event}
            day={day}
            onUpdate={onUpdate}
            setIsEditEventOpen={(event) => {
              setEvent(event);
              setIsEditEventOpen(true);
            }}
          />
        ))}
      </div>

      <AddEventModal
        open={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        endDate={endAt}
        startDate={startAt}
        action="add"
        onSubmit={() => setIsAddEventOpen(false)}
      />
      <EditEventModal open={isEditEventOpen} onClose={() => setIsEditEventOpen(false)} event={event} />
    </>
  );
};
