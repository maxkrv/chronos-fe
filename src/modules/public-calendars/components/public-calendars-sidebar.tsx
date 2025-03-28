import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader
} from '@/shared/components/ui/sidebar';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shared/components/ui/tabs';
import {
  EVENTS,
  MY_CALENDAR_INVITATIONS,
  MY_EVENTS_INVITATIONS,
  PARTICIPATING_CALENDARS
} from '../../../shared/constants/query-keys';
import { InvitationList } from '../../calendar/components/invitation-list';
import { useInvitationData } from '../../calendar/hooks/use-invitation';
import { CalendarService } from '../../calendar/services/calendar.service';
import { EventService } from '../../calendar/services/event.service';

export const PublicCalendarSidebar = () => {
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
    <Sidebar collapsible="icon" className="hidden flex-1 md:flex bg-background max-h-dvh sticky top-0">
      <SidebarHeader className="h-14 sticky top-0 flex shrink-0 justify-center gap-2 border-b bg-background px-4">
        <h1 className="text-foreground text-2xl font-medium truncate">Chronos | Public</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent className="h-full gap-4 flex flex-col min-w-70 px-2">
            <Tabs defaultValue="calendar" className="flex flex-col h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-1 grow">
                  <span className="relative text-center text-lg font-semibold ">Pending Invitations</span>
                  {hasInvitations && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse -mt-2" />}
                </div>
                <TabsList className="w-full">
                  <TabsTrigger value="calendar">Calendars</TabsTrigger>
                  <TabsTrigger value="event">Events</TabsTrigger>
                </TabsList>
              </div>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
