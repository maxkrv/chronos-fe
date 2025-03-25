import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'sonner';

import { config } from './config/config';
import { CalendarService } from './modules/calendar/services/calendar.service';
import { UserService } from './modules/user/user.service';
import { BoxBordersSwitch } from './shared/components/dev/box-borders-switch';
import { TailwindIndicator } from './shared/components/dev/tailwindIndicator';
import { LoadingOverlay } from './shared/components/loading-overlay';
import { NotActivatedAccount } from './shared/components/not-activated-account';
import { Toaster } from './shared/components/ui/sonner';
import { COUNTRY_CODE, MY_CALENDARS, USER_ME } from './shared/constants/query-keys';
import { useAuth } from './shared/store/auth.store';
import { useUserStore } from './shared/store/user.store';
import { getMyCountryCode } from './shared/utils/country-code';

const { isDevelopment } = config;

export const App = () => {
  const { user, setUser } = useUserStore();
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [USER_ME],
    queryFn: UserService.me,
    enabled: isLoggedIn()
  });

  const myCalendars = useQuery({
    queryKey: [MY_CALENDARS],
    queryFn: () => CalendarService.my(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData || []
  });

  const { data: countryCode, isSuccess: isCountryCodeReady } = useQuery({
    queryKey: [COUNTRY_CODE],
    refetchInterval: false,
    retry: 1,
    queryFn: getMyCountryCode
  });

  const { mutate } = useMutation({
    mutationFn: async () => countryCode && CalendarService.loadHolidays(countryCode, new Date().getFullYear()),
    onSuccess: () => {
      toast.success('Holidays loaded successfully');
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDARS]
      });
    }
  });

  useEffect(() => {
    if (myCalendars.isSuccess && isCountryCodeReady && countryCode && isLoggedIn()) {
      const hasHolidaysCalendar = myCalendars.data.some((calendar) => calendar.name === `${countryCode} Holidays`);
      if (!hasHolidaysCalendar) {
        toast.info('You do not have a calendar with holidays. Creating one for you.');
        mutate();
      }
    }
  }, [myCalendars.isSuccess, isCountryCodeReady]);

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [isSuccess]);

  return (
    <>
      {user && !user?.isActive && <NotActivatedAccount />}
      {isLoading ? <LoadingOverlay /> : <Outlet />}
      <Toaster />

      {isDevelopment && (
        <>
          <BoxBordersSwitch />
          <TailwindIndicator />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </>
  );
};
