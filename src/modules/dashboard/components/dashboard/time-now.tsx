import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const TimeNow = () => {
  const [time, setTime] = useState(dayjs().format('HH:mm'));
  const [date, setDate] = useState(dayjs().format('ddd, MMM D'));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      setTime(now.format('HH:mm'));
      setDate(now.format('ddd, MMM D'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2 border-foreground rounded-3xl aspect-square p-2 transition-all hover:bg-primary/5">
      <h1 className="text-foreground text-4xl font-medium">{time}</h1>
      <p className="text-muted-foreground text-sm mt-1">{date}</p>
    </div>
  );
};
