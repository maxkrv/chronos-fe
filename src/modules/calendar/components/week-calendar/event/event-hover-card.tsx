import { differenceInHours, format } from 'date-fns';
import { FC } from 'react';
import { FaTasks } from 'react-icons/fa';
import { FaArrowRight, FaPen, FaTrash } from 'react-icons/fa6';
import { IoLink, IoTimerOutline } from 'react-icons/io5';
import { LuCalendarClock } from 'react-icons/lu';
import { MdEvent } from 'react-icons/md';
import { SiGooglemeet } from 'react-icons/si';
import { TbRepeat } from 'react-icons/tb';

import { EventCategory, ICalendarEvent } from '@/modules/calendar/calendar.interface';
import { Button, buttonVariants } from '@/shared/components/ui/button';
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
      <header className="flex justify-between gap-2">
        <div className="flex gap-2 items-center line-clamp-1 truncate break-all text-xl">
          {event.category === EventCategory.ARRANGEMENT && <SiGooglemeet className="size-6" />}
          {event.category === EventCategory.TASK && <FaTasks className="size-6" />}
          {event.category === EventCategory.REMINDER && <IoTimerOutline className="size-6" />}
          {event.category === EventCategory.OCCURANCE && <MdEvent className="size-6" />}
          <p className="line-clamp-1 truncate whitespace-normal">{event.name}</p>
        </div>

        <div className="flex gap-1 items-center">
          <Button variant="outline" className="h-6 w-6" onClick={() => setIsEditEventOpen(event)}>
            <FaPen className="h-3! w-3!" />
          </Button>
          <Button variant="destructive" className="h-6 w-6">
            <FaTrash className="h-3! w-3!" />
          </Button>
        </div>
      </header>

      <div className="flex gap-2 items-center text-muted-foreground -ml-1.5">
        <LuCalendarClock className="min-h-10 min-w-10" />

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
            {event.category !== EventCategory.OCCURANCE && format(event.startAt, 'HH:mm')}

            {event.endAt && (
              <>
                <FaArrowRight />
                <span>{format(event.endAt, 'HH:mm')}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col ml-auto text-muted-foreground">
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
          <IoLink className="size-6 text-blue-400" />

          <a href={event.link} className="text-blue-400 line-clamp-1 hover:underline" target="_blank" rel="noreferrer">
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
          <p className="overflow-auto max-h-52 h-full">
            {event.description ? (
              event.description
            ) : (
              <div className="h-full w-full text-center border text-muted-foreground">
                No description provided for this event.
              </div>
            )}
          </p>
        </TabsContent>
        <TabsContent value="participants">
          <div className="flex flex-col gap-2 overflow-auto max-h-52 h-full">
            {event.attendees.map((participant) => (
              <div key={participant.id} className="flex gap-2 items-center">
                <UserAvatar user={participant} />
                <p>
                  {participant.name} {participant.surname}
                </p>
              </div>
            ))}
            {event.attendees.length === 0 && (
              <div className="h-full w-full text-center border text-muted-foreground">
                No participants for this event.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'mt-5 hover:bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 border-none transition-all duration-300'
          )}>
          Follow link
        </a>
      )}
    </div>
  );
};
