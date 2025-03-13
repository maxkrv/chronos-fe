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
  days: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const WeekCalendarHeader: FC<WeekCalendarHeaderProps> = ({ fromDay, days }) => {
  return (
    <div className="grid grid-cols-[5rem_1fr] w-full">
      <div className="flex grow p-2 justify-center items-center font-bold text-sm text-neutral-500">
        GMT{getTimeZone()}
      </div>
      <div className="flex flex-row justify-evenly gap-1 *:grow *:text-center *:py-4 *:rounded-[1.25rem] *:w-24">
        {Array.from({ length: days }).map((_, i) => {
          const day = dayjs(fromDay).add(i, 'day');
          return (
            <div
              key={i}
              className={cn(
                'flex flex-row items-end justify-center border font-semibold gap-2 bg-neutral-200 text-neutral-600',
                dayjs(day).isToday() && 'bg-neutral-900 text-neutral-200'
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
