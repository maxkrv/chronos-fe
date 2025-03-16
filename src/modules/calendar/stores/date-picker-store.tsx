import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSearchParamsStorage } from '../../../shared/store/search-param-storage';
import { CalendarView } from '../components/calendars-header/calendar-select';

const STORAGE_KEY = 'date-picker';
const MAX_SELECTED_DAYS = 7;
const MAX_SELECTED_DAY_LAPTOP = 3;
const MAX_SELECTED_DAY_MOBILE = 1;
const isLaptop = () => window.innerWidth <= 1140;
const isMobile = () => window.innerWidth <= 640;

interface IDatePickerStore {
  view: CalendarView;
  setView: (view: CalendarView) => void;
  selectedDate: DateRange | undefined;
  setSelectedDate: (date: DateRange | undefined) => void;
  month: Date | undefined;
  setMonth: (month: Date) => void;
  year: Date | undefined;
  setYear: (year: Date) => void;
}

const useDatePickerStore = create(
  persist<IDatePickerStore>(
    (set, get) => ({
      view: get()?.selectedDate ? CalendarView.WEEK : CalendarView.MONTH,
      setView: (view) => set({ view, selectedDate: view === CalendarView.WEEK ? get().selectedDate : undefined }),
      selectedDate: { from: dayjs().subtract(1, 'day').toDate(), to: dayjs().add(1, 'day').toDate() },
      setSelectedDate: (date) => {
        if (!date) {
          set({ selectedDate: undefined });
          return;
        }

        const { from, to } = date;
        let finalRange = date;
        const maxDays = isMobile() ? MAX_SELECTED_DAY_MOBILE : isLaptop() ? MAX_SELECTED_DAY_LAPTOP : MAX_SELECTED_DAYS;
        if (to && dayjs(to).diff(from, 'days') >= maxDays) {
          const newTo = dayjs(to).isAfter(get()?.selectedDate?.to)
            ? dayjs(to).toDate()
            : dayjs(from)
                .add(maxDays - 1, 'days')
                .toDate();
          const newFrom = dayjs(from).isBefore(get()?.selectedDate?.from)
            ? dayjs(from).toDate()
            : dayjs(to)
                .subtract(maxDays - 1, 'days')
                .toDate();
          finalRange = { from: newFrom, to: newTo };
        }
        set({ selectedDate: finalRange });
      },
      month: new Date(),
      setMonth: (month) => set({ month }),
      year: new Date(),
      setYear: (year) => set({ year })
    }),
    createSearchParamsStorage(STORAGE_KEY)
  )
);

export const useDatePicker = () => {
  const store = useDatePickerStore();

  const selectedDays = useMemo(() => {
    const { from, to } = store.selectedDate || {};
    return from && to ? dayjs(to).diff(from, 'days') + 1 : 1;
  }, [store.selectedDate]);

  useEffect(() => {
    if (selectedDays > 1) {
      store.setView(CalendarView.WEEK);
    }
  }, [selectedDays]);

  useEffect(() => {
    store.setView(store.selectedDate ? CalendarView.WEEK : CalendarView.MONTH);
  }, [store.selectedDate]);

  return { store, selectedDays };
};
