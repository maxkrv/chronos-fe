import { apiClient } from '@/shared/api/api';

import { User } from './user.interface';

export class UserService {
  static async me() {
    return apiClient.get<User>('users/me').json();
  }
}
