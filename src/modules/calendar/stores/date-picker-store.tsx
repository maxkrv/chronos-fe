import dayjs from 'dayjs';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSearchParamsStorage } from '../../../shared/store/search-param-storage';

const STORAGE_KEY = 'date-picker';
const MAX_SELECTED_DAYS = 7;
const MAX_SELECTED_DAY_LAPTOP = 3;
const MAX_SELECTED_DAY_MOBILE = 1;
const isLaptop = () => window.innerWidth <= 1140;
const isMobile = () => window.innerWidth <= 640;

interface IDatePickerStore {
  month: Date | undefined;
  setMonth: (month: Date) => void;
  selectedDate: DateRange | undefined;
  setSelectedDate: (date: DateRange | undefined) => void;
}

export const useDatePickerStore = create(
  persist<IDatePickerStore>(
    (set, get) => ({
      month: new Date(),
      setMonth: (month) => set({ month }),
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
      }
    }),
    createSearchParamsStorage(STORAGE_KEY)
  )
);
