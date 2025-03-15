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

import { useDatePickerStore } from '../stores/date-picker-store';
import { CalendarAccordion } from './calendar-accordion';

export const CalendarSidebar = () => {
  const { selectedDate, setSelectedDate, month, setMonth } = useDatePickerStore();

  return (
    <Sidebar collapsible="icon" className="hidden flex-1 md:flex bg-background max-h-dvh sticky top-0">
      <SidebarHeader className="h-14 sticky top-0 flex shrink-0 justify-center gap-2 border-b bg-background px-4">
        <h1 className="text-foreground text-base font-medium">Chronos</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <Calendar
              mode="range"
              className="flex justify-center min-h-82"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={month}
              onMonthChange={(month) => setMonth(month)}
            />
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
