import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSearchParamsStorage } from '../../../shared/store/search-param-storage';
import type { CalendarSortBy, SortOrder } from '../../calendar/calendar.interface';

const STORAGE_KEY = 'public-calendars-filters';

interface IPublicCalendarsFiltersStore {
  page: number;
  limit: number;
  name: string;
  sortBy: CalendarSortBy;
  sortOrder: SortOrder;
  setName: (name: string) => void;
  setSortBy: (sortBy: CalendarSortBy) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const usePublicCalendarsFiltersStore = create(
  persist<IPublicCalendarsFiltersStore>(
    (set) => ({
      page: 1,
      limit: 10,
      name: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      setName: (name) => set({ name, page: 1 }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      setLimit: (limit) => set({ limit, page: 1 }),
      setPage: (page) => set({ page }),
      resetFilters: () =>
        set({
          name: '',
          page: 1
        })
    }),
    createSearchParamsStorage(STORAGE_KEY)
  )
);
