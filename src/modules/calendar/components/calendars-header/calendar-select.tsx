import { FC } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../shared/components/ui/select';
import { useDatePicker } from '../../stores/date-picker-store';

export enum CalendarView {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}

export const CalendarSelect: FC = () => {
  const { store } = useDatePicker();

  return (
    <Select value={store.view} onValueChange={(newValue) => store.setView(newValue as CalendarView)}>
      <SelectTrigger className="min-w-[5.5rem]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={CalendarView.WEEK}>Week</SelectItem>
        <SelectItem value={CalendarView.MONTH}>Month</SelectItem>
        <SelectItem value={CalendarView.YEAR}>Year</SelectItem>
      </SelectContent>
    </Select>
  );
};
