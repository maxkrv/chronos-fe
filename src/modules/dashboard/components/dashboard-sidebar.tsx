import { useNavigate } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader
} from '@/shared/components/ui/sidebar';

import { useDatePicker } from '../../calendar/stores/date-picker-store';
import { UpcomingEvents } from './upcoming-events';

export const DashboardSidebar = () => {
  const { store } = useDatePicker();
  const nav = useNavigate();
  return (
    <Sidebar collapsible="icon" className="hidden flex-1 md:flex bg-background max-h-dvh sticky top-0">
      <SidebarHeader className="h-14 sticky top-0 flex shrink-0 justify-center gap-2 border-b bg-background px-4">
        <h1 className="text-foreground text-2xl font-medium truncate">Chronos | Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent className="h-full gap-4 flex flex-col min-w-70">
            <h2 className="text-lg font-semibold px-4 py-2 text-center truncate">Upcoming Events Today</h2>
            <button
              className="cursor-pointer"
              onClick={() => {
                store.setSelectedDate({ from: new Date() });
                nav('/calendar');
              }}>
              <UpcomingEvents />
            </button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
