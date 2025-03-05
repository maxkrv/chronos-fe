import { apiClient } from '../api/api';
import { EditUserDto, User } from '../types/interfaces';

export class UserService {
  static async me(): Promise<User> {
    return apiClient.get<User>('user/me').json();
  }

  static async getById(id: number) {
    return apiClient.get<User>(`user/${id}`).json();
  }

  static async updateAvatar(dto: FormData) {
    return apiClient
      .patch('user/avatar', {
        body: dto,
        timeout: false
      })
      .json();
  }

  static async updateProfile(dto: EditUserDto) {
    const json = { ...dto };
    delete json.email;

    return apiClient
      .patch('user', {
        json
      })
      .json();
  }
}
