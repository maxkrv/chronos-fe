import dayjs from 'dayjs';
import { FC } from 'react';

import { cn } from '../../../shared/lib/utils';
import { ICalendarEvent } from '../../calendar/calendar.interface';

interface UpcomingEventsProps {
  events?: ICalendarEvent[];
}

export const UpcomingEvents: FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <div className="flex h-full pl-4">
      <div className="h-[calc(100%-7rem)] border-3 rounded-full border-red" />
      <div className="relative -left-3.75 flex flex-col w-full gap-3">
        {events?.map((event, index) => (
          <div key={index} className="flex justify-between h-28 max-h-28 w-full shrink-0 gap-3">
            <div
              className={cn(
                'size-6 border-4 border-background rounded-full aspect-square bg-current',
                index === 0 && 'outline-current outline-3',
                index === events.length - 1 && 'border-current bg-background'
              )}
              style={{ color: event.color || 'var(--color-primary)' }}
            />
            <div
              className="flex flex-col gap-2 w-full rounded-2xl p-2 overflow-hidden bg-mix-primary-20 border-2 border-current"
              style={{ color: event.color }}>
              <div className="flex justify-between gap-2">
                <h1 className="text-lg font-medium line-clamp-2 text-foreground">{event.name}</h1>
                <p className="text-sm">{dayjs(event.startAt).format('HH:mm')}</p>
              </div>
              <p className="text-sm overflow-hidden text-clip grow [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0))]">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
