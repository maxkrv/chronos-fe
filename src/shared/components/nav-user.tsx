'use client';

import { Link } from 'react-router-dom';

import { useUserStore } from '../store/user.store';
import { UserAvatar } from './user-avatar';

export const NavUser = () => {
  const { user } = useUserStore();

  return (
    <Link to="/profile">
      <UserAvatar user={user} />
    </Link>
  );
};
