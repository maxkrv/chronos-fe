import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { isLoggedIn, removeTokens } from '@/shared/lib/utils';
import { useUserStore } from '@/shared/store/user.store';

import { AuthService } from '../auth/auth.service';

export const HomePage = () => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: AuthService.logout
  });

  const handleLogout = () => {
    removeTokens();
    navigate('/');
    setUser(null);
    mutate();
  };

  return <div>{isLoggedIn() && <Button onClick={handleLogout}>logout</Button>}</div>;
};
