'use client';

import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

import { useUserStore } from '../store/user.store';

export const NavUser = () => {
  const { user } = useUserStore();

  return (
    <Link to="/profile">
      <Avatar>
        <AvatarImage src={user?.avatarUrl || ''} alt="shadcn" />
        <AvatarFallback className="uppercase">
          {user?.name?.charAt(0)}
          {user?.surname?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};
