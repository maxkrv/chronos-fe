import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'sonner';

import { config } from './config/config';
import { CalendarService } from './modules/calendar/services/calendar.service';
import { UserService } from './modules/user/user.service';
import { BoxBordersSwitch } from './shared/components/dev/box-borders-switch';
import { TailwindIndicator } from './shared/components/dev/tailwindIndicator';
import { ErrorBoundary } from './shared/components/error-boundary/error-bounday';
import { LoadingOverlay } from './shared/components/loading-overlay';
import { NotActivatedAccount } from './shared/components/not-activated-account';
import { Toaster } from './shared/components/ui/sonner';
import { COUNTRY_CODE, MY_CALENDARS, USER_ME } from './shared/constants/query-keys';
import { useAuth } from './shared/store/auth.store';
import { useTheme } from './shared/store/theme.store';
import { useUserStore } from './shared/store/user.store';
import { getMyCountryCode } from './shared/utils/country-code';

const { isDevelopment } = config;
const HOLIDAYS_LOAD_YEARS_RANGE = 5;

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
    mutationFn: async () =>
      countryCode &&
      CalendarService.loadHolidaysForRange(
        countryCode,
        dayjs().subtract(HOLIDAYS_LOAD_YEARS_RANGE, 'year').toDate(),
        dayjs().add(HOLIDAYS_LOAD_YEARS_RANGE, 'year').toDate()
      ),
    onSuccess: () => {
      toast.success('Holidays loaded successfully');
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDARS]
      });
    }
  });

  useTheme();

  useEffect(() => {
    if (myCalendars.isSuccess && isCountryCodeReady && countryCode && data) {
      const hasHolidaysCalendar = myCalendars.data.some((calendar) => calendar.name === `${countryCode} Holidays`);
      if (!hasHolidaysCalendar) {
        toast.info('You do not have a calendar with holidays. Creating one for you.');
        mutate();
      }
    }
  }, [myCalendars.isSuccess, isCountryCodeReady, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [isSuccess]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};
