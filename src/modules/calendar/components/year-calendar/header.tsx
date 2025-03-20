import dayjs from 'dayjs';
import { FC } from 'react';

import { Button } from '../../../../shared/components/ui/button';
import { useDatePicker } from '../../stores/date-picker-store';
import { CalendarView } from '../calendars-header/calendar-select';

interface YearCalendarMonthHeaderProps {
  month: Date;
}
export const YearCalendarMonthHeader: FC<YearCalendarMonthHeaderProps> = ({ month }) => {
  const { store } = useDatePicker();
  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant={'link'}
        className="text-lg font-semibold"
        onClick={() => {
          store.setMonth(month);
          store.setView(CalendarView.MONTH);
        }}>
        {dayjs(month).format('MMMM')}
      </Button>
    </div>
  );
};
