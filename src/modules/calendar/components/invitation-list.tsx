import { FC } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa6';

import { IMyCalendarInvitation, IMyEventInvitation } from '@/modules/calendar/calendar.interface';
import { Button } from '@/shared/components/ui/button';
import { SidebarMenuItem } from '@/shared/components/ui/sidebar';

interface Props {
  invitations: IMyCalendarInvitation[] | IMyEventInvitation[];
  isLoading: boolean;
  isFetching: boolean;
  accept: (id: number) => void;
  decline: (id: number) => void;
  isPending: boolean;
}

export const InvitationList: FC<Props> = ({ invitations, isLoading, isFetching, accept, decline, isPending }) => {
  return (
    <div className="relative w-full grid gap-1 items-start content-start">
      {!isLoading &&
        invitations?.map((invitation) => {
          const name =
            (invitation as IMyCalendarInvitation).calendar?.name || (invitation as IMyEventInvitation).event?.name;

          return (
            <SidebarMenuItem
              key={invitation.id}
              className="flex items-center justify-between rounded-md hover:bg-accent h-6">
              <span>{name}</span>

              <div className="flex gap-1">
                <Button
                  disabled={isFetching || isPending}
                  onClick={() => accept(invitation.id)}
                  variant="ghost"
                  className="hover:bg-accent-foreground hover:text-background size-6 rounded-4xl transition-colors">
                  <FaCheck />
                </Button>
                <Button
                  disabled={isFetching || isPending}
                  onClick={() => decline(invitation.id)}
                  variant="ghost"
                  className="hover:bg-accent-foreground hover:text-background size-6 rounded-4xl transition-colors">
                  <FaPlus className="rotate-45" />
                </Button>
              </div>
            </SidebarMenuItem>
          );
        })}

      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => (
          <SidebarMenuItem key={i} className="flex items-center justify-between rounded-md bg-accent h-6" />
        ))}
    </div>
  );
};
