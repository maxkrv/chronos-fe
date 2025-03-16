import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { events } from '../../../__mock__/events';
import { CalendarSidebar } from '../components/calendar-sidebar';
import { MonthCalendar } from '../components/month-calendar';
import { WeekCalendar } from '../components/week-calendar';
import { YearCalendar } from '../components/year-calendar';
import { useDatePickerStore } from '../stores/date-picker-store';

enum CalendarView {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}

export const CalendarPage = () => {
  const dayPickerStore = useDatePickerStore();

  const selectedDays = useMemo(() => {
    const { from, to } = dayPickerStore.selectedDate || {};
    return from && to ? dayjs(to).diff(from, 'days') + 1 : 1;
  }, [dayPickerStore.selectedDate]);

  const [view, setView] = useState<CalendarView>(dayPickerStore.selectedDate ? CalendarView.WEEK : CalendarView.MONTH);

  useEffect(() => {
    if (selectedDays > 1) {
      setView(CalendarView.WEEK);
    }
  }, [selectedDays]);

  useEffect(() => {
    setView(dayPickerStore.selectedDate ? CalendarView.WEEK : CalendarView.MONTH);
  }, [dayPickerStore.selectedDate]);

  const calendarViews = useMemo(() => {
    return {
      [CalendarView.WEEK]: (
        <WeekCalendar events={events} days={selectedDays} fromDay={dayPickerStore.selectedDate?.from} />
      ),
      [CalendarView.MONTH]: <MonthCalendar events={events} month={dayPickerStore.month} />,
      [CalendarView.YEAR]: <YearCalendar className="h-full min-w-fit overflow-x-scroll scrollbar-none grow" />
    };
  }, [events, selectedDays, dayPickerStore.selectedDate, dayPickerStore.month]);

  return (
    <ContentLayout>
      <SidebarProvider>
        <CalendarSidebar />
        <SidebarInset>
          <AppHeader>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </AppHeader>
          <div className="flex flex-col gap-4 p-2 h-[calc(100vh-4rem)]">{calendarViews[view]}</div>
        </SidebarInset>
      </SidebarProvider>
    </ContentLayout>
  );
};
