import { ReactNode } from 'react';

import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { events } from '../../../__mock__/events';
import { CalendarSidebar } from '../components/calendar-sidebar';
import { CalendarsHeader } from '../components/calendars-header';
import { CalendarView } from '../components/calendars-header/calendar-select';
import { MonthCalendar } from '../components/month-calendar';
import { WeekCalendar } from '../components/week-calendar';
import { YearCalendar } from '../components/year-calendar';
import { useDatePicker } from '../stores/date-picker-store';

export const CalendarPage = () => {
  const { store, selectedDays } = useDatePicker();

  const calendarViews: Record<CalendarView, ReactNode> = {
    [CalendarView.WEEK]: <WeekCalendar events={events} days={selectedDays} fromDay={store.selectedDate?.from} />,
    [CalendarView.MONTH]: <MonthCalendar events={events} month={store.month} />,
    [CalendarView.YEAR]: <YearCalendar className="h-full min-w-fit overflow-x-scroll scrollbar-none grow" />
  };

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
          <div className="flex flex-col gap-4 p-2 h-[calc(100vh-4rem)]">{calendarViews[store.view]}</div>
        </SidebarInset>
      </SidebarProvider>
    </ContentLayout>
  );
};
