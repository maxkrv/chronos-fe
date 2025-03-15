import { FC } from 'react';
import { useEffect, useRef } from 'react';

import dayjs from '../../../../shared/lib/dayjs';
import { ICalendarEvent } from '../../calendar.interface';
import { Day } from './day';
import { WeekCalendarHeader } from './header';
import { CALENDAR_HOUR_HEIGHT } from './hour';
import { NowMarker } from './now';
import { SideTime } from './side-time';
interface WeekCalendarProps {
  events?: ICalendarEvent[];
  fromDay?: Date;
  days?: number;
}

export const WeekCalendar: FC<WeekCalendarProps> = ({ events = [], fromDay = new Date(), days = 7 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: CALENDAR_HOUR_HEIGHT * 8 }); //scroll 8 hours
    }
  }, []);

  return (
    <div className="flex flex-col p-2 gap-3 h-full min-w-fit">
      <WeekCalendarHeader fromDay={fromDay} days={days} />
      <div className="border-t-3 overflow-x-scroll scrollbar-none grow h-full" ref={containerRef}>
        <div className="grid grid-cols-[4rem_1fr] w-full">
          <SideTime />
          <div className="py-3">
            <div className="relative w-full flex gap-0 calendar-container">
              <NowMarker />
              {Array.from({ length: days }).map((_, i) => (
                <Day key={i} day={dayjs(fromDay).add(i, 'day').toDate()} events={events} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
