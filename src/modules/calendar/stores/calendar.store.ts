import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const STORAGE_KEY = 'calendar';

interface ICalendarStore {
  calendarsIds: number[];
  setCalendarsIds: (ids: number[]) => void;
  addCalendarId: (id: number) => void;
  removeCalendarId: (id: number) => void;
}

export const useCalendarStore = create(
  persist<ICalendarStore>(
    (set, get) => ({
      calendarsIds: [],
      setCalendarsIds: (ids: number[]) => set({ calendarsIds: ids }),
      addCalendarId: (id: number) => set({ calendarsIds: [...get().calendarsIds, id] }),
      removeCalendarId: (id: number) => set({ calendarsIds: get().calendarsIds.filter((i) => i !== id) })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
