import { type ClassValue, clsx } from 'clsx';
import { HTTPError } from 'ky';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

import { TokenPair } from '@/modules/auth/auth.interface';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const addTokens = (data: TokenPair) => {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const isLoggedIn = () => {
  return !!getAccessToken() && !!getRefreshToken();
};

export const handleErrorMessage = (error: HTTPError) => {
  const messagesToIgnore: string[] = ['Refresh', 'Unauthorized', 'undefined'];

  if (messagesToIgnore.some((message) => error.message.toLowerCase().includes(message.toLowerCase()))) return;

  toast(error.message, {
    richColors: true
  });
};
