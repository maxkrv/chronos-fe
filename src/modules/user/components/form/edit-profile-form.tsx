import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useUserStore } from '@/shared/store/user.store';

import { USER_ME } from '../../../../shared/constants/query-keys';
import { EditProfileDto, EditProfileSchema } from '../../user.interface';
import { UserService } from '../../user.service';

interface EditProfileFormProps {
  className?: string;
}

export const EditProfileForm: FC<EditProfileFormProps> = ({ className }) => {
  const { user, updateUser } = useUserStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm<EditProfileDto>({
    resolver: zodResolver(EditProfileSchema),
    values: {
      name: user?.name || '',
      surname: user?.surname || ''
    },
    mode: 'all'
  });

  const { mutate, isPending } = useMutation({
    mutationFn: UserService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_ME]
      });
      toast.success('Profile updated successfully');
    }
  });

  const onSubmit = (data: EditProfileDto) => {
    mutate(data);
    updateUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input {...register('name')} id="name" errorMessage={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="surname">Surname</Label>
          <Input {...register('surname')} id="surname" errorMessage={errors.surname?.message} />
        </div>

        <Button type="submit" isLoading={isPending} disabled={!isValid || isPending}>
          Save
        </Button>
      </div>
    </form>
  );
};
