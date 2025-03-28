import { create } from 'zustand';

import { User } from '@/modules/user/user.interface';

interface UserState {
  user: User | null;
  prevAvatarUrl: string | null;
  setAvatar: (url: string) => void;
  clearAvatar: () => void;
  setUser: (user: User | null) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  prevAvatarUrl: null,
  setUser: (user: User | null) => set({ user, prevAvatarUrl: user?.avatarUrl || null }),
  updateUser: (user: Partial<User>) => set({ user: { ...(get().user as User), ...user } }),
  setAvatar: (url: string) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, avatarUrl: url } });
    }
  },
  clearAvatar: () => {
    const currentUser = get().user;
    const prevAvatarUrl = get().prevAvatarUrl;

    if (currentUser && prevAvatarUrl) {
      set({ user: { ...currentUser, avatarUrl: prevAvatarUrl } });
    }
  }
}));
