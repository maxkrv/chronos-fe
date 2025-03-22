import { useQuery } from '@tanstack/react-query';

import { CalendarService } from '@/modules/calendar/services/calendar.service';
import { EventService } from '@/modules/calendar/services/event.service';
import { MY_CALENDAR_INVITATIONS, MY_EVENTS_INVITATIONS } from '@/shared/constants/query-keys';

export const useInvitationData = () => {
  const calendarInvitations = useQuery({
    queryKey: [MY_CALENDAR_INVITATIONS],
    queryFn: CalendarService.getMyInvitations
  });

  const eventInvitations = useQuery({
    queryKey: [MY_EVENTS_INVITATIONS],
    queryFn: EventService.getMyInvitations
  });

  const hasInvitations = calendarInvitations.data?.length || 0 > 0 || eventInvitations.data?.length || 0 > 0;

  return { calendarInvitations, eventInvitations, hasInvitations };
};
