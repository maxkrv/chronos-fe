import dayjs from 'dayjs';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

import { Button } from '../../../../shared/components/ui/button';
import { useDatePicker } from '../../stores/date-picker-store';
import { CalendarView } from './calendar-select';

export const CalendarControls = () => {
  const { store, selectedDays } = useDatePicker();

  // const onToday = () => {
  //   const oldView = store.view;
  //   store.setSelectedDate({
  //     from:
  //       selectedDays > 1
  //         ? dayjs()
  //             .subtract(selectedDays / 2, 'day')
  //             .toDate()
  //         : new Date(),
  //     to:
  //       selectedDays > 1
  //         ? dayjs()
  //             .add(selectedDays / 2, 'day')
  //             .toDate()
  //         : undefined
  //   });
  //   store.setView(oldView);
  // };

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
      <Button
        variant={'outline'}
        className="max-sm:hidden"
        onClick={() => store.setSelectedDate({ from: dayjs().toDate() })}>
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
