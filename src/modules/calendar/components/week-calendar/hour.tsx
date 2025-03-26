import { FC } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { cn } from '../../../../shared/lib/utils';

export const CALENDAR_HOUR_HEIGHT = 96;

export const CALENDAR_DAY_HEIGHT = CALENDAR_HOUR_HEIGHT * 24;
export const CALENDAR_MINUTE_HEIGHT = CALENDAR_HOUR_HEIGHT / 60;

interface HourProps {
  hour: number;
  setDate: (timeStart: number, timeEnd: number) => void;
  isActive?: boolean;
}

export const Hour: FC<HourProps> = ({ setDate, hour, isActive = false }) => {
  const handleSetDate = () => {
    const timeStart = hour;
    const timeEnd = timeStart + 1;

    setDate(timeStart, timeEnd);
  };

  return (
    <div
      className={cn(
        'relative border flex flex-col group',
        isActive && 'hover:bg-red-400/30 hover:cursor-pointer hover:border-dashed hover:border-red-600 hover:rounded-lg'
      )}
      style={{ height: CALENDAR_HOUR_HEIGHT }}
      onClick={() => isActive && handleSetDate()}>
      <div
        style={{ height: CALENDAR_HOUR_HEIGHT / 2 }}
        className={cn('border-b', isActive && 'group-hover:border-none')}
      />

      <div
        className={cn(
          'hidden',
          isActive &&
            'group-hover:flex w-12 h-12 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full'
        )}>
        <FaPlus className="size-1/2" />
      </div>
    </div>
  );
};
