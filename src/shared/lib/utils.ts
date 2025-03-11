import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

import { authStore } from '../store/auth.store';
import { ErrorResponse } from '../types/interfaces';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isLoggedIn = () => {
  return authStore.getState().isLoggedIn();
};

export const handleErrorMessage = (error: ErrorResponse) => {
  const messagesToIgnore: string[] = ['Refresh', 'Unauthorized', 'undefined'];

  if (messagesToIgnore.some((message) => error.message.message.toLowerCase().includes(message.toLowerCase()))) return;

  toast(error.message.message, {
    richColors: true
  });
};
