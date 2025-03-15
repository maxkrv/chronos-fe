import dayjs from 'dayjs';
import { FC } from 'react';

import { cn } from '../../../../shared/lib/utils';
import { ICalendarEvent } from '../../calendar.interface';
import { MonthCalendarDayMeetings, MonthCalendarDayReminders, MonthCalendarDayTasks } from './events';

interface MonthCalendarDayProps {
  day: Date;
  events: ICalendarEvent[];
  isActualMonth: boolean;
  hideEvents?: boolean;
}
export const MonthCalendarDay: FC<MonthCalendarDayProps> = ({ day, events, isActualMonth, hideEvents = false }) => {
  return (
    <div
      className={cn(
        ' @container/day flex flex-col gap-2 rounded-2xl border text-secondary-foreground p-1  @max-[3rem]:gap-0.5 justify-center aspect-square',
        !isActualMonth &&
          'bg-[repeating-linear-gradient(135deg,var(--color-accent),var(--color-accent)_10px,var(--color-white)_10px,var(--color-white)_20px)] text-muted-foreground',
        dayjs(day).isToday() && 'text-primary-foreground bg-primary'
      )}>
      <div className={cn('flex flex-col justify-center items-center gap-1  min-h-17', hideEvents && 'hidden')}>
        <MonthCalendarDayTasks events={events} />
        <MonthCalendarDayMeetings events={events} />
        <MonthCalendarDayReminders events={events} />
      </div>
      <p
        className={cn(
          'w-full @max-[6rem]:text-sm  @max-[3rem]:text-xs text-center text-lg font-semibold',
          !hideEvents && 'mt-auto'
        )}>
        {dayjs(day).format('D')}
      </p>
    </div>
  );
};
