import { Check, ChevronRight } from 'lucide-react';
import { FC, useState } from 'react';
import { IoIosSettings } from 'react-icons/io';

import { Button } from '@/shared/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';
import { SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/components/ui/sidebar';

import { Label } from '../../../shared/components/ui/label';
import { ICalendar } from '../calendar.interface';
import { useCalendarStore } from '../stores/calendar.store';
import { EditCalendarModal } from './modal/edit-calendar-modal';

interface CalendarAccordionProps {
  name: string;
  items: ICalendar[];
  isLoading?: boolean;
}

export const CalendarAccordion: FC<CalendarAccordionProps> = ({ name, items, isLoading }) => {
  const [open, setOpen] = useState(false);
  const [calendar, setCalendar] = useState<ICalendar | null>(null);

  const { calendarsIds, addCalendarId, removeCalendarId } = useCalendarStore();

  const onClose = () => {
    setOpen(false);
    setCalendar(null);
  };

  const handleToggle = (calendar: ICalendar) => {
    if (calendarsIds.includes(calendar.id)) {
      removeCalendarId(calendar.id);
    } else {
      addCalendarId(calendar.id);
    }
  };

  return (
    <Collapsible defaultOpen={true} className="group/collapsible m-2">
      <SidebarGroupLabel
        asChild
        className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <CollapsibleTrigger className="bg-transparent! hover:underline p-0!">
          <span className="w-full text-left text-lg">{name}</span>
          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 text-end" />
        </CollapsibleTrigger>
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarMenu className="max-w-full mt-2">
          <div>
            <div className="flex flex-col gap-1 h-full">
              {!isLoading &&
                items.map((item) => (
                  <SidebarMenuItem key={item.id} className="flex items-center rounded-md hover:bg-accent h-6">
                    <SidebarMenuButton
                      className="bg-transparent h-full"
                      onClick={() => {
                        handleToggle(item);
                      }}>
                      <div
                        data-active={calendarsIds.includes(item.id)}
                        className="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary">
                        <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
                      </div>

                      <Label htmlFor={`calendar-checkbox-${item.id}}`} className="w-full">
                        {item.name}
                      </Label>
                    </SidebarMenuButton>

                    {!item.isMain && (
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setCalendar(item);
                        }}
                        variant="ghost"
                        className="hover:bg-accent-foreground hover:text-background size-6 rounded-4xl transition-colors">
                        <IoIosSettings />
                      </Button>
                    )}
                  </SidebarMenuItem>
                ))}
              {isLoading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <SidebarMenuItem key={index} className="flex items-center rounded-md bg-accent h-6 animate-pulse" />
                ))}
            </div>

            {!isLoading && items.length === 0 && <div className="text-center">No calendars found</div>}
          </div>
        </SidebarMenu>
      </CollapsibleContent>
      <EditCalendarModal calendar={calendar} open={open} setOpen={setOpen} onClose={onClose} />
    </Collapsible>
  );
};
