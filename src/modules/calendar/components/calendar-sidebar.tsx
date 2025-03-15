import dayjs from 'dayjs';
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

const MAX_SELECTED_DAYS = 7;

export const CalendarSidebar = () => {
  const [date, setDate] = useState<DateRange | undefined>();

  const onDateSelect = (selectedDate: DateRange | undefined) => {
    if (!selectedDate) {
      setDate(undefined);
      return;
    }

    const { from, to } = selectedDate;

    if (to && dayjs(to).diff(from, 'days') > MAX_SELECTED_DAYS) {
      const newTo = dayjs(to).isAfter(date?.to)
        ? dayjs(to).toDate()
        : dayjs(from).add(MAX_SELECTED_DAYS, 'days').toDate();
      const newFrom = dayjs(newTo).subtract(MAX_SELECTED_DAYS, 'days').toDate();
      setDate({ from: newFrom, to: newTo });
    } else {
      setDate(selectedDate);
    }
  };

  return (
    <Sidebar collapsible="icon" className="hidden flex-1 md:flex bg-background max-h-dvh sticky top-0">
      <SidebarHeader className="h-14 sticky top-0 flex shrink-0 justify-center gap-2 border-b bg-background px-4">
        <h1 className="text-foreground text-base font-medium">Chronos</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <Calendar mode="range" className="flex justify-center" selected={date} onSelect={onDateSelect} />
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
