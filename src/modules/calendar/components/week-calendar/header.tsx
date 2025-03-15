import dayjs from 'dayjs';
import { FC } from 'react';

import { cn } from '../../../../shared/lib/utils';

const getTimeZone = () => {
  const offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
  return (offset < 0 ? '+' : '-') + ('' + Math.floor(o / 60)).slice(-2);
};
interface WeekCalendarHeaderProps {
  fromDay: Date;
  days: number;
}

export const WeekCalendarHeader: FC<WeekCalendarHeaderProps> = ({ fromDay, days }) => {
  return (
    <div className="grid grid-cols-[4rem_1fr] w-full">
      <div className="flex grow justify-center items-center font-bold text-sm text-gray-500 p-1">
        GMT{getTimeZone()}
      </div>
      <div className="flex flex-row justify-evenly gap-1">
        {Array.from({ length: days }).map((_, i) => {
          const day = dayjs(fromDay).add(i, 'day');
          return (
            <div
              key={i}
              className={cn(
                'flex flex-row items-end justify-center font-semibold gap-2 text-accent-foreground bg-accent grow text-center py-4 rounded-[1.25rem] w-24 min-w-24',
                dayjs(day).isToday() && 'bg-primary text-primary-foreground'
              )}>
              <p className="m-0 p-0 text-xl leading-none">{day.format('DD')},</p>
              <p className="m-0 p-0 text-lg leading-none">{day.format('ddd')}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
