import dayjs from 'dayjs';
import { FC, useEffect, useRef, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card';

import { ICalendarEvent } from '../../../calendar.interface';
import { CALENDAR_DAY_HEIGHT } from '../hour';
import { MINUTES_IN_DAY } from '../now';
import { EventHoverCard } from './event-hover-card';

interface EventReminderProps {
  event: ICalendarEvent;
  indentTop: number;
  onUpdate: (event: ICalendarEvent) => void;
}

export const EventReminder: FC<EventReminderProps> = ({ event, indentTop, onUpdate }) => {
  const REMINDER_HEIGHT = 40;
  const [saveState, triggerSave] = useToggle();
  const [startOffset, setStartOffset] = useState(indentTop);
  const initialRef = useRef({ startY: 0, originalOffset: indentTop });

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    initialRef.current = { startY: e.clientY, originalOffset: startOffset };
    const controller = new AbortController();
    const signal = controller.signal;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientY - initialRef.current.startY;

      setStartOffset(
        Math.max(Math.min(initialRef.current.originalOffset + delta, CALENDAR_DAY_HEIGHT - REMINDER_HEIGHT), 0)
      );
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
      .add(((startOffset + REMINDER_HEIGHT) / CALENDAR_DAY_HEIGHT) * MINUTES_IN_DAY, 'minute')
      .toDate();
    onUpdate({ ...event, startAt: newStart, endAt: newEnd });
  }, [saveState]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="absolute p-0.75 w-full max-h-10 h-full shrink-0 transform -translate-y-2/5 cursor-move"
          style={{
            top: startOffset,
            color: event.color,
            minHeight: REMINDER_HEIGHT,
            zIndex: CALENDAR_DAY_HEIGHT - REMINDER_HEIGHT
          }}
          onMouseDown={handleDragStart}>
          <div className="flex flex-row w-full gap-2 p-1 rounded-lg overflow-hidden border-2 border-transparent hover:border-dashed hover:border-current max-h-full items-center hover:bg-mix-primary-20">
            <div className="min-w-2.5 max-w-2.5 min-h-2.5 max-h-2.5 bg-current rounded-md" />
            <p className="m-0 p-0 truncate leading-4">{event.name}</p>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent side="right" className="w-96">
        <EventHoverCard event={event} />
      </HoverCardContent>
    </HoverCard>
  );
};
