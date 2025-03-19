import dayjs from 'dayjs';
import { useState } from 'react';

export const TimeNow = () => {
  const [time, setTime] = useState(dayjs().format('HH:mm'));

  setInterval(() => {
    setTime(dayjs().format('HH:mm'));
  }, 1000);
  return (
    <div className="flex items-center justify-center w-full h-full border-2 border-foreground rounded-3xl aspect-square">
      <h1 className="text-foreground text-4xl font-medium text-wrap">{time}</h1>
    </div>
  );
};
