import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { UserService } from './modules/user/user.service';
import { BoxBordersSwitch } from './shared/components/dev/box-borders-switch';
import { TailwindIndicator } from './shared/components/dev/tailwindIndicator';
import { LoadingOverlay } from './shared/components/loading-overlay';
import { NotActivatedAccount } from './shared/components/not-activated-account';
import { USER_ME } from './shared/constants/query-keys';
import { useAuth } from './shared/store/auth.store';
import { useUserStore } from './shared/store/user.store';

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
      <Toaster expand />

      <TailwindIndicator />
      <BoxBordersSwitch />
    </>
  );
};
