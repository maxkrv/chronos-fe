import { ElementType, FC } from 'react';
import { FaTasks } from 'react-icons/fa';
import { LuAlarmClock } from 'react-icons/lu';
import { SiGooglemeet } from 'react-icons/si';

import { cn } from '../../../../shared/lib/utils';
import { EventCategory, ICalendarEvent } from '../../calendar.interface';

interface MonthCalendarDayEventsProps {
  events: ICalendarEvent[];
  type?: EventCategory;
  icon: ElementType;
  className?: string;
}

interface MonthCalendarDayEventsGroupProps {
  events: ICalendarEvent[];
}
const MonthCalendarDayEvents: FC<MonthCalendarDayEventsProps> = ({ events, type, className, icon: Icon }) => {
  const e = events.filter((event) => event.category === type);

  if (e.length == 0) return null;

  if (e.length <= 1) {
    return (
      <div
        className={cn(
          'flex items-center gap-1 rounded-md p-0.5 text-gray bg-mix-primary-30 justify-between overflow-hidden min-h-4 min-w-4 w-full @max-[8rem]/day:h-5 @max-[3rem]/day:w-auto',
          className
        )}>
        <Icon className="shrink-0  @max-[3rem]/day:hidden" />
        <span className="text-sm grow text-center @max-[5rem]/day:hidden @max-[8rem]/day:leading-none  truncate">
          {e.at(0)?.name}
        </span>
        <div className=" @max-[5rem]/day:flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square hidden">
          <p className="text-primary-foreground shrink-0 select-none">{e.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-md p-0.5 text-gray bg-mix-primary-30 justify-between overflow-hidden min-h-4 min-w-4 w-full @max-[8rem]/day:h-5 @max-[3rem]/day:w-auto',
        className
      )}>
      <Icon className="shrink-0  @max-[3rem]/day:hidden" />
      <span className="text-sm grow text-center @max-[7rem]/day:hidden @max-[8rem]/day:leading-none truncate">
        {type === 'TASK' ? 'Tasks' : type === 'REMINDER' ? 'Reminders' : 'Meetings'}
      </span>
      <div className="flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square">
        <p className="text-primary-foreground shrink-0 select-none">{e.length}</p>
      </div>
    </div>
  );
};
export const MonthCalendarDayReminders: FC<MonthCalendarDayEventsGroupProps> = ({ events }) => (
  <MonthCalendarDayEvents events={events} type={EventCategory.REMINDER} icon={LuAlarmClock} className="text-pink" />
);

export const MonthCalendarDayMeetings: FC<MonthCalendarDayEventsGroupProps> = ({ events }) => (
  <MonthCalendarDayEvents
    events={events}
    type={EventCategory.ARRANGEMENT}
    icon={SiGooglemeet}
    className="text-yellow"
  />
);

export const MonthCalendarDayTasks: FC<MonthCalendarDayEventsGroupProps> = ({ events }) => (
  <MonthCalendarDayEvents events={events} type={EventCategory.TASK} icon={FaTasks} className="text-green" />
);
