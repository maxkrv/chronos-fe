import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { EVENTS } from '@/shared/constants/query-keys';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { CalendarSidebar } from '../components/calendar-sidebar';
import { CalendarsHeader } from '../components/calendars-header';
import { CalendarView } from '../components/calendars-header/calendar-select';
import { MonthCalendar } from '../components/month-calendar';
import { WeekCalendar } from '../components/week-calendar';
import { YearCalendar } from '../components/year-calendar';
import { useCalendarData } from '../hooks/use-calendar';
import { EventService } from '../services/event.service';
import { useCalendarStore } from '../stores/calendar.store';
import { useDatePicker } from '../stores/date-picker-store';
import { useSearchStore } from '../stores/search.store';

export const CalendarPage = () => {
  const { store, selectedDays } = useDatePicker();
  const { calendarsIds: calendarIdsData } = useCalendarStore();
  const { searchQuery } = useSearchStore();
  const { myCalendars, participatingCalendars } = useCalendarData();

  const generalCalendars = [...(myCalendars.data || []), ...(participatingCalendars.data || [])].map(
    (calendar) => calendar.id
  );
  const selectedCalendarsIds = calendarIdsData.filter((id) => generalCalendars.includes(id));

  const selectedDate =
    store.view === CalendarView.MONTH
      ? {
          from: dayjs(store.month).startOf('month').toDate(),
          to: dayjs(store.month).endOf('month').toDate()
        }
      : store.view === CalendarView.WEEK
        ? {
            from: dayjs(store.selectedDate?.from).subtract(1, 'day').toDate(),
            to: dayjs(store.selectedDate?.to ? store.selectedDate.to : store.selectedDate?.from)
              .add(1, 'day')
              .toDate()
          }
        : undefined;

  const { data: events = [] } = useQuery({
    queryKey: [EVENTS, selectedCalendarsIds, selectedDate, searchQuery],
    queryFn: () =>
      selectedDate ? EventService.findAll(selectedCalendarsIds, selectedDate.from, selectedDate.to, searchQuery) : [],
    select: (events) => events.flat()
  });

  return (
    <ContentLayout>
      <SidebarProvider>
        <CalendarSidebar />
        <SidebarInset>
          <AppHeader>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CalendarsHeader />
          </AppHeader>
          <div className="flex flex-col gap-4 p-2 h-[calc(100vh-4rem)]">
            {store.view === CalendarView.WEEK && (
              <WeekCalendar events={events} fromDay={store.selectedDate?.from} days={selectedDays} />
            )}
            {store.view === CalendarView.MONTH && <MonthCalendar events={events} month={store.month} />}
            {store.view === CalendarView.YEAR && (
              <YearCalendar className="h-full min-w-fit overflow-x-scroll scrollbar-none grow" year={store.year} />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ContentLayout>
  );
};
