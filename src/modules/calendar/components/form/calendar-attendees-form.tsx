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
import { CALENDAR_INVITATIONS } from '@/shared/constants/query-keys';

import { InvitationDto, InvitationSchema, InvitationStatus } from '../../calendar.interface';
import { CalendarService } from '../../services/calendar.service';

interface Props {
  calendarId: number;
}

const getBadgeVariant = (status: InvitationStatus) => {
  switch (status) {
    case 'PENDING':
      return 'secondary';
    case 'ACCEPTED':
      return 'default';
    case 'DECLINED':
      return 'destructive';
  }
};

export const CalendarAttendeesForm: FC<Props> = ({ calendarId }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register: registerInvitation,
    formState: { errors: invitationErrors, isValid: isInvitationValid }
  } = useForm<InvitationDto>({
    mode: 'all',
    resolver: zodResolver(InvitationSchema),
    defaultValues: {
      calendarId
    }
  });

  const {
    data,
    isFetching,
    isLoading: isInvitationsLoading
  } = useQuery({
    queryKey: [CALENDAR_INVITATIONS, calendarId],
    queryFn: () => CalendarService.getInvitations(calendarId)
  });

  const { mutate: inviteMutate, isPending: isInvitePending } = useMutation({
    mutationFn: CalendarService.invite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CALENDAR_INVITATIONS, calendarId]
      });
    }
  });

  const onSubmit = (dto: InvitationDto) => {
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
