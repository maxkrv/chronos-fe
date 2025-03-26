import 'react';

import { z } from 'zod';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  items: Array<T>;
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
  };
}

export interface ErrorResponse {
  message: {
    message: string;
    error: string;
    statusCode: number;
  };
  path: string;
  timestamp: string;
  status: number;
}

export const EmailSchema = z.object({
  email: z.string().email().trim().min(1, { message: 'Email is required' })
});
export type EmailDto = z.infer<typeof EmailSchema>;

export interface Color {
  value: string;
}
