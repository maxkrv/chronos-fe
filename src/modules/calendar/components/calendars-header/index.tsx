import { cn } from '../../../../shared/lib/utils';
import { useSearchStore } from '../../stores/search.store';
import { CalendarControls } from './calendar-controls';
import { CalendarDate } from './calendar-date';
import { CalendarSelect } from './calendar-select';

export const CalendarsHeader = () => {
  const { searchActive } = useSearchStore();

  return (
    <div className="flex items-center justify-between w-full gap-2 @container/header">
      <CalendarSelect />
      <div
        className={cn(
          'transition-all duration-400 @max-md/header:hidden text-nowrap',
          !searchActive ? 'w-full' : 'w-0 overflow-hidden text-nowrap '
        )}>
        <CalendarDate />
      </div>
      <CalendarControls />
    </div>
  );
};
