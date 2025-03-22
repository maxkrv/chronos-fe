import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CalendarService } from '@/modules/calendar/services/calendar.service';
import { EventService } from '@/modules/calendar/services/event.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { MY_CALENDAR_INVITATIONS, MY_EVENTS_INVITATIONS } from '@/shared/constants/query-keys';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { InvitationList } from '../components/invitation-list';
import { useInvitationData } from '../hooks/use-invitation';

export const InvitationPage = () => {
  const queryClient = useQueryClient();
  const { calendarInvitations, eventInvitations } = useInvitationData();

  const { mutate: acceptCalendarInvitation, isPending: isAcceptPending } = useMutation({
    mutationFn: CalendarService.acceptInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDAR_INVITATIONS]
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
    <ContentLayout>
      <AppHeader>
        <h1 className="text-foreground text-2xl font-medium truncate">Chronos | Invitations</h1>
      </AppHeader>

      <div className="p-4 flex flex-col h-[calc(100vh-4rem)]">
        <Tabs defaultValue="calendar" className="flex flex-col h-full">
          <TabsList>
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
      </div>
    </ContentLayout>
  );
};
