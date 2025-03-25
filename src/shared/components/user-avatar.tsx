import { FC } from 'react';

import { User } from '@/modules/user/user.interface';

import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserAvatarProps {
  user: User | null;
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ className, user }) => {
  return (
    <Avatar className={cn('bg-muted', className)}>
      <AvatarImage src={user?.avatarUrl || ''} />
      <AvatarFallback className="uppercase">
        {!user?.avatarUrl && `${user?.name?.[0] || ''}${user?.surname?.[0] || ''}`}
      </AvatarFallback>
    </Avatar>
  );
};
