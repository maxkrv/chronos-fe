import { Check, ChevronRight } from 'lucide-react';
import { FC } from 'react';
import { IoIosSettings } from 'react-icons/io';

import { Button } from '@/shared/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';
import { SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/components/ui/sidebar';

interface CalendarAccordionProps {
  name: string;
  items: string[]; // will be changed to Calendar type in the future
}

export const CalendarAccordion: FC<CalendarAccordionProps> = ({ name, items }) => {
  return (
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
          {items.map((item, index) => (
            <SidebarMenuItem key={item} className="flex items-center rounded-md hover:bg-accent">
              <SidebarMenuButton className="bg-transparent! h-full">
                <div
                  data-active={index < 2}
                  className="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary">
                  <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
                </div>

                <span>{item}</span>
              </SidebarMenuButton>
              <Button variant="ghost" className="hover:bg-accent-foreground hover:text-background w-9">
                <IoIosSettings />
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
};
