import dayjs from 'dayjs';
import type React from 'react';
import { type FC, useEffect, useRef, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card';
import { useUserStore } from '@/shared/store/user.store';

import { useIsMobile } from '../../../../../shared/hooks/use-breakpoint';
import type { ICalendarEvent } from '../../../calendar.interface';
import { CALENDAR_DAY_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventHoverCard } from './event-hover-card';

const REMINDER_HEIGHT = 40;

interface EventReminderProps {
  event: ICalendarEvent;
  indentTop: number;
  onUpdate: (event: ICalendarEvent) => void;
  setIsEditEventOpen: (event: ICalendarEvent) => void;
}

export const EventReminder: FC<EventReminderProps> = ({ event, indentTop, onUpdate, setIsEditEventOpen }) => {
  const { user } = useUserStore();
  const isOwner = event.creatorId === user?.id;
  const isMobile = useIsMobile();
  const [startOffset, setStartOffset] = useState(indentTop);
  const [isHovered, toggleHovered, setIsHovered] = useToggle(false);
  const initialRef = useRef({ startY: 0, originalOffset: indentTop });
  const offsetRef = useRef(startOffset);

  useEffect(() => {
    offsetRef.current = startOffset;
  }, [startOffset]);

  useEffect(() => {
    setStartOffset(indentTop);
  }, [indentTop]);

  const updateEventTime = () => {
    const newStart = dayjs(event.startAt)
      .startOf('day')
      .add((offsetRef.current / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();
    const newEnd = dayjs(event.endAt)
      .startOf('day')
      .add(((offsetRef.current + REMINDER_HEIGHT) / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();
    if (dayjs(event.startAt).isSame(newStart, 'minute')) return;
    onUpdate({ ...event, startAt: newStart, endAt: event.category !== 'REMINDER' ? newEnd : undefined });
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (!isOwner) return;

    e.preventDefault();
    initialRef.current = { startY: e.clientY, originalOffset: startOffset };
    const controller = new AbortController();
    const signal = controller.signal;

    const handleMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const delta = moveEvent.clientY - initialRef.current.startY;
      const newOffset = Math.max(
        Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - REMINDER_HEIGHT),
        0
      );
      setStartOffset(newOffset);
      offsetRef.current = newOffset;
    };

    const handleEnd = () => {
      controller.abort();
      updateEventTime();
    };

    window.addEventListener('mousemove', handleMove, { signal });
    window.addEventListener('mouseup', handleEnd, { signal });
  };

  return (
    <HoverCard open={isHovered} onOpenChange={setIsHovered}>
      <HoverCardTrigger asChild>
        <div
          className="absolute p-0.75 w-full max-h-10 h-full shrink-0 transform -translate-y-2/5 cursor-move calendar-event"
          style={{
            top: startOffset,
            color: event.color,
            minHeight: REMINDER_HEIGHT,
            zIndex: isHovered ? CALENDAR_DAY_HEIGHT : CALENDAR_DAY_HEIGHT - REMINDER_HEIGHT
          }}
          onMouseDown={(e) => !isMobile && handleDragStart(e)}
          onMouseEnter={() => {
            !isMobile && setIsHovered(true);
          }}
          onMouseLeave={() => !isMobile && setIsHovered(true)}
          onClick={() => {
            toggleHovered();
          }}>
          <div className="flex flex-row w-full gap-2 p-1 rounded-lg overflow-hidden border-2 border-transparent hover:border-dashed hover:border-current max-h-full items-center hover:bg-mix-primary-20">
            <div className="min-w-2.5 max-w-2.5 min-h-2.5 max-h-2.5 bg-current rounded-md" />
            <p className="m-0 p-0 truncate leading-4">{event.name}</p>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-[90vw] max-w-96 z-[9999]">
        <EventHoverCard event={event} setIsEditEventOpen={setIsEditEventOpen} />
      </HoverCardContent>
    </HoverCard>
  );
};
