import { FC } from 'react';

import { cn } from '../lib/utils';
import { useUserStore } from '../store/user.store';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ className }) => {
  const { user } = useUserStore();

  return (
    <Avatar className={cn('bg-muted', className)}>
      <AvatarImage src={user?.avatarUrl || ''} />
      <AvatarFallback className="uppercase">
        {user?.name?.charAt(0)}
        {user?.surname?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
