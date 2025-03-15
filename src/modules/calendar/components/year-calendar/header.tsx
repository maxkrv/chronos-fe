import dayjs from 'dayjs';
import { FC } from 'react';

interface YearCalendarMonthHeaderProps {
  month: Date;
}
export const YearCalendarMonthHeader: FC<YearCalendarMonthHeaderProps> = ({ month }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <p className="text-lg font-semibold">{dayjs(month).format('MMMM')}</p>
    </div>
  );
};
