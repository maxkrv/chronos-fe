import { Check, ChevronRight } from 'lucide-react';
import { FC, useState } from 'react';
import { IoIosSettings } from 'react-icons/io';

import { Button } from '@/shared/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/components/ui/sidebar';

import { ICalendar } from '../calendar.interface';
import { CalendarForm } from './form/calendar-form';

interface CalendarAccordionProps {
  name: string;
  items: ICalendar[];
  isLoading?: boolean;
}

export const CalendarAccordion: FC<CalendarAccordionProps> = ({ name, items, isLoading }) => {
  const [open, setOpen] = useState(false);
  const [calendar, setCalendar] = useState<ICalendar | null>(null);

  const onClose = () => {
    setOpen(false);
    setCalendar(null);
  };

  return (
    <>
      <Collapsible defaultOpen={true} className="group/collapsible px-2">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <CollapsibleTrigger className="bg-transparent!">
            {name}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu className="max-w-full">
            <ScrollArea className="h-[130px]">
              <div className="flex flex-col gap-2 h-full">
                {!isLoading &&
                  items.map((item, index) => (
                    <SidebarMenuItem key={item.id} className="flex items-center rounded-md bg-accent">
                      <SidebarMenuButton className="bg-transparent! h-full">
                        <div
                          data-active={index < 2}
                          className="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary">
                          <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
                        </div>

                        <span>{item.name}</span>
                      </SidebarMenuButton>

                      {!item.isMain && (
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setCalendar(item);
                          }}
                          variant="ghost"
                          className="hover:bg-accent-foreground hover:text-background w-9">
                          <IoIosSettings />
                        </Button>
                      )}
                    </SidebarMenuItem>
                  ))}
                {isLoading &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <SidebarMenuItem key={index} className="flex items-center rounded-md bg-accent h-9 animate-pulse" />
                  ))}
              </div>

              {!isLoading && items.length === 0 && <div className="text-center">No calendars found</div>}

              <ScrollBar />
            </ScrollArea>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>

        <DialogContent>
          <CalendarForm action="edit" calendar={calendar || undefined} onSubmit={onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
