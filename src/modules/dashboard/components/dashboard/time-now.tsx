import dayjs from 'dayjs';

export const TimeNow = () => {
  return (
    <div className="flex items-center justify-center w-full h-full border-2 border-foreground rounded-3xl aspect-square">
      <h1 className="text-foreground text-4xl font-medium text-wrap">{dayjs().format('HH:mm')}</h1>
    </div>
  );
};
