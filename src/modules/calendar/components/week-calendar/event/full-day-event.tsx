import { FC } from 'react';
import { FaTasks } from 'react-icons/fa';
import { IoTimerOutline } from 'react-icons/io5';
import { MdEvent } from 'react-icons/md';
import { SiGooglemeet } from 'react-icons/si';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card';

import { EventCategory, ICalendarEvent } from '../../../calendar.interface';
import { CALENDAR_HOUR_HEIGHT } from '../hour';
import { EventHoverCard } from './event-hover-card';

interface EventReminderProps {
  event: ICalendarEvent;
  onEdit: (event: ICalendarEvent) => void;
}

export const FullDayEvent: FC<EventReminderProps> = ({ event, onEdit }) => {
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <div
          className="p-0.75 w-full h-full shrink-0"
          style={{
            color: event.color,
            minHeight: CALENDAR_HOUR_HEIGHT / 2
          }}>
          <div className="flex flex-row w-full gap-2 px-1 py-2 cursor-pointer rounded-lg overflow-hidden bg-mix-primary-20 border-2 border-transparent hover:border-current relative group min-h-1.5 h-full">
            <div className="min-w-1 max-w-1 bg-current rounded-md" />
            <div className="m-0 p-0 overflow-hidden flex grow">
              <p className="break-words leading-4 grow my-auto w-min min-w-12 line-clamp-2">
                <span className="inline-flex gap-2 size-4 mr-2 items-center">
                  {event.category === EventCategory.ARRANGEMENT && <SiGooglemeet />}
                  {event.category === EventCategory.TASK && <FaTasks />}
                  {event.category === EventCategory.REMINDER && <IoTimerOutline />}
                  {event.category === EventCategory.OCCASION && <MdEvent />}
                </span>
                {event.name}
              </p>
            </div>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-96">
        <EventHoverCard event={event} setIsEditEventOpen={onEdit} />
      </HoverCardContent>
    </HoverCard>
  );
};
