'use client';

import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import type { DateRange } from 'react-day-picker';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useIsDesktop, useIsTablet } from '../../../shared/hooks/use-breakpoint';
import { createSearchParamsStorage } from '../../../shared/store/search-param-storage';
import { CalendarView } from '../components/calendars-header/calendar-select';

const STORAGE_KEY = 'date-picker';
const MAX_SELECTED_DAYS = 7;
const MAX_SELECTED_DAY_LAPTOP = 3;
const MAX_SELECTED_DAY_MOBILE = 1;

interface IDatePickerStore {
  view: CalendarView;
  setView: (view: CalendarView) => void;
  selectedDate: DateRange | undefined;
  setSelectedDate: (date: DateRange | undefined, maxDays: number) => void;
  month: Date | undefined;
  setMonth: (month: Date) => void;
  year: Date | undefined;
  setYear: (year: Date) => void;
}

const useDatePickerStore = create(
  persist<IDatePickerStore>(
    (set, get) => ({
      view: get()?.selectedDate ? CalendarView.WEEK : CalendarView.MONTH,
      setView: (view) => {
        set({ view, selectedDate: view === CalendarView.WEEK ? get().selectedDate : undefined });
      },
      selectedDate: undefined, // We'll set this in the hook based on device
      setSelectedDate: (date, maxDays) => {
        if (!date) {
          set({ selectedDate: undefined });
          return;
        }

        const { from, to } = date;
        let finalRange = date;

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
        set({ selectedDate: finalRange, view: CalendarView.WEEK, month: from, year: from });
      },
      month: new Date(),
      setMonth: (month) => {
        set({ month });
      },
      year: new Date(),
      setYear: (year) => {
        set({ year });
      }
    }),
    createSearchParamsStorage(STORAGE_KEY)
  )
);

export const useDatePicker = () => {
  const store = useDatePickerStore();
  const isMobile = useIsTablet();
  const isLaptop = useIsDesktop();

  const maxDays = useMemo(() => {
    if (isMobile) return MAX_SELECTED_DAY_MOBILE;
    if (isLaptop) return MAX_SELECTED_DAY_LAPTOP;
    return MAX_SELECTED_DAYS;
  }, [isMobile, isLaptop]);

  const selectedDays = useMemo(() => {
    const { from, to } = store.selectedDate || {};
    return from && to ? dayjs(to).diff(from, 'days') + 1 : 1;
  }, [store.selectedDate]);

  // Initialize default selected date based on device
  useEffect(() => {
    if (store.view === CalendarView.WEEK && (!store.selectedDate || selectedDays > maxDays)) {
      const defaultDate = isMobile
        ? { from: new Date() }
        : { from: dayjs().subtract(1, 'day').toDate(), to: dayjs().add(1, 'day').toDate() };

      store.setSelectedDate(defaultDate, maxDays);
    }
  }, [isMobile, maxDays, store]);

  // Wrapper for setSelectedDate that includes the maxDays
  const setSelectedDate = (date: DateRange | undefined) => {
    store.setSelectedDate(date, maxDays);
  };

  useEffect(() => {
    if (selectedDays > 1) {
      store.setView(CalendarView.WEEK);
    }
  }, [selectedDays, store.selectedDate]);

  useEffect(() => {
    store.setView(
      store.selectedDate ? CalendarView.WEEK : store.view === CalendarView.YEAR ? CalendarView.YEAR : CalendarView.MONTH
    );
  }, [store.selectedDate]);

  return {
    store: {
      ...store,
      setSelectedDate: (date: DateRange | undefined) => setSelectedDate(date)
    },
    selectedDays,
    maxDays
  };
};
