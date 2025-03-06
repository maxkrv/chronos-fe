import { z } from 'zod';

export const passwordValidation = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*()]/, 'Password must contain at least one special character');

export const LoginSchema = z.object({
  email: z.string().email('Email is invalid').trim().min(1, { message: 'Login is required' }),
  password: z.string().trim().min(1, { message: 'Password is required' })
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Name is required' }),
    surname: z.string().trim().min(1, { message: 'Username is required' }),
    email: z.string().email().trim().min(1, { message: 'Email is required' }),
    password: passwordValidation,
    repeatPassword: z.string().trim().min(1, { message: 'Confirm password is required' })
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
  });
export type RegisterDto = z.infer<typeof RegisterSchema>;

export interface ResetPasswordDto {
  password: string;
  token: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
