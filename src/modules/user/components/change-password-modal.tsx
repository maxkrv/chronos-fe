import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { toast } from 'sonner';

import { AuthService } from '@/modules/auth/services/auth.service';
import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Button } from '@/shared/components/ui/button';

interface ChangePasswordModalProps {
  email: string;
}

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ email }) => {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.sendResetPasswordLink,
    onSuccess: () => {
      toast('Password reset link sent successfully');
      setOpen(false);
    }
  });

  const onConfirm = () => {
    mutate({
      email
    });
  };

  return (
    <>
      <Button className="grow" onClick={() => setOpen(true)}>
        Change Password
      </Button>

      <ConfirmModal
        description="Are you sure you want to change your password? We will send you an email with a link to reset your password"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        isLoading={isPending}
      />
    </>
  );
};
