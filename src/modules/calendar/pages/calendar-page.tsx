import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { CalendarSidebar } from '../components/calendar-sidebar';
import { WeekCalendar } from '../components/week-calendar';

export const CalendarPage = () => {
  return (
    <ContentLayout>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '300px'
          } as React.CSSProperties
        }>
        <CalendarSidebar />
        <SidebarInset>
          <AppHeader>
            <SidebarTrigger className="-ml-1 md:hidden" />
            <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          </AppHeader>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <WeekCalendar />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ContentLayout>
  );
};
