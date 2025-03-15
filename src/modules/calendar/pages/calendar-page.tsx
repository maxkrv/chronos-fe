import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { events } from '../../../__mock__/events';
import { CalendarSidebar } from '../components/calendar-sidebar';
import { WeekCalendar } from '../components/week-calendar';

export const CalendarPage = () => {
  return (
    <ContentLayout>
      <SidebarProvider>
        <CalendarSidebar />
        <SidebarInset>
          <AppHeader>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </AppHeader>

          <div className="flex flex-col gap-4 p-2 h-[calc(100vh-4rem)]">
            <WeekCalendar events={events} days={7} fromDay={new Date('2025-03-01T00:00:00Z')} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ContentLayout>
  );
};
