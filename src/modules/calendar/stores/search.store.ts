import { create } from 'zustand';

interface SearchStore {
  searchActive: boolean;
  searchQuery: string;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchActive: false,
  searchQuery: '',
  toggleSearch: () => set((state) => ({ searchActive: !state.searchActive })),
  setSearchQuery: (query: string) => set({ searchQuery: query })
}));
