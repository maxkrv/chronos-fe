import { z } from 'zod';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string | null;
  isActive: boolean;
}

export const EditProfileSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }).max(100, { message: 'Name is too long' }),
  surname: z.string().trim().min(1, { message: 'Username is required' }).max(100, { message: 'Username is too long' })
});
export type EditProfileDto = z.infer<typeof EditProfileSchema>;
