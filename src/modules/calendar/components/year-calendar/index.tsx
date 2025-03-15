import dayjs from 'dayjs';
import { FC } from 'react';

import { MonthCalendar } from '../month-calendar';
import { YearCalendarMonthHeader } from './header';

const MONTHS_IN_YEAR = 12;

interface YearCalendarProps {
  year?: Date;
}
export const YearCalendar: FC<YearCalendarProps> = ({ year = new Date() }) => {
  const start = dayjs(year)
    .startOf('year')
    .startOf('month')
    .startOf('week')
    .startOf('day')
    .startOf('hour')
    .startOf('minute')
    .startOf('second')
    .startOf('millisecond');

  return (
    <div className="grid w-full grid-flow-row grid-cols-[repeat(auto-fill,_20rem)] grid-rows-[auto] justify-around gap-10">
      {Array.from({ length: MONTHS_IN_YEAR }).map((_, index) => {
        const month = start.add(index, 'month').toDate();
        return (
          <div key={index} className="aspect-square max-w-xs flex flex-col gap-4">
            <YearCalendarMonthHeader month={month} />
            <MonthCalendar hideEvents month={month} />
          </div>
        );
      })}
    </div>
  );
};
