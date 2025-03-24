import { Dispatch, FC, SetStateAction } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

import { AddEventFormProps } from '../../calendar.interface';
import { EventForm } from '../form/event-form';

interface AddEventModalProps extends AddEventFormProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const AddEventModal: FC<AddEventModalProps> = ({ open, onClose, ...props }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
        </DialogHeader>

        <EventForm {...props} />
      </DialogContent>
    </Dialog>
  );
};
