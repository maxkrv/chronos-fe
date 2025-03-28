import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { CalendarService } from '@/modules/calendar/services/calendar.service';
import { EventService } from '@/modules/calendar/services/event.service';
import { EVENTS, PARTICIPATING_CALENDARS } from '@/shared/constants/query-keys';

interface Props {
  type: 'event' | 'calendar';
  action: 'accept' | 'decline';
}

export const InvitationPage: FC<Props> = ({ type, action }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { invitationId: invitationIdStr } = useParams();

  const invitationId = Number(invitationIdStr);

  if (!invitationId || isNaN(invitationId)) {
    return <Navigate to="/dashboard" replace />;
  }

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: () => {
      if (type === 'event') {
        if (action === 'accept') {
          return EventService.acceptInvitation(invitationId);
        } else {
          return EventService.declineInvitation(invitationId);
        }
      }

      if (type === 'calendar') {
        if (action === 'accept') {
          return CalendarService.acceptInvitation(invitationId);
        } else {
          return CalendarService.declineInvitation(invitationId);
        }
      }

      return Promise.resolve();
    },
    onSuccess: () => {
      if (action === 'accept') {
        if (type === 'event') {
          queryClient.invalidateQueries({
            queryKey: [EVENTS]
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: [PARTICIPATING_CALENDARS]
          });
        }
      }

      setTimeout(() => {
        navigate('/calendar');
      }, 2000);
    },
    onError: () => {
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="h-svh flex items-center justify-center">
      {isPending && <CgSpinner className="animate-spin h-10 w-10" />}

      {isError && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-balance text-sm text-muted-foreground">
            There was an error {action === 'accept' ? 'accepting' : 'declining'} the invitation
          </p>
        </div>
      )}

      {isSuccess && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Success</h1>
          <p className="text-balance text-sm text-muted-foreground">
            An invitation has been {action === 'accept' ? 'accepted' : 'declined'}
          </p>
          <p className="text-balance text-sm text-muted-foreground">
            You will be redirected to the calendar in 2 seconds
          </p>
        </div>
      )}
    </div>
  );
};
