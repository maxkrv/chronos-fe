import { useQuery } from '@tanstack/react-query';

import { MY_CALENDARS, PARTICIPATING_CALENDARS } from '@/shared/constants/query-keys';

import { CalendarRoleSelect } from '../calendar.interface';
import { CalendarService } from '../services/calendar.service';

export const useCalendarData = (search?: string) => {
  const myCalendars = useQuery({
    queryKey: [MY_CALENDARS, search],
    queryFn: () => CalendarService.my(search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData || []
  });
  const participatingCalendars = useQuery({
    queryKey: [PARTICIPATING_CALENDARS, search],
    queryFn: () => CalendarService.participating(search),
    placeholderData: (prevData) => prevData || []
  });

  const calendarSelectValues = [
    ...(myCalendars.data || []),
    ...(participatingCalendars.data || []).filter((calendar) => calendar?.users?.[0].role === CalendarRoleSelect.ADMIN)
  ];

  return {
    myCalendars,
    participatingCalendars,
    calendarSelect: calendarSelectValues
  };
};
