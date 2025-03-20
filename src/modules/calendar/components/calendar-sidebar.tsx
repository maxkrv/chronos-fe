import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader
} from '@/shared/components/ui/sidebar';
import { MY_CALENDARS, PARTICIPATING_CALENDARS } from '@/shared/constants/query-keys';

import { CalendarService } from '../services/calendar.service';
import { useDatePicker } from '../stores/date-picker-store';
import { CalendarAccordion } from './calendar-accordion';
import { CalendarForm } from './form/calendar-form';

export const CalendarSidebar = () => {
  const { store } = useDatePicker();
  const [open, setOpen] = useState(false);

  const { data: myCalendars, isLoading: isMyCalendarsLoading } = useQuery({
    queryKey: [MY_CALENDARS],
    queryFn: CalendarService.my
  });
  const { data: participatingCalendars, isLoading: isParticipatingCalendarsLoading } = useQuery({
    queryKey: [PARTICIPATING_CALENDARS],
    queryFn: CalendarService.participating
  });

  return (
    <>
      <Sidebar collapsible="icon" className="hidden flex-1 md:flex bg-background max-h-dvh sticky top-0">
        <SidebarHeader className="h-14 sticky top-0 flex shrink-0 justify-center gap-2 border-b bg-background px-4">
          <h1 className="text-foreground text-2xl font-medium truncate">Chronos | Calendar</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <Calendar
                mode="range"
                className="flex justify-center min-h-82"
                selected={store.selectedDate}
                onSelect={store.setSelectedDate}
                month={store.month}
                onMonthChange={(month) => {
                  store.setMonth(month), store.setYear(month);
                }}
              />
              <div className="p-4">
                <Input icon={<IoMdSearch size={20} />} iconPosition="left" placeholder="Search" />
              </div>
              <div className="px-4 mb-4">
                <Button className="w-full" onClick={() => setOpen(true)}>
                  <FaPlus /> Add calendar
                </Button>
              </div>

              <CalendarAccordion name="My calendars" items={myCalendars || []} isLoading={isMyCalendarsLoading} />
              <CalendarAccordion
                name="Other calendars"
                items={participatingCalendars || []}
                isLoading={isParticipatingCalendarsLoading}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Add calendar</DialogTitle>

          <CalendarForm action="add" onSubmit={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
