import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import type * as React from 'react';

import { cn } from '../../lib/utils';

function HoverCard({
  openDelay = 0,
  closeDelay = 100,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" openDelay={openDelay} closeDelay={closeDelay} {...props} />;
}

function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent({
  className,
  align = 'center',
  side = 'top',
  avoidCollisions = true,
  collisionPadding = 8,
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        {...props}
        data-slot="hover-card-content"
        align={align}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
        side={side}
        avoidCollisions={avoidCollisions}
        className={cn(
          'bg-transparent text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-[9999] w-64 rounded-2xl border-2 p-4 shadow-md outline-hidden backdrop-blur-md',
          // Add faster animation duration
          'data-[state=open]:duration-100 data-[state=closed]:duration-100',
          className
        )}>
        <HoverCardPrimitive.Arrow className="h-2 w-4 fill-border"></HoverCardPrimitive.Arrow>
        {props.children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
