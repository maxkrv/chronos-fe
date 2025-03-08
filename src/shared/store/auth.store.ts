import { createStore, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TokenPair } from '@/modules/auth/interfaces/auth.interface';

interface ITokensStore {
  tokens: TokenPair | null;
  setTokens: (tokens: TokenPair) => void;
  isLoggedIn: () => boolean;
  deleteTokens: () => void;
}

const TOKENS_STORAGE_KEY = 'tokens';

export const authStore = createStore(
  persist<ITokensStore>(
    (set, get) => ({
      tokens: null,
      setTokens: (tokens) => set({ tokens }),
      isLoggedIn: () => !!get().tokens?.accessToken && !!get().tokens?.refreshToken,
      deleteTokens: () => set({ tokens: null })
    }),
    { name: TOKENS_STORAGE_KEY, storage: createJSONStorage(() => localStorage) }
  )
);

export const useAuth = () => useStore(authStore);
