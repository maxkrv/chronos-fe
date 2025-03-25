import { useSearchStore } from '../../stores/search.store';
import { CalendarControls } from './calendar-controls';
import { CalendarDate } from './calendar-date';
import { CalendarSelect } from './calendar-select';

export const CalendarsHeader = () => {
  const { searchActive } = useSearchStore();

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <CalendarSelect />
      {!searchActive && <CalendarDate />}
      <CalendarControls />
    </div>
  );
};
