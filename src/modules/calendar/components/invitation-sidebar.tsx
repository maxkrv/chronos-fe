import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

import { CalendarService } from '@/modules/calendar/services/calendar.service';
import { EventService } from '@/modules/calendar/services/event.service';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';
import { SidebarGroupLabel, SidebarMenu } from '@/shared/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import {
  EVENTS,
  MY_CALENDAR_INVITATIONS,
  MY_EVENTS_INVITATIONS,
  PARTICIPATING_CALENDARS
} from '@/shared/constants/query-keys';

import { useInvitationData } from '../hooks/use-invitation';
import { InvitationList } from './invitation-list';

export const InvitationSidebar = () => {
  const queryClient = useQueryClient();
  const { calendarInvitations, eventInvitations, hasInvitations } = useInvitationData();

  const { mutate: acceptCalendarInvitation, isPending: isAcceptPending } = useMutation({
    mutationFn: CalendarService.acceptInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDAR_INVITATIONS]
      });
      queryClient.invalidateQueries({
        queryKey: [PARTICIPATING_CALENDARS]
      });
    }
  });
  const { mutate: declineCalendarInvitation, isPending: isDeclinePending } = useMutation({
    mutationFn: CalendarService.declineInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDAR_INVITATIONS]
      });
    }
  });

  const { mutate: acceptEventInvitation, isPending: isAcceptEventPending } = useMutation({
    mutationFn: EventService.acceptInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MY_EVENTS_INVITATIONS]
      });
      queryClient.invalidateQueries({
        queryKey: [EVENTS]
      });
    }
  });
  const { mutate: declineEventInvitation, isPending: isDeclineEventPending } = useMutation({
    mutationFn: EventService.declineInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MY_EVENTS_INVITATIONS]
      });
    }
  });

  const isEventPending = isAcceptEventPending || isDeclineEventPending;
  const isCalendarPending = isAcceptPending || isDeclinePending;

  return (
    <Collapsible defaultOpen={true} className="group/collapsible m-2">
      <SidebarGroupLabel
        asChild
        className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <CollapsibleTrigger className="bg-transparent! hover:underline p-0!">
          <div className="flex items-center gap-1">
            <span className="relative text-left text-lg">Invitations</span>
            {hasInvitations && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
          </div>
          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 text-end" />
        </CollapsibleTrigger>
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarMenu className="max-w-full mt-2">
          <Tabs defaultValue="calendar" className="flex flex-col h-full">
            <TabsList className="w-full">
              <TabsTrigger value="calendar">Calendars</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="flex flex-1">
              <InvitationList
                invitations={calendarInvitations?.data || []}
                isLoading={calendarInvitations.isLoading}
                isFetching={calendarInvitations.isFetching}
                accept={acceptCalendarInvitation}
                decline={declineCalendarInvitation}
                isPending={isCalendarPending}
              />
            </TabsContent>
            <TabsContent value="event">
              <InvitationList
                invitations={eventInvitations?.data || []}
                isLoading={eventInvitations.isLoading}
                isFetching={eventInvitations.isFetching}
                accept={acceptEventInvitation}
                decline={declineEventInvitation}
                isPending={isEventPending}
              />
            </TabsContent>
          </Tabs>
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
};
