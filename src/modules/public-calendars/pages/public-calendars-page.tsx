import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { CalendarService } from '@/modules/calendar/services/calendar.service';
import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { CalendarGrid } from '../components/calendar-grid';
import { Filters } from '../components/filters';
import { Pagination } from '../components/pagination';
import { PublicCalendarSidebar } from '../components/public-calendars-sidebar';
import { usePublicCalendarsFiltersStore } from '../stores/public-calendars-filters.store';

export const PublicCalendarsPage = () => {
  const { limit, page, name, sortBy, sortOrder } = usePublicCalendarsFiltersStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['public-calendars', page, limit, name, sortBy, sortOrder],
    queryFn: () => CalendarService.getPublicCalendars({ page, limit, name, sortBy, sortOrder })
  });

  useEffect(() => {
    refetch();
  }, [name, sortBy, sortOrder, limit, refetch]);

  return (
    <ContentLayout>
      <SidebarProvider>
        <PublicCalendarSidebar />
        <SidebarInset>
          <AppHeader>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Filters />
          </AppHeader>
          <div className="flex flex-col gap-6 p-4 min-h-[calc(100vh-4rem)]">
            <div className="grow overflow-hidden">
              <CalendarGrid calendars={data?.items || []} isLoading={isLoading} />
            </div>
            <Pagination paginationData={data?.meta} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ContentLayout>
  );
};
