import dayjs from 'dayjs';

import { useDatePicker } from '../../stores/date-picker-store';
import { CalendarView } from './calendar-select';

export const CalendarDate = () => {
  const { store, selectedDays } = useDatePicker();

  if (store.view === CalendarView.WEEK && selectedDays > 1) {
    const formatWeekPattern = 'MMM D';
    return (
      <div className="text-lg font-semibold text-center">
        {dayjs(store.selectedDate?.from).format(formatWeekPattern)} -{' '}
        {dayjs(store.selectedDate?.to).format(formatWeekPattern)}, {dayjs(store.selectedDate?.to).format('YYYY')}
      </div>
    );
  }

  return (
    <div className="text-lg font-semibold text-center">
      {store.view === CalendarView.WEEK && dayjs(store.selectedDate?.from).format('MMM, YYYY')}
      {store.view === CalendarView.MONTH && dayjs(store.month).format('MMMM YYYY')}
      {store.view === CalendarView.YEAR && dayjs(store.year).format('YYYY')}
    </div>
  );
};
