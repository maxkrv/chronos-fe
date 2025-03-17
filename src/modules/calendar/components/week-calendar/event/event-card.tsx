import { FC, useEffect, useRef, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card.tsx';

import dayjs from '../../../../../shared/lib/dayjs';
import { cn } from '../../../../../shared/lib/utils';
import { CALENDAR_DAY_HEIGHT, CALENDAR_HOUR_HEIGHT, CALENDAR_MINUTE_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventContent } from './event-content';
import { EventHoverCard } from './event-hover-card.tsx';
import { CalendarEvent } from './index.tsx';

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
}
const PIXELS_PER_5_MIN = CALENDAR_MINUTE_HEIGHT * 5;

export const EventCard: FC<EventCardProps> = ({ eventHeight, indentTop, event, attendees, onUpdate }) => {
  const [height, setHeight] = useState(eventHeight);
  const [startOffset, setStartOffset] = useState(indentTop);
  const initialRef = useRef({ startY: 0, originalHeight: eventHeight, originalOffset: indentTop });
  const [saveState, triggerSave] = useToggle();
  const [isHovered, setIsHovered] = useState(false);

  const handleResizeStart = (e: React.MouseEvent, direction: 'top' | 'bottom') => {
    e.preventDefault();
    initialRef.current = { startY: e.clientY, originalHeight: height, originalOffset: startOffset };
    const controller = new AbortController();
    const signal = controller.signal;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = Math.floor((moveEvent.clientY - initialRef.current.startY) / PIXELS_PER_5_MIN) * PIXELS_PER_5_MIN;

      if (direction === 'top') {
        setHeight(
          Math.max(
            Math.min(initialRef.current.originalHeight - delta, CALENDAR_DAY_HEIGHT - startOffset),
            CALENDAR_HOUR_HEIGHT / 2
          )
        );
        setStartOffset(Math.max(Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - height), 0));
      } else {
        setHeight(
          Math.max(
            Math.min(initialRef.current.originalHeight + delta, CALENDAR_DAY_HEIGHT - startOffset),
            CALENDAR_HOUR_HEIGHT / 2
          )
        );
        if (delta < 0 && height <= CALENDAR_HOUR_HEIGHT / 2) {
          setStartOffset(
            Math.max(Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - height), 0)
          );
        }
      }
    };

    const handleMouseUp = () => {
      controller.abort();
      triggerSave();
    };

    window.addEventListener('mousemove', handleMouseMove, { signal });
    window.addEventListener('mouseup', handleMouseUp, { signal });
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    initialRef.current = { startY: e.clientY, originalHeight: height, originalOffset: startOffset };
    const controller = new AbortController();
    const signal = controller.signal;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = Math.floor((moveEvent.clientY - initialRef.current.startY) / PIXELS_PER_5_MIN) * PIXELS_PER_5_MIN;

      setStartOffset(Math.max(Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - height), 0));
    };

    const handleMouseUp = () => {
      controller.abort();
      triggerSave();
    };

    window.addEventListener('mousemove', handleMouseMove, { signal });
    window.addEventListener('mouseup', handleMouseUp, { signal });
  };

  useEffect(() => {
    const newStart = dayjs(event.startAt)
      .startOf('day')
      .add((startOffset / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();
    const newEnd = dayjs(event.endAt)
      .startOf('day')
      .add(((startOffset + height) / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();
    onUpdate({ ...event, startAt: newStart, endAt: newEnd });
  }, [saveState]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="absolute p-0.75 w-full h-full overflow-hidden grow-0 shrink-0 select-none "
          style={{
            height,
            top: startOffset,
            color: event.color,
            minHeight: CALENDAR_HOUR_HEIGHT / 2,
            zIndex: isHovered ? CALENDAR_DAY_HEIGHT : Math.max(CALENDAR_DAY_HEIGHT - height, 0)
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}>
          <div className="flex flex-row w-full gap-2 px-1 py-2 cursor-pointer rounded-lg overflow-hidden bg-mix-primary-20 border-2 border-transparent hover:border-dashed hover:border-current max-h-full h-full relative group min-h-1.5">
            <div className="min-w-1 max-w-1 bg-current rounded-md" />
            <ResizeHandle
              className="absolute top-0 left-0 right-0 group-hover:flex hidden"
              onMouseDown={(e) => handleResizeStart(e, 'top')}
            />
            <EventContent event={event} attendees={attendees} height={height} onMouseDown={handleDragStart} />
            <ResizeHandle
              className="absolute bottom-0 left-0 right-0 group-hover:flex hidden"
              onMouseDown={(e) => handleResizeStart(e, 'bottom')}
            />
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent side="right" className="w-96">
        <EventHoverCard event={event} />
      </HoverCardContent>
    </HoverCard>
  );
};
