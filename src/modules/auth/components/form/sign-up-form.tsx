import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/password-input';
import { USER_ME } from '@/shared/constants/query-keys';
import { useAuth } from '@/shared/store/auth.store';

import { RegisterDto, RegisterSchema } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

export const SignUpForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { setTokens } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    mode: 'all'
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      setTokens(data);
      queryClient.invalidateQueries({ queryKey: [USER_ME] });
      navigate('/calendar');
      toast('Account created successfully');
      toast('Please check your email to verify your account');
    }
  });

  const onSubmit = (data: RegisterDto) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign up</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your details below to create your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input {...register('name')} id="name" placeholder="John" errorMessage={errors.name?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="surname">Surname</Label>
          <Input {...register('surname')} id="surname" placeholder="Doe" errorMessage={errors.surname?.message} />
        </div>

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

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>

          <PasswordInput id="password" {...register('password')} errorMessage={errors.password?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="repeatPassword">Repeat password</Label>

          <PasswordInput
            id="repeatPassword"
            {...register('repeatPassword')}
            errorMessage={errors.repeatPassword?.message}
          />
        </div>
        <Button type="submit" className="w-full" isLoading={isPending} disabled={!isValid || isPending}>
          Sign up
        </Button>
      </div>
      <div className="text-center text-sm">
        Have an account?{' '}
        <Link to={'/login'} className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
};
