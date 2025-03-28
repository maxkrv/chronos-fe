import { cn } from '../../../../shared/lib/utils';

const DAY_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MonthCalendarHeader = () => {
  return (
    <div className="flex flex-row justify-evenly gap-2 @max-lg:gap-1">
      {DAY_OF_WEEK.map((day, i) => {
        return (
          <h4
            key={i}
            className={cn(
              'flex flex-row items-center justify-center font-semibold gap-2 text-accent-foreground bg-accent text-xl leading-none grow text-center py-3 rounded-[1.25rem] w-24 @max-lg:text-sm align-center ',
              (i === 5 || i == 6) && 'border-3 border-neutral-900'
            )}>
            <span>{day}</span>
          </h4>
        );
      })}
    </div>
  );
};
