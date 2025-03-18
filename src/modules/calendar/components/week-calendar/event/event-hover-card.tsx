import { differenceInHours, format } from 'date-fns';
import { FC } from 'react';
import { FaTasks } from 'react-icons/fa';
import { FaArrowRight, FaTrash } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa6';
import { IoLink, IoTimerOutline } from 'react-icons/io5';
import { SiGooglemeet } from 'react-icons/si';
import { TbRepeat } from 'react-icons/tb';

import { EventCategory, ICalendarEvent } from '@/modules/calendar/calendar.interface';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { UserAvatar } from '@/shared/components/user-avatar';
import { cn } from '@/shared/lib/utils';

interface EventHoverCardProps {
  event: ICalendarEvent;
  setIsEditEventOpen: (event: ICalendarEvent) => void;
}

export const EventHoverCard: FC<EventHoverCardProps> = ({ event, setIsEditEventOpen }) => {
  const difference = event.endAt ? differenceInHours(event.endAt, event.startAt) : null;

  return (
    <div className="flex flex-col gap-2">
      <header className="flex justify-between">
        <div className="flex gap-2 items-center line-clamp-1 truncate break-all">
          {event.category === EventCategory.ARRANGEMENT ? (
            <SiGooglemeet className="min-w-4" />
          ) : (
            <FaTasks className="min-w-4" />
          )}{' '}
          <p className="line-clamp-1 truncate whitespace-normal">{event.name}</p>
        </div>

        <div className="flex gap-1 items-center">
          <Button variant="outline" className="h-6 w-6" onClick={() => setIsEditEventOpen(event)}>
            <FaPen className="h-3! w-3!" />
          </Button>
          <Button variant="outline" className="h-6 w-6">
            <FaTrash className="h-3! w-3!" />
          </Button>
        </div>
      </header>

      <div className="flex gap-2 items-center">
        <IoTimerOutline className="min-h-10 min-w-10 ml-[-7px]" />

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span>{format(event.startAt, 'EEE dd, MMM')}</span>

            {event.endAt && (
              <>
                <FaArrowRight />
                <span>{format(event.endAt, 'EEE dd, MMM')}</span>
              </>
            )}
          </div>

          <div className="flex gap-2 items-center">
            {format(event.startAt, 'HH:mm')}

            {event.endAt && (
              <>
                <FaArrowRight />
                <span>{format(event.endAt, 'HH:mm')}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col ml-auto">
          {difference && (
            <p className="whitespace-nowrap">
              {difference} {difference === 1 ? 'hour' : 'hours'}
            </p>
          )}

          {event.repeat && (
            <p className="flex items-center">
              <TbRepeat className="opacity-50" />
              {event.repeat.interval} {event.repeat.frequency.charAt(0)}
            </p>
          )}
        </div>
      </div>

      {event.link && (
        <div className="flex gap-2 items-center break-all">
          <IoLink className="min-w-[13px]" />

          <a href={event.link} className="text-blue-400 line-clamp-1" target="_blank" rel="noreferrer">
            {event.link}
          </a>
        </div>
      )}

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <p>{event.description}</p>
        </TabsContent>
        <TabsContent value="participants">
          <ScrollArea className="h-[100px]">
            <div className="flex flex-col gap-2">
              {event.attendees.map((participant) => (
                <div key={participant.id} className="flex gap-2 items-center">
                  <UserAvatar user={participant} />
                  <p>
                    {participant.name} {participant.surname}
                  </p>
                </div>
              ))}
            </div>

            <ScrollBar />
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: 'default' }), 'mt-5')}>
          Follow link
        </a>
      )}
    </div>
  );
};
