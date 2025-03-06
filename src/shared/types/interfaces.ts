import { z } from 'zod';

export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    total: number;
  };
}

export const EmailSchema = z.object({
  email: z.string().email().trim().min(1, { message: 'Email is required' })
});
export type EmailDto = z.infer<typeof EmailSchema>;
