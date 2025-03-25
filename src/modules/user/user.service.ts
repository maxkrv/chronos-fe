import { apiClient } from '@/shared/api/api';

import { EditProfileDto, User } from './user.interface';

export class UserService {
  static async me() {
    return apiClient.get<User>('users/me').json();
  }

  static async updateProfile(dto: EditProfileDto) {
    return apiClient.patch('users/me', {
      json: dto
    });
  }

  static async updateAvatar(dto: FormData) {
    return apiClient
      .patch<{ avatarUrl: string }>('users/avatar', {
        body: dto
      })
      .json();
  }
}
