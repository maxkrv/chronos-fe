'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { FC } from 'react';
import type { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

import { EVENTS } from '../../../../shared/constants/query-keys';
import type { ICalendarEvent } from '../../calendar.interface';
import { EventService } from '../../services/event.service';
import { CalendarEvent, getTodayEvent } from './event';
import { CALENDAR_DAY_HEIGHT, Hour } from './hour';

interface DayProps {
  events: ICalendarEvent[];
  day: Date;
  onEdit: (event: ICalendarEvent) => void;
  onAdd: (event: DateRange) => void;
  activeEventId: number | null;
  setActiveEventId: (id: number | null) => void;
}
export const Day: FC<DayProps> = ({ events, day, onEdit, onAdd, activeEventId, setActiveEventId }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: EventService.update,
    onSuccess: () => {
      toast.success('Event updated');
      queryClient.refetchQueries({
        queryKey: [EVENTS]
      });
    }
  });

  function onUpdate(event: ICalendarEvent) {
    mutate({ ...event, frequency: event.eventRepeat?.frequency, interval: event.eventRepeat?.interval });
  }

  const setDate = (timeStart: number, timeEnd: number) => {
    const from = dayjs(day).hour(timeStart).minute(0).second(0).millisecond(0).toDate();
    const to = dayjs(day).hour(timeEnd).minute(0).second(0).millisecond(0).toDate();

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      // If dates are invalid, use current time as fallback
      const currentDate = new Date();
      onAdd({
        from: dayjs(currentDate).hour(timeStart).minute(0).second(0).millisecond(0).toDate(),
        to: dayjs(currentDate).hour(timeEnd).minute(0).second(0).millisecond(0).toDate()
      });
      return;
    }
    onAdd({ from, to });
  };

  return (
    <>
      <div
        className="w-full flex flex-col relative overflow-hidden min-w-24"
        style={{ maxHeight: CALENDAR_DAY_HEIGHT }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <Hour hour={i} key={i} setDate={setDate} isActive={dayjs(day).startOf('day').add(i, 'hour').isAfter()} />
        ))}
        {events
          .filter((e) => getTodayEvent(e, day))
          .map((event) => (
            <CalendarEvent
              key={event.id}
              event={event}
              day={day}
              onUpdate={onUpdate}
              activeEventId={activeEventId}
              setActiveEventId={setActiveEventId}
              onEdit={(event) => {
                onEdit(event);
              }}
            />
          ))}
      </div>
    </>
  );
};
