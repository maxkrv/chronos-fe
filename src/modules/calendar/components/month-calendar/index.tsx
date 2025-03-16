import dayjs from 'dayjs';
import { FC } from 'react';

import { ICalendarEvent } from '../../calendar.interface';
import { MonthCalendarDay } from './day';
import { MonthCalendarHeader } from './header';

interface MonthCalendarProps {
  month?: Date;
  events?: ICalendarEvent[];
  hideEvents?: boolean;
}

export const MonthCalendar: FC<MonthCalendarProps> = ({ month = new Date(), events = [], hideEvents = false }) => {
  const startOfMonth = dayjs(month)
    .startOf('month')
    .startOf('day')
    .startOf('hour')
    .startOf('minute')
    .startOf('second')
    .startOf('millisecond');
  const endOfMonth = dayjs(month)
    .endOf('month')
    .endOf('day')
    .endOf('hour')
    .endOf('minute')
    .endOf('second')
    .endOf('millisecond');
  const startOfWeek = startOfMonth.startOf('week');
  const daysInMonth = dayjs(startOfMonth).daysInMonth();
  const days = startOfMonth.diff(startOfWeek, 'day') + daysInMonth + endOfMonth.endOf('week').diff(endOfMonth, 'day');

  return (
    <div className="flex flex-col gap-3 @container/calendar h-full">
      <MonthCalendarHeader />
      <div className="grid grid-cols-7 gap-2  @max-lg:gap-1 border-t-3 pt-2 overflow-x-scroll scrollbar-none justify-center items-center max-h-fit grid-auth-rows-[1fr]">
        {Array.from({ length: days }).map((_, i) => {
          const d = startOfWeek.add(i, 'day').toDate();
          return (
            <MonthCalendarDay
              key={i}
              day={d}
              events={
                Math.round(Math.random())
                  ? events.slice(Math.random() * events.length, Math.random() * events.length)
                  : []
              }
              hideEvents={hideEvents}
              isActualMonth={startOfMonth.isSame(d, 'month')}
            />
          );
        })}
      </div>
    </div>
  );
};
