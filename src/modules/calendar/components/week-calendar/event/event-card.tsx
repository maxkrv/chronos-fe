import { FC, useEffect, useRef, useState } from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card.tsx';

import dayjs from '../../../../../shared/lib/dayjs';
import { cn } from '../../../../../shared/lib/utils';
import { CALENDAR_DAY_HEIGHT, CALENDAR_HOUR_HEIGHT, CALENDAR_MINUTE_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventContent } from './event-content';
import { EventHoverCard } from './event-hover-card.tsx';
import { CalendarEvent } from './index.tsx';

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
}

export const EventCard: FC<EventCardProps> = ({
  eventHeight,
  indentTop,
  event,
  day,
  onUpdate,
  onEdit: setIsEditEventOpen
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [height, setHeight] = useState(eventHeight);
  const [startOffset, setStartOffset] = useState(indentTop);
  const initialRef = useRef({ startY: 0, originalHeight: eventHeight, originalOffset: indentTop });
  const eventStateRef = useRef({ height, startOffset });
  const isResizeable =
    dayjs(event.startAt).isSame(day, 'day') && (event.endAt ? dayjs(event.endAt).isSame(day, 'day') : true);

  useEffect(() => {
    eventStateRef.current = { height, startOffset };
  }, [height, startOffset]);

  const updateEventTime = () => {
    const { height: latestHeight, startOffset: latestOffset } = eventStateRef.current;
    const newStart = dayjs(event.startAt)
      .startOf('day')
      .add((latestOffset / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();
    const newEnd = dayjs(event.endAt)
      .startOf('day')
      .add(((latestOffset + latestHeight) / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();

    if (dayjs(event.startAt).isSame(newStart, 'minute') && dayjs(event.endAt).isSame(newEnd, 'minute')) return;
    onUpdate({ ...event, startAt: newStart, endAt: newEnd });
  };

  const handleResizeOrDrag = (e: React.MouseEvent, direction?: 'top' | 'bottom') => {
    e.preventDefault();
    if (!isResizeable) return;
    initialRef.current = { startY: e.clientY, originalHeight: height, originalOffset: startOffset };
    const controller = new AbortController();
    const signal = controller.signal;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = Math.floor((moveEvent.clientY - initialRef.current.startY) / PIXELS_PER_5_MIN) * PIXELS_PER_5_MIN;
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

    const handleMouseUp = () => {
      controller.abort();
      updateEventTime();
    };

    window.addEventListener('mousemove', handleMouseMove, { signal });
    window.addEventListener('mouseup', handleMouseUp, { signal });
  };

  return (
    <HoverCard openDelay={0}>
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

      <HoverCardContent className="w-96">
        <EventHoverCard setIsEditEventOpen={setIsEditEventOpen} event={event} />
      </HoverCardContent>
    </HoverCard>
  );
};
