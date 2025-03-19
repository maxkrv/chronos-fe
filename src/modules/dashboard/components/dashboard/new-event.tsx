import { CgEventbrite } from 'react-icons/cg';

import { Button } from '../../../../shared/components/ui/button';

export const NewEvent = () => {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="group relative w-full h-full hover:border-dashed border-primary bg-inherit border-2 rounded-3xl text-muted">
      <span className="text-lg text-wrap text-secondary-foreground z-1 hidden group-hover:block">Create New Event</span>
      <CgEventbrite className="size-full absolute z-0 opacity-100 transition-opacity   text-muted" />
    </Button>
  );
};
