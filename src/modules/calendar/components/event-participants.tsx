import { FC } from 'react';

import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { UserAvatar } from '@/shared/components/user-avatar';

import { ICalendarEvent } from '../calendar.interface';

interface Props {
  event: ICalendarEvent;
}

export const EventParticipants: FC<Props> = ({ event }) => {
  return (
    <>
      {!!event.users?.length && (
        <ScrollArea className="h-[248.22px] flex-1">
          <div className="flex flex-col gap-2">
            {event.users?.map((participant) => (
              <div key={participant.id} className="flex gap-2 items-center">
                <UserAvatar user={participant.user} />
                <p>
                  {participant.user.name} {participant.user.surname}
                </p>
              </div>
            ))}
          </div>

          <ScrollBar />
        </ScrollArea>
      )}
    </>
  );
};
