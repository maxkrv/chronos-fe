import { useQuery } from '@tanstack/react-query';

import { MY_CALENDARS } from '@/shared/constants/query-keys';

import { CalendarService } from '../services/calendar.service';

export const useCalendarData = (search: string) => {
  return useQuery({
    queryKey: [MY_CALENDARS, search],
    queryFn: () => CalendarService.my(search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData || []
  });
};
