import { FC } from 'react';
import { FaPlus } from 'react-icons/fa6';

export const CALENDAR_HOUR_HEIGHT = 96;

export const CALENDAR_DAY_HEIGHT = CALENDAR_HOUR_HEIGHT * 24;
export const CALENDAR_MINUTE_HEIGHT = CALENDAR_HOUR_HEIGHT / 60;

interface HourProps {
  hour: number;
  setDate: (timeStart: number, timeEnd: number) => void;
}

export const Hour: FC<HourProps> = ({ setDate, hour }) => {
  const handleSetDate = () => {
    const timeStart = hour;
    const timeEnd = timeStart + 1;

    setDate(timeStart, timeEnd);
  };

  return (
    <div
      className="relative border border-neutral-200 flex flex-col group hover:bg-red-200 hover:cursor-pointer hover:border-dashed hover:border-red-600 hover:rounded-lg"
      style={{ height: CALENDAR_HOUR_HEIGHT }}
      onClick={() => handleSetDate()}>
      <div
        style={{ height: CALENDAR_HOUR_HEIGHT / 2 }}
        className="border-b border-neutral-200 group-hover:border-none"
      />

      <div className="hidden group-hover:flex w-12 h-12 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full">
        <FaPlus />
      </div>
    </div>
  );
};
