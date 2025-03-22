import { FC } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaCheck, FaPlus } from 'react-icons/fa6';

import { IMyCalendarInvitation, IMyEventInvitation } from '@/modules/calendar/calendar.interface';
import { Button } from '@/shared/components/ui/button';

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
    <div className="relative w-full grid gap-4 items-start content-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {!isLoading &&
        invitations?.map((invitation) => {
          const name =
            (invitation as IMyCalendarInvitation).calendar?.name || (invitation as IMyEventInvitation).event?.name;

          return (
            <div key={invitation.id} className="flex items-center justify-between gap-2 w-full">
              <span>{name}</span>

              <div className="flex gap-2">
                <Button disabled={isFetching || isPending} onClick={() => accept(invitation.id)}>
                  <FaCheck />
                </Button>
                <Button disabled={isFetching || isPending} onClick={() => decline(invitation.id)}>
                  <FaPlus className="rotate-45" />
                </Button>
              </div>
            </div>
          );
        })}

      {isLoading && (
        <CgSpinner className="animate-spin h-20 w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
};
