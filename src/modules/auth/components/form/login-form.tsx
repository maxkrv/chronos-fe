import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { PasswordInput } from '@/shared/components/ui/password-input';
import { USER_ME } from '@/shared/constants/query-keys';
import { addTokens } from '@/shared/lib/utils';

import { LoginDto, LoginSchema } from '../../auth.interface';
import { AuthService } from '../../auth.service';

export const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { isValid }
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema)
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      addTokens(data);
      queryClient.invalidateQueries({ queryKey: [USER_ME] });
      navigate('/');
      toast('Logged in successfully');
    }
  });

  const onSubmit = (data: LoginDto) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input {...register('email')} type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link to={'/forgot-password'} className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <PasswordInput {...register('password')} />
        </div>
        <Button type="submit" className="w-full" isLoading={isPending} disabled={!isValid || isPending}>
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to={'/sign-up'} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
};
