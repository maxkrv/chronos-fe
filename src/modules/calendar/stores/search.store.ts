import { create } from 'zustand';

interface SearchStore {
  searchActive: boolean;
  searchQuery: string;
  toggleSearch: (val?: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchActive: false,
  searchQuery: '',
  toggleSearch: (val?: boolean) =>
    set((state) => ({ searchActive: typeof val === 'undefined' ? !state.searchActive : val })),
  setSearchQuery: (query: string) => set({ searchQuery: query })
}));
