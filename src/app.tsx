import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { config } from './config/config';
import { UserService } from './modules/user/user.service';
import { BoxBordersSwitch } from './shared/components/dev/box-borders-switch';
import { TailwindIndicator } from './shared/components/dev/tailwindIndicator';
import { LoadingOverlay } from './shared/components/loading-overlay';
import { NotActivatedAccount } from './shared/components/not-activated-account';
import { Toaster } from './shared/components/ui/sonner';
import { USER_ME } from './shared/constants/query-keys';
import { useAuth } from './shared/store/auth.store';
import { useUserStore } from './shared/store/user.store';

const { isDevelopment } = config;

export const App = () => {
  const { user, setUser } = useUserStore();
  const { isLoggedIn } = useAuth();
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [USER_ME],
    queryFn: UserService.me,
    enabled: isLoggedIn()
  });

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
