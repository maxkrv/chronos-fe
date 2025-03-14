import { FC } from 'react';
import { FaTasks } from 'react-icons/fa';
import { LuAlarmClock } from 'react-icons/lu';
import { SiGooglemeet } from 'react-icons/si';

import { ICalendarEvent } from '../../calendar.interface';

interface MonthCalendarDayEventsProps {
  events: ICalendarEvent[];
}
export const MonthCalendarDayReminders: FC<MonthCalendarDayEventsProps> = ({ events }) => {
  const reminders = events.filter((event) => event.category === 'REMINDER');

  if (reminders.length === 0) {
    return null;
  }

  if (reminders.length === 1) {
    return (
      <div className="flex items-center gap-1 rounded-md p-0.5 text-pink bg-mix-primary-30 justify-between overflow-hidden @max-[5rem]/day:grow-0 min-h-4 min-w-4 w-full @max-[5rem]/day:w-auto">
        <LuAlarmClock className="shrink-0  @max-[5rem]/day:hidden" />
        <span className="text-sm grow text-center @max-[5rem]/day:hidden @max-[8rem]/day:leading-none  truncate">
          {reminders.at(0)?.name}
        </span>
        <div className=" @max-[5rem]/day:flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square hidden">
          <p className="text-primary-foreground shrink-0 select-none">{reminders.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-md p-0.5 text-pink bg-mix-primary-30 justify-between overflow-hidden @max-[5rem]/day:grow-0 min-h-4 min-w-4">
      <LuAlarmClock className="shrink-0  @max-[5rem]/day:hidden" />
      <span className="text-sm grow text-center @max-[7rem]/day:hidden @max-[8rem]/day:leading-none truncate">
        Reminders
      </span>
      <div className="flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square">
        <p className="text-primary-foreground shrink-0 select-none">{reminders.length}</p>
      </div>
    </div>
  );
};
export const MonthCalendarDayMeetings: FC<MonthCalendarDayEventsProps> = ({ events }) => {
  const meetings = events.filter((event) => event.category === 'ARRANGEMENT');

  if (meetings.length === 0) {
    return null;
  }

  if (meetings.length === 1) {
    return (
      <div className="flex items-center gap-1 rounded-md p-0.5 text-yellow bg-mix-primary-30 justify-between overflow-hidden @max-[5rem]/day:grow-0 min-h-4 min-w-4 w-full @max-[5rem]/day:w-auto">
        <SiGooglemeet className="shrink-0  @max-[5rem]/day:hidden" />
        <span className="text-sm grow text-center @max-[5rem]/day:hidden @max-[8rem]/day:leading-none  truncate">
          {meetings.at(0)?.name}
        </span>
        <div className=" @max-[5rem]/day:flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square hidden">
          <p className="text-primary-foreground shrink-0 select-none">{meetings.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-md p-0.5 text-yellow bg-mix-primary-30 justify-between overflow-hidden @max-[5rem]/day:grow-0 min-h-4 min-w-4">
      <SiGooglemeet className="shrink-0  @max-[5rem]/day:hidden" />
      <span className="text-sm grow text-center @max-[7rem]/day:hidden @max-[8rem]/day:leading-none  truncate">
        Meetings
      </span>
      <div className="flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square">
        <p className="text-primary-foreground shrink-0 select-none">{meetings.length}</p>
      </div>
    </div>
  );
};

export const MonthCalendarDayTasks: FC<MonthCalendarDayEventsProps> = ({ events }) => {
  const tasks = events.filter((event) => event.category === 'TASK');

  if (tasks.length === 0) {
    return null;
  }

  if (tasks.length === 1) {
    return (
      <div className="flex items-center gap-1 rounded-md p-0.5 text-green bg-mix-primary-30 justify-between overflow-hidden @max-[5rem]/day:grow-0 min-h-4 min-w-4 w-full @max-[5rem]/day:w-auto">
        <FaTasks className="shrink-0  @max-[5rem]/day:hidden" />
        <span className="text-sm grow text-center @max-[5rem]/day:hidden @max-[8rem]/day:leading-none  truncate">
          {tasks.at(0)?.name}
        </span>
        <div className=" @max-[5rem]/day:flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square hidden">
          <p className="text-primary-foreground shrink-0 select-none">{tasks.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-md p-0.5 text-green bg-mix-primary-30 justify-between overflow-hidden @max-[5rem]/day:grow-0 min-h-4 min-w-4">
      <FaTasks className="shrink-0  @max-[5rem]/day:hidden" />
      <span className="text-sm grow text-center @max-[7rem]/day:hidden @max-[8rem]/day:leading-none  truncate">
        Tasks
      </span>
      <div className="flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square">
        <p className="text-primary-foreground shrink-0 select-none">{tasks.length}</p>
      </div>
    </div>
  );
};
