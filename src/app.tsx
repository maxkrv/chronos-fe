import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { UserService } from './modules/user/user.service';
import { BoxBordersSwitch } from './shared/components/dev/box-borders-switch';
import { TailwindIndicator } from './shared/components/dev/tailwindIndicator';
import { USER_ME } from './shared/constants/query-keys';
import { isLoggedIn } from './shared/lib/utils';
import { useUserStore } from './shared/store/user.store';

export const App = () => {
  const { updateUser } = useUserStore();

  const { isSuccess, data } = useQuery({
    queryKey: [USER_ME],
    queryFn: UserService.me,
    enabled: isLoggedIn()
  });

  useEffect(() => {
    if (isSuccess) {
      updateUser(data);
    }
  }, [isSuccess]);

  return (
    <>
      <Outlet />
      <Toaster expand />

      <TailwindIndicator />
      <BoxBordersSwitch />
    </>
  );
};
