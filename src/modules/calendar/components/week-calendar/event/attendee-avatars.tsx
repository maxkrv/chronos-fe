import { FC, useEffect, useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../../../../../shared/components/ui/avatar';
import { cn } from '../../../../../shared/lib/utils';
import { User } from '../../../../user/user.interface';

interface AttendeeAvatarsProps extends React.HTMLAttributes<HTMLDivElement> {
  attendees?: User[];
}

export const AttendeeAvatars: FC<AttendeeAvatarsProps> = ({ attendees, className, ...props }) => {
  const [visibleAvatars, setVisibleAvatars] = useState(0);
  const avatarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const updateVisibleAvatars = () => {
      if (avatarContainerRef.current) {
        const containerWidth = avatarContainerRef.current.offsetWidth;
        const avatarSize = 16;
        const maxAvatars = Math.floor(containerWidth / avatarSize) - 2;
        setVisibleAvatars(Math.max(0, Math.min(attendees?.length || 0, maxAvatars)));
      }
    };

    updateVisibleAvatars();
    window.addEventListener('resize', updateVisibleAvatars, { signal });

    return () => controller.abort();
  }, [attendees]);

  const hiddenAttendees = Math.max((attendees?.length || 0) - visibleAvatars, 0);

  return (
    <div ref={avatarContainerRef} {...props} className={cn('flex flex-row', className)}>
      {attendees?.slice(0, visibleAvatars).map((attendee) => (
        <Avatar key={attendee.id} className="size-6 -ml-2 first:ml-0 border-current border-2">
          <AvatarImage src={attendee?.avatarUrl || ''} alt="shadcn" />
          <AvatarFallback className="uppercase">
            {attendee?.name?.charAt(0)}
            {attendee?.surname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ))}
      {hiddenAttendees > 0 && (
        <div className="size-6 bg-mix-primary-20 border-current border-2 text-xs font-extrabold rounded-full flex items-center justify-center -ml-2 z-10 shrink-0">
          +{hiddenAttendees}
        </div>
      )}
    </div>
  );
};
