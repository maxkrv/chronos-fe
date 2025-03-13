import dayjs, { Dayjs } from 'dayjs';
import { FC } from 'react';
import { FaTasks } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';

import { cn } from '../../../../../shared/lib/utils';
import { User } from '../../../../user/user.interface';
import { ICalendarEvent } from '../../../calendar.interface';
import { CALENDAR_HOUR_HEIGHT } from '../hour';
import { AttendeeAvatars } from './attendee-avatars';

const getFormattedHour = (date: Date | Dayjs | string) => dayjs(date).format('hh:mm');
interface EventContentProps extends React.HTMLAttributes<HTMLDivElement> {
  event: ICalendarEvent;
  attendees?: User[];
  height: number;
}
export const EventContent: FC<EventContentProps> = ({ event, attendees, height, className, ...props }) => (
  <div {...props} className={cn('flex flex-col w-full gap-1 min-h-1.5 cursor-move', className)}>
    <div className="m-0 p-0 overflow-hidden grow flex">
      <p
        className={cn(
          'overflow-hidden leading-4 grow truncate',
          height > CALENDAR_HOUR_HEIGHT && 'text-clip',
          height < CALENDAR_HOUR_HEIGHT * 0.75 && 'my-auto'
        )}>
        <span className="inline-flex gap-2 size-4 mr-2 items-center">
          {event.category === 'ARRANGEMENT' ? <SiGooglemeet /> : <FaTasks />}
        </span>
        {event.name}
      </p>
    </div>
    <h5 className={cn('m-0 p-0 text-xs', height < CALENDAR_HOUR_HEIGHT * 0.75 && 'hidden')}>
      {`${getFormattedHour(event.startAt)} - ${getFormattedHour(event.endAt!)}`}
    </h5>
    <AttendeeAvatars attendees={attendees} className={cn(height < CALENDAR_HOUR_HEIGHT && 'hidden')} />
  </div>
);
