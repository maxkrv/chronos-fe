import dayjs from 'dayjs';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

import { Button } from '../../../../shared/components/ui/button';
import { useDatePicker } from '../../stores/date-picker-store';
import { CalendarView } from './calendar-select';

export const CalendarControls = () => {
  const { store, selectedDays } = useDatePicker();

  const onToday = () => {
    if (store.view === CalendarView.WEEK) {
      if (selectedDays > 1) {
        store.setSelectedDate({
          from: dayjs()
            .subtract(selectedDays / 2 - 1, 'day')
            .toDate(),
          to: dayjs()
            .add(selectedDays / 2, 'day')
            .toDate()
        });
        return;
      }
      store.setSelectedDate({ from: dayjs().toDate() });
      return;
    }
    if (store.view === CalendarView.MONTH) {
      store.setMonth(dayjs().toDate());
      return;
    }
    if (store.view === CalendarView.YEAR) {
      store.setYear(dayjs().toDate());
    }
  };

  const onPrev = () => {
    if (store.view === CalendarView.MONTH) {
      store.setMonth(dayjs(store.month).subtract(1, 'month').toDate());
    }
    if (store.view === CalendarView.YEAR) {
      store.setYear(dayjs(store.year).subtract(1, 'year').toDate());
    }
    if (store.view === CalendarView.WEEK) {
      if (selectedDays > 1) {
        store.setSelectedDate({
          from: dayjs(store.selectedDate?.from).subtract(selectedDays, 'day').toDate(),
          to: dayjs(store.selectedDate?.to).subtract(selectedDays, 'day').toDate()
        });
        return;
      }
      store.setSelectedDate({
        from: dayjs(store.selectedDate?.from).subtract(1, 'day').toDate()
      });
    }
  };

  const onNext = () => {
    if (store.view === CalendarView.MONTH) {
      store.setMonth(dayjs(store.month).add(1, 'month').toDate());
    }
    if (store.view === CalendarView.YEAR) {
      store.setYear(dayjs(store.year).add(1, 'year').toDate());
    }
    if (store.view === CalendarView.WEEK) {
      if (selectedDays > 1) {
        store.setSelectedDate({
          from: dayjs(store.selectedDate?.from).add(selectedDays, 'day').toDate(),
          to: dayjs(store.selectedDate?.to).add(selectedDays, 'day').toDate()
        });
        return;
      }
      store.setSelectedDate({
        from: dayjs(store.selectedDate?.from).add(1, 'day').toDate()
      });
    }
  };
  return (
    <div className="flex gap-2">
      <Button variant={'outline'} className="max-sm:hidden" onClick={onToday}>
        Today
      </Button>
      <Button variant={'outline'} size={'icon'} onClick={onPrev}>
        <MdOutlineKeyboardArrowLeft className="size-8" />
      </Button>
      <Button variant={'outline'} size={'icon'} onClick={onNext}>
        <MdOutlineKeyboardArrowRight className="size-8" />
      </Button>
    </div>
  );
};
