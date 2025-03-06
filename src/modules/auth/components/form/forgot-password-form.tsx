import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { EmailDto, EmailSchema } from '@/shared/types/interfaces';

import { AuthService } from '../../auth.service';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm<EmailDto>({
    resolver: zodResolver(EmailSchema)
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.sendResetPasswordLink,
    onSuccess: () => {
      navigate('/login');
      toast('Password reset link sent successfully');
    }
  });

  const onSubmit = (data: EmailDto) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below and we will send you a link to reset your password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="m@example.com"
            errorMessage={errors.email?.message}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={isPending} disabled={!isValid || isPending}>
          Send
        </Button>
      </div>
      <div className="text-center text-sm">
        <Link to={'/login'} className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
};
