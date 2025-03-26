import type { FC } from 'react';

import type { ICalendar } from '@/modules/calendar/calendar.interface';
import { Loading } from '@/shared/components/ui/loading';

import { usePublicCalendarsFiltersStore } from '../stores/public-calendars-filters.store';
import { CalendarCard } from './calendar-card';
import { CalendarEmptyState } from './calendar-empty-state';

interface CalendarGridProps {
  calendars: ICalendar[];
  isLoading: boolean;
}

export const CalendarGrid: FC<CalendarGridProps> = ({ calendars, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }
  const { resetFilters } = usePublicCalendarsFiltersStore();
  if (calendars.length === 0) {
    return <CalendarEmptyState onReset={resetFilters} />;
  }

  return (
    <div className="grid w-full grid-flow-row grid-cols-[repeat(auto-fill,minmax(15rem,_1fr))] grid-rows-[auto] justify-evenly gap-4 p-2 ">
      {calendars.map((calendar) => (
        <CalendarCard key={calendar.id} calendar={calendar} />
      ))}
    </div>
  );
};
