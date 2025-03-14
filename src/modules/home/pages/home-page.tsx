import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { isLoggedIn } from '@/shared/lib/utils';
import { useAuth } from '@/shared/store/auth.store';
import { useUserStore } from '@/shared/store/user.store';

import { AuthService } from '../../auth/services/auth.service';
import { MonthCalendar } from '../../calendar/components/month-calendar';

export const HomePage = () => {
  const navigate = useNavigate();

  const { deleteTokens, tokens } = useAuth();
  const { setUser } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: AuthService.logout
  });

  const handleLogout = () => {
    if (tokens?.refreshToken) {
      mutate(tokens.refreshToken);
    }
    navigate('/');
    setUser(null);
    deleteTokens();
  };

  return (
    <div>
      {isLoggedIn() && <Button onClick={handleLogout}>logout</Button>}
      <MonthCalendar month={new Date('2025-03-27T00:00:00Z')} />
    </div>
  );
};
