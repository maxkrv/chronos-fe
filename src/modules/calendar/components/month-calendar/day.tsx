import dayjs from 'dayjs';
import { FC } from 'react';

import { cn } from '../../../../shared/lib/utils';
import { ICalendarEvent } from '../../calendar.interface';
import { MonthCalendarDayMeetings, MonthCalendarDayReminders, MonthCalendarDayTasks } from './events';

interface MonthCalendarDayProps {
  day: Date;
  events: ICalendarEvent[];
  isActualMonth: boolean;
}
export const MonthCalendarDay: FC<MonthCalendarDayProps> = ({ day, events, isActualMonth }) => {
  return (
    <div
      className={cn(
        ' @container/day flex flex-col aspect-square gap-2 rounded-2xl border text-secondary-foreground p-1  @max-[3rem]:gap-0.5',
        !isActualMonth &&
          'bg-[repeating-linear-gradient(135deg,var(--color-accent),var(--color-accent)_10px,var(--color-white)_10px,var(--color-white)_20px)] text-muted-foreground',
        dayjs(day).isToday() && 'text-primary-foreground bg-primary'
      )}>
      <div className="flex flex-col @max-[5rem]/day:flex-row justify-center gap-1 @max-[5rem]/day:flex-wrap">
        <MonthCalendarDayTasks events={events} />
        <MonthCalendarDayMeetings events={events} />
        <MonthCalendarDayReminders events={events} />
      </div>
      <p className="w-full @max-[6rem]:text-sm  @max-[3rem]:text-xs text-center text-lg mt-auto font-semibold">
        {dayjs(day).format('D')}
      </p>
    </div>
  );
};
