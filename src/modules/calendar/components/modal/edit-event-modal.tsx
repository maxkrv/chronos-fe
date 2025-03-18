import { Dispatch, FC, SetStateAction } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

import { ICalendarEvent } from '../../calendar.interface';
import { EventForm } from '../form/event-form';

interface EditEventModalProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  event: ICalendarEvent | undefined;
}

export const EditEventModal: FC<EditEventModalProps> = ({ open, onClose, event }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update {event?.name}</DialogTitle>
        </DialogHeader>

        <EventForm event={event} action={'edit'} />
      </DialogContent>
    </Dialog>
  );
};
