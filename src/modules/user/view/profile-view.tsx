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

        <div className="flex flex-col capitalize">
          <span>{user?.name}</span>

          <span>{user?.surname}</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Personal information</h2>
        <EditProfileForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Password</h2>
        <ChangePasswordModal email={user?.email || ''} />
      </div>

      <Button variant="outline" className="mt-auto" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
