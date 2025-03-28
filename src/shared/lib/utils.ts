import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

import { InvitationStatus } from '@/modules/calendar/calendar.interface';

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

export const preventDecimals = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === '.' || e.key === 'Decimal' || e.key === 'Minus' || e.key === '-' || e.key === 'e') {
    e.preventDefault();
  }
};

export const getBadgeVariant = (status: InvitationStatus) => {
  switch (status) {
    case 'PENDING':
      return 'secondary';
    case 'ACCEPTED':
      return 'default';
    case 'DECLINED':
      return 'destructive';
  }
};

export const formatDateDiff = (start: Date | string, end: Date | string) => {
  const diff = dayjs.duration(dayjs(end).diff(dayjs(start)));

  const years = diff.years();
  const months = diff.months();
  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();

  const result = [];
  if (years > 0) result.push(`${years}Y`);
  if (months > 0) result.push(`${months}M`);
  if (days > 0) result.push(`${days}D`);
  if (hours > 0) result.push(`${hours}H`);
  if (minutes > 0) result.push(`${minutes}M`);

  return result.slice(-2).join(' ') || '0M';
};
