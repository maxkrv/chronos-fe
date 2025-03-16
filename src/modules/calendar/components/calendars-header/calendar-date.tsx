import dayjs from 'dayjs';

import { useDatePicker } from '../../stores/date-picker-store';
import { CalendarView } from './calendar-select';

const getDateText = (view: CalendarView, from?: Date): string => {
  switch (view) {
    case CalendarView.WEEK:
      return dayjs(from).format('MMM, YYYY');
    case CalendarView.MONTH:
      return dayjs(from).format('MMMM YYYY');
    case CalendarView.YEAR:
      return dayjs(from).format('YYYY');
  }
};

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

  return <div className="text-lg font-semibold text-center">{getDateText(store.view, store.selectedDate?.from)}</div>;
};
