import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/password-input';
import { USER_ME } from '@/shared/constants/query-keys';
import { useAuth } from '@/shared/store/auth.store';

import { RegisterDto, RegisterSchema } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

export const SignUpForm = () => {
  const queryClient = useQueryClient();

  const { setTokens } = useAuth();

  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    getValues
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    mode: 'all'
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      setTokens(data);
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: [USER_ME] });
      toast('Account created successfully');
      toast('Please check your email to verify your account');
    }
  });

  const onSubmit = (data: RegisterDto) => {
    mutate(data);
  };

  return (
    <>
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

      <Dialog open={open} onOpenChange={(isOpen) => isOpen && setOpen(true)}>
        <DialogContent className="sm:max-w-[425px] pointer-events-auto [&>button]:hidden">
          <DialogHeader className="flex flex-col items-center gap-6">
            <DialogTitle>Please activate your account</DialogTitle>
            <DialogDescription>
              We have sent an activation email to <b>{getValues('email') || 'your email'}</b> to activate your account.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
