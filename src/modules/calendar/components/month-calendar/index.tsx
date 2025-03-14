import dayjs from 'dayjs';
import { FC } from 'react';

import { events } from '../../../../__mock__/events';
import { MonthCalendarDay } from './day';
import { MonthCalendarHeader } from './header';

interface MonthCalendarProps {
  month: Date;
}

export const MonthCalendar: FC<MonthCalendarProps> = ({ month }) => {
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
    <div className="flex flex-col gap-4 @container/calendar">
      <MonthCalendarHeader />
      <div className="grid grid-cols-7 gap-2  @max-lg:gap-1 border-t-3 pt-2 h-140 overflow-x-scroll scrollbar-none justify-center items-center max-h-fit">
        {Array.from({ length: days }).map((_, i) => {
          const d = startOfWeek.add(i, 'day').toDate();
          return <MonthCalendarDay key={i} day={d} events={events} isActualMonth={startOfMonth.isSame(d, 'month')} />;
        })}
      </div>
    </div>
  );
};
