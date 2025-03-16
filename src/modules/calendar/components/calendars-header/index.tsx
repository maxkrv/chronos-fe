import { CalendarControls } from './calendar-controls';
import { CalendarDate } from './calendar-date';
import { CalendarSelect } from './calendar-select';

export const CalendarsHeader = () => {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <CalendarSelect />
      <CalendarDate />
      <CalendarControls />
    </div>
  );
};
