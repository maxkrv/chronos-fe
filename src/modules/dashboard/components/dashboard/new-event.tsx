import { memo, useState } from 'react';
import { CgEventbrite } from 'react-icons/cg';

import { Button } from '../../../../shared/components/ui/button';
import { AddEventModal } from '../../../calendar/components/modal/add-event-modal';

export const NewEvent = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="group relative w-full h-full hover:border-dashed border-primary bg-inherit border-2 rounded-3xl text-muted transition-all hover:bg-primary/5">
        <span className="text-lg text-wrap text-secondary-foreground z-1 hidden group-hover:block">
          Create New Event
        </span>
        <CgEventbrite className="size-full absolute z-0 opacity-100 transition-opacity text-muted" />
      </Button>
      <AddEventModal action="add" open={isOpen} onClose={() => setIsOpen(false)} startDate={new Date()} />
    </>
  );
});

NewEvent.displayName = 'NewEvent';
