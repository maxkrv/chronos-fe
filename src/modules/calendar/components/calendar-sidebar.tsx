import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { IoMdSearch } from 'react-icons/io';

import { Calendar } from '@/shared/components/ui/calendar';
import { Input } from '@/shared/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader
} from '@/shared/components/ui/sidebar';

import { CalendarAccordion } from './calendar-accordion';

export const CalendarSidebar = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  return (
    <Sidebar collapsible="offcanvas" className="hidden flex-1 md:flex bg-background max-h-dvh sticky top-0">
      <SidebarHeader className="h-14 sticky top-0 flex shrink-0 justify-center gap-2 border-b bg-background px-4">
        <h1 className="text-foreground text-base font-medium">Chronos</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <Calendar mode="range" className="flex justify-center" selected={date} onSelect={setDate} />
            <div className="p-4">
              <Input icon={<IoMdSearch size={20} />} iconPosition="left" placeholder="Search" />
            </div>

            <CalendarAccordion name="My calendars" items={['a', 'Work', 'Family']} />
            <CalendarAccordion name="Other calendars" items={['Personal', 'Work', 'Family']} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
