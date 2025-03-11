'use client';

import { Link } from 'react-router-dom';

import { UserAvatar } from './user-avatar';

export const NavUser = () => {
  return (
    <Link to="/profile">
      <UserAvatar />
    </Link>
  );
};
