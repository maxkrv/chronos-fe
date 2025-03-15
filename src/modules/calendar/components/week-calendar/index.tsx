import { FC } from 'react';

import dayjs from '../../../../shared/lib/dayjs';
import { ICalendarEvent } from '../../calendar.interface';
import { Day } from './day';
import { WeekCalendarHeader } from './header';
import { NowMarker } from './now';
import { SideTime } from './side-time';
interface WeekCalendarProps {
  events?: ICalendarEvent[];
  fromDay?: Date;
  days?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const WeekCalendar: FC<WeekCalendarProps> = ({ events = [], fromDay = new Date(), days = 7 }) => {
  return (
    <div className="border flex flex-col p-2 gap-3 min-w-4xl">
      <WeekCalendarHeader fromDay={fromDay} days={days} />
      <div className="border-t-3 overflow-x-scroll scrollbar-none">
        <div className="grid grid-cols-[5rem_1fr] w-full">
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
