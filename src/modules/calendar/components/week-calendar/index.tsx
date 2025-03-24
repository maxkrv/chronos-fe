import { FC, useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';

import dayjs from '../../../../shared/lib/dayjs';
import { EventCategory, ICalendarEvent } from '../../calendar.interface';
import { AddEventModal } from '../modal/add-event-modal';
import { EditEventModal } from '../modal/edit-event-modal';
import { Day } from './day';
import { getTodayEvent } from './event';
import { FullDayEvent } from './event/full-day-event';
import { WeekCalendarHeader } from './header';
import { CALENDAR_HOUR_HEIGHT } from './hour';
import { NowMarker } from './now';
import { SideTime } from './side-time';

interface WeekCalendarProps {
  events?: ICalendarEvent[];
  fromDay?: Date;
  days?: number;
}
const MILISECONDS_IN_DAY = 86400000;

export const WeekCalendar: FC<WeekCalendarProps> = ({ events = [], fromDay = new Date(), days = 7 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState<boolean>(false);
  const [editedEvent, setEditedEvent] = useState<ICalendarEvent | undefined>(undefined);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState<boolean>(false);
  const [addDateRange, setAddDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: CALENDAR_HOUR_HEIGHT * 8 }); //scroll 8 hours
    }
  }, []);

  const fullDayEvents = events.filter(
    (e) => e.category === EventCategory.OCCASION || dayjs(e.startAt).isBefore(dayjs(e.endAt).subtract(1, 'day'), 'day')
  );

  return (
    <div className="flex flex-col p-2 gap-3 h-full min-w-fit">
      <WeekCalendarHeader fromDay={fromDay} days={days} />

      <div className="border-t-3 overflow-x-scroll scrollbar-none grow h-full grid" ref={containerRef}>
        <div className="pl-16 w-full my-3">
          <div className="w-full flex gap-0 border-2">
            {Array.from({ length: days }).map((_, i) => (
              <div key={i} className="border grid grow min-w-12 w-full">
                {fullDayEvents
                  .filter((e) => {
                    const today = dayjs(fromDay).add(i, 'day').hour(0).minute(0).second(0).millisecond(0);
                    const dayStart = dayjs(today).hour(0).minute(0).second(0).millisecond(0);
                    const dayEnd = dayjs(today).hour(23).minute(59).second(59).millisecond(999);
                    const te = getTodayEvent(e, today.toDate());
                    return (
                      te &&
                      te.to &&
                      dayjs(te.to).diff(te.from) >= MILISECONDS_IN_DAY &&
                      !dayjs(te.to).isBetween(dayStart, dayEnd, null, '(]') &&
                      !dayjs(te.from).isBetween(dayStart, dayEnd, null, '(]')
                    );
                  })
                  .map((event) => (
                    <FullDayEvent
                      key={event.id}
                      event={event}
                      onEdit={(event) => {
                        setIsEditEventModalOpen(true);
                        setEditedEvent(event);
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[4rem_1fr] w-full">
          <SideTime />
          <div className="py-3">
            <div className="relative w-full flex gap-0 calendar-container">
              <NowMarker />
              {Array.from({ length: days }).map((_, i) => (
                <Day
                  key={dayjs(fromDay).add(i, 'day').toDate().toISOString()}
                  day={dayjs(fromDay).add(i, 'day').toDate()}
                  events={events}
                  onEdit={(e) => {
                    setIsEditEventModalOpen(true);
                    setEditedEvent(e);
                  }}
                  onAdd={(dateRange) => {
                    setAddDateRange(dateRange);
                    setIsAddEventModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddEventModal
        open={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        endDate={addDateRange?.to}
        startDate={addDateRange?.from}
        action="add"
        onSubmit={() => setIsAddEventModalOpen(false)}
      />
      <EditEventModal open={isEditEventModalOpen} onClose={() => setIsEditEventModalOpen(false)} event={editedEvent} />
    </div>
  );
};
