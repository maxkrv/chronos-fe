import { useQuery } from '@tanstack/react-query';

import { MY_CALENDARS } from '@/shared/constants/query-keys';

import { CalendarService } from '../services/calendar.service';

export const useCalendarData = () => {
  return useQuery({
    queryKey: [MY_CALENDARS],
    queryFn: CalendarService.my,
    staleTime: 1000 * 60 * 5
  });
};
