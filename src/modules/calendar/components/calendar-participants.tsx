import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa6';

import { Button } from '@/shared/components/ui/button';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { UserAvatar } from '@/shared/components/user-avatar';
import { CALENDAR_PARTICIPANTS } from '@/shared/constants/query-keys';

import { CalendarRoleSelect } from '../calendar.interface';
import { CalendarService } from '../services/calendar.service';

interface Props {
  calendarId: number;
  isCreator: boolean;
}

export const CalendarParticipants: FC<Props> = ({ calendarId, isCreator }) => {
  const queryClient = useQueryClient();

  const { data, isLoading: isParticipantsLoading } = useQuery({
    queryKey: [CALENDAR_PARTICIPANTS, calendarId],
    queryFn: () => CalendarService.getCalendarParticipants(calendarId)
  });

  const { mutate: update, isPending: isUpdatePending } = useMutation({
    mutationFn: CalendarService.updateCalendarParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CALENDAR_PARTICIPANTS, calendarId]
      });
    }
  });
  const { mutate: remove, isPending: isRemovePending } = useMutation({
    mutationFn: CalendarService.removeCalendarParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CALENDAR_PARTICIPANTS, calendarId]
      });
    }
  });

  const isLoading = isUpdatePending || isRemovePending;

  return (
    <>
      {!!data?.length && (
        <ScrollArea className="h-[248.22px] flex-1">
          <div className="flex flex-col gap-2">
            {data?.map((participant) => (
              <div key={participant.id} className="flex gap-2 items-center">
                <UserAvatar user={participant.user} />
                <p>
                  {participant.user.name} {participant.user.surname}
                </p>

                <div className="ml-auto flex items-center gap-2">
                  {!isCreator || participant.role === CalendarRoleSelect.OWNER ? (
                    <p>{participant.role}</p>
                  ) : (
                    <Select
                      defaultValue={participant.role}
                      onValueChange={(role) =>
                        update({ calendarId, userId: participant.userId, role: role as CalendarRoleSelect })
                      }
                      disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.values(CalendarRoleSelect).map(
                            (role) =>
                              role !== CalendarRoleSelect.OWNER && (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}

                  {participant.role !== CalendarRoleSelect.OWNER && (
                    <Button
                      variant={'outline'}
                      className="w-8 h-8"
                      onClick={() =>
                        remove({
                          calendarId,
                          userId: participant.user.id
                        })
                      }
                      disabled={isLoading}>
                      <FaTrash className="size-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <ScrollBar />
        </ScrollArea>
      )}

      {isParticipantsLoading && (
        <div className="h-full flex items-center justify-center">
          <CgSpinner size={50} className="animate-spin" />
        </div>
      )}
    </>
  );
};
