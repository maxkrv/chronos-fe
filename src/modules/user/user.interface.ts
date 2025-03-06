export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string | null;
  isActive: boolean;
}
