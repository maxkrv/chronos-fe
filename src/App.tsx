import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import { TailwindIndicator } from './shared/components/dev/tailwindIndicator';
import { USER_ME } from './shared/constants/query-keys';
import { UserService } from './shared/services/user.service';

function App() {
  useQuery({
    queryKey: [USER_ME],
    queryFn: UserService.me,
    retry: false
  });

  return (
    <>
      <Outlet />
      <TailwindIndicator />
    </>
  );
}

export default App;
