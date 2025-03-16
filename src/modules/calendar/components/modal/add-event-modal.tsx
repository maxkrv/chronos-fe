import { Dispatch, FC, SetStateAction } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

import { AddEventFormProps } from '../../calendar.interface';
import { AddEventForm } from '../form/add-event-form';

interface AddEventModalProps extends AddEventFormProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const AddEventModal: FC<AddEventModalProps> = ({ open, onClose, ...props }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
        </DialogHeader>

        <AddEventForm {...props} />
      </DialogContent>
    </Dialog>
  );
};
