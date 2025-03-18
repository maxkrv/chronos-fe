'use client';

import { ProfileView } from '@/modules/user/view/profile-view';

import { useUserStore } from '../store/user.store';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { UserAvatar } from './user-avatar';

export const NavUser = () => {
  const { user } = useUserStore();

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <UserAvatar user={user} />
      </SheetTrigger>
      <SheetContent className="flex flex-col" aria-describedby="profile">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>

        <ProfileView />
      </SheetContent>
    </Sheet>
  );
};
