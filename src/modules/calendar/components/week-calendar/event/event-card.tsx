'use client';

import type React from 'react';
import { type FC, useEffect, useRef, useState } from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card.tsx';
import { useUserStore } from '@/shared/store/user.store.ts';

import dayjs from '../../../../../shared/lib/dayjs';
import { cn } from '../../../../../shared/lib/utils';
import { CALENDAR_DAY_HEIGHT, CALENDAR_HOUR_HEIGHT, CALENDAR_MINUTE_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventContent } from './event-content';
import { EventHoverCard } from './event-hover-card.tsx';
import type { CalendarEvent } from './index.tsx';

const PIXELS_PER_5_MIN = CALENDAR_MINUTE_HEIGHT * 5;

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  className?: string;
}

const ResizeHandle: FC<ResizeHandleProps> = ({ onMouseDown, className }) => (
  <div className={cn('w-full flex h-2 text-current cursor-row-resize', className)} onMouseDown={onMouseDown}>
    <div className="border-y-2 w-8 h-1.25 border-current m-auto" />
  </div>
);

interface EventCardProps extends React.ComponentProps<typeof CalendarEvent> {
  eventHeight: number;
  indentTop: number;
  now?: Date;
  activeEventId: number | null;
  setActiveEventId: (id: number | null) => void;
}

export const EventCard: FC<EventCardProps> = ({
  eventHeight,
  indentTop,
  event,
  day,
  onUpdate,
  onEdit: setIsEditEventOpen,
  activeEventId,
  setActiveEventId
}) => {
  const { user } = useUserStore();

  const [height, setHeight] = useState(eventHeight);
  const [startOffset, setStartOffset] = useState(indentTop);
  const initialRef = useRef({ startY: 0, originalHeight: eventHeight, originalOffset: indentTop });
  const eventStateRef = useRef({ height, startOffset });
  const isResizeable =
    dayjs(event.startAt).isSame(day, 'day') &&
    (event.endAt ? dayjs(event.endAt).subtract(1, 'minute').isSame(day, 'day') : true) &&
    event.creatorId === user?.id;

  // Determine if this event's hover card should be open
  const isHoverCardOpen = activeEventId === event.id;

  useEffect(() => {
    eventStateRef.current.height = height;
  }, [height]);

  useEffect(() => {
    eventStateRef.current.startOffset = startOffset;
  }, [startOffset]);

  useEffect(() => {
    setHeight(eventHeight);
  }, [eventHeight]);

  useEffect(() => {
    setStartOffset(indentTop);
  }, [indentTop]);

  const updateEventTime = () => {
    const { height: latestHeight, startOffset: latestOffset } = eventStateRef.current;
    const newStart = dayjs(day)
      .startOf('day')
      .add((latestOffset / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();
    const newEnd = dayjs(day)
      .startOf('day')
      .add(((latestOffset + latestHeight) / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();

    if (dayjs(event.startAt).isSame(newStart, 'minute') && dayjs(event.endAt).isSame(newEnd, 'minute')) return;
    onUpdate({ ...event, startAt: newStart, endAt: newEnd });
  };

  const handleResizeOrDrag = (e: React.MouseEvent, direction?: 'top' | 'bottom') => {
    e.preventDefault();
    if (!isResizeable) return;

    // Get the client Y position from mouse event
    const clientY = e.clientY;

    initialRef.current = {
      startY: clientY,
      originalHeight: height,
      originalOffset: startOffset
    };

    const controller = new AbortController();
    const signal = controller.signal;

    const handleMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const moveClientY = moveEvent.clientY;
      const delta = Math.floor((moveClientY - initialRef.current.startY) / PIXELS_PER_5_MIN) * PIXELS_PER_5_MIN;
      let newHeight = height;
      let newOffset = startOffset;

      if (direction === 'top') {
        newHeight = Math.max(
          Math.min(initialRef.current.originalHeight - delta, CALENDAR_DAY_HEIGHT - startOffset),
          CALENDAR_HOUR_HEIGHT / 2
        );
        newOffset = Math.max(Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - newHeight), 0);
      } else if (direction === 'bottom') {
        newHeight = Math.max(
          Math.min(initialRef.current.originalHeight + delta, CALENDAR_DAY_HEIGHT - startOffset),
          CALENDAR_HOUR_HEIGHT / 2
        );
        if (delta < 0 && newHeight <= CALENDAR_HOUR_HEIGHT / 2) {
          newOffset = Math.max(Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - newHeight), 0);
        }
      } else {
        newOffset = Math.max(Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - height), 0);
      }

      setHeight(newHeight);
      setStartOffset(newOffset);
      eventStateRef.current = { height: newHeight, startOffset: newOffset };
    };

    const handleEnd = () => {
      controller.abort();
      updateEventTime();
    };

    window.addEventListener('mousemove', handleMove, { signal });
    window.addEventListener('mouseup', handleEnd, { signal });
  };

  // Simplify the handleTouchEnd function to just toggle the hover card
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Toggle the hover card
    if (activeEventId === event.id) {
      setActiveEventId(null);
    } else {
      setActiveEventId(event.id);
    }
  };

  return (
    <HoverCard
      open={isHoverCardOpen}
      onOpenChange={(open) => {
        if (open) {
          setActiveEventId(event.id);
        } else if (activeEventId === event.id) {
          setActiveEventId(null);
        }
      }}>
      <HoverCardTrigger asChild>
        <div
          className="absolute p-0.75 w-full h-full overflow-hidden grow-0 shrink-0 select-none hover:z-[5000]! calendar-event"
          style={{
            height,
            top: startOffset,
            color: event.color,
            minHeight: CALENDAR_HOUR_HEIGHT / 2,
            zIndex: Math.max(CALENDAR_DAY_HEIGHT - eventHeight, 0)
          }}
          onTouchEnd={handleTouchEnd}>
          <div
            className={cn(
              'flex flex-row w-full gap-2 px-1 py-2 cursor-pointer rounded-lg overflow-hidden bg-mix-primary-20 border-2 border-transparent hover:border-current max-h-full h-full relative group min-h-1.5',
              isResizeable && 'hover:border-dashed'
            )}>
            <div className="min-w-1 max-w-1 bg-current rounded-md" />
            <ResizeHandle
              className={cn(
                'absolute top-0 left-0 right-0 group-hover:flex hidden',
                !isResizeable && 'group-hover:hidden'
              )}
              onMouseDown={(e) => handleResizeOrDrag(e, 'top')}
            />
            <EventContent event={event} height={height} onMouseDown={handleResizeOrDrag} isResizeable={isResizeable} />
            <ResizeHandle
              className={cn(
                'absolute bottom-0 left-0 right-0 group-hover:flex hidden',
                !isResizeable && 'group-hover:hidden'
              )}
              onMouseDown={(e) => handleResizeOrDrag(e, 'bottom')}
            />
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-[90vw] max-w-96 z-[9999]">
        <EventHoverCard setIsEditEventOpen={setIsEditEventOpen} event={event} />
      </HoverCardContent>
    </HoverCard>
  );
};
