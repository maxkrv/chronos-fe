import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '@/modules/auth/services/auth.service';
import { Button } from '@/shared/components/ui/button';
import { UserAvatar } from '@/shared/components/user-avatar';
import { useAuth } from '@/shared/store/auth.store';
import { useUserStore } from '@/shared/store/user.store';

import { ChangeAvatar } from '../components/change-avatar';
import { ChangePasswordModal } from '../components/change-password-modal';
import { EditProfileForm } from '../components/form/edit-profile-form';
import { LoadHolidays } from '../components/load-holidays';

export const ProfileView = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();
  const { deleteTokens, tokens } = useAuth();

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
    <div className="w-full px-4 pb-4 h-full flex flex-col gap-6 flex-1">
      <div className="flex gap-5 items-center">
        <div className="relative">
          <UserAvatar user={user} className="h-25 w-25" />
          <ChangeAvatar className="absolute bottom-0 right-0" />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            <span className="capitalize truncate">{user?.name}</span>
            <span className="capitalize truncate">{user?.surname}</span>
          </div>
          <span className="text-muted-foreground truncate">{user?.email}</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Personal information</h2>
        <EditProfileForm />
      </div>

      <div className="space-y-4 w-full">
        <h2 className="text-xl font-bold mb-3">Other</h2>
        <div className="grid">
          <ChangePasswordModal email={user?.email || ''} />
        </div>
        <LoadHolidays />
      </div>

      <Button variant="outline" className="mt-auto" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
