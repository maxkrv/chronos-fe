import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { MY_CALENDARS } from '@/shared/constants/query-keys';
import { useUserStore } from '@/shared/store/user.store';

import { ICalendar } from '../../calendar.interface';
import { CalendarService } from '../../services/calendar.service';
import { CalendarParticipants } from '../calendar-participants';
import { CalendarAttendeesForm } from '../form/calendar-attendees-form';
import { CalendarForm } from '../form/calendar-form';

interface EditCalendarModalProps {
  calendar: ICalendar | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}

export const EditCalendarModal: FC<EditCalendarModalProps> = ({ calendar, open, setOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: CalendarService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDARS]
      });

      setOpenConfirmModal(false);
      setOpen(false);
    }
  });

  const isCreator = user?.id === calendar?.ownerId;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[450px] flex flex-col">
          <DialogTitle>{isCreator ? `Edit ${calendar?.name}` : `${calendar?.name}`}</DialogTitle>

          <Tabs defaultValue="details" className="h-full">
            <TabsList className="w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              {isCreator && <TabsTrigger value="invitations">Invitations</TabsTrigger>}
              {isCreator && <TabsTrigger value="danger">Danger Zone</TabsTrigger>}
            </TabsList>

            <TabsContent value="details">
              <CalendarForm action="edit" calendar={calendar || undefined} onSubmit={onClose} isReadOnly={!isCreator} />
            </TabsContent>

            {calendar?.id && (
              <TabsContent value="participants">
                <CalendarParticipants calendarId={calendar.id} isCreator={isCreator} />
              </TabsContent>
            )}

            {calendar?.id && isCreator && (
              <TabsContent value="invitations" className="flex">
                <CalendarAttendeesForm calendarId={calendar!.id} />
              </TabsContent>
            )}

            {isCreator && (
              <TabsContent value="danger">
                <Button variant="destructive" onClick={() => setOpenConfirmModal(true)}>
                  Delete {calendar?.name}
                </Button>
              </TabsContent>
            )}
          </Tabs>
        </DialogContent>
      </Dialog>

      <ConfirmModal
        isOpen={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={() => mutate(calendar!.id)}
        description="Please confirm that you want to delete this calendar. This action cannot be undone."
        isLoading={isPending}
      />
    </>
  );
};
