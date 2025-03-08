import { create } from 'zustand';

import { User } from '@/modules/user/user.interface';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  updateUser: (user: Partial<User>) => set((state) => ({ user: { ...state.user, ...(user as User) } }))
}));
