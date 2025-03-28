import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa6';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { UserAvatar } from '@/shared/components/user-avatar';
import { EVENTS_INVITATIONS } from '@/shared/constants/query-keys';
import { getBadgeVariant } from '@/shared/lib/utils';

import { EventInvitationDto, EventInvitationSchema } from '../../calendar.interface';
import { EventService } from '../../services/event.service';

interface Props {
  eventId: number;
}

export const EventAttendeesForm: FC<Props> = ({ eventId }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register: registerInvitation,
    formState: { errors: invitationErrors, isValid: isInvitationValid }
  } = useForm<EventInvitationDto>({
    mode: 'all',
    resolver: zodResolver(EventInvitationSchema),
    defaultValues: {
      eventId
    }
  });

  const {
    data,
    isFetching,
    isLoading: isInvitationsLoading
  } = useQuery({
    queryKey: [EVENTS_INVITATIONS, eventId],
    queryFn: () => EventService.getInvitations(eventId)
  });

  const { mutate: inviteMutate, isPending: isInvitePending } = useMutation({
    mutationFn: EventService.invite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EVENTS_INVITATIONS, eventId]
      });
    }
  });

  const onSubmit = (dto: EventInvitationDto) => {
    inviteMutate(dto);
  };

  const isLoading = isInvitePending || isFetching;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
      <div className="grid gap-2">
        <Label>Attendees</Label>

        <div className="flex gap-2">
          <Input
            {...registerInvitation('email')}
            wrapperClassName="flex-1"
            placeholder="Email"
            errorMessage={invitationErrors.email?.message}
            disabled={isLoading}
          />

          <Button variant="outline" disabled={!isInvitationValid || isLoading}>
            <FaPlus />
          </Button>
        </div>
      </div>

      {!!data?.length && (
        <ScrollArea className="h-[248.22px] flex-1">
          <div className="flex flex-col gap-2">
            {data?.map((participant) => (
              <div key={participant.id} className="flex gap-2 items-center">
                <UserAvatar user={participant.user} />
                <p>
                  {participant.user.name} {participant.user.surname}
                </p>

                <Badge className="capitalize ml-auto" variant={getBadgeVariant(participant.status)}>
                  {participant.status.toLocaleLowerCase()}
                </Badge>
              </div>
            ))}
          </div>

          <ScrollBar />
        </ScrollArea>
      )}

      {isInvitationsLoading && (
        <div className="h-full flex items-center justify-center">
          <CgSpinner size={50} className="animate-spin" />
        </div>
      )}
    </form>
  );
};
