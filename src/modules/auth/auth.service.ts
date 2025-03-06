import { apiClient } from '@/shared/api/api';
import { EmailDto } from '@/shared/types/interfaces';

import { LoginDto, RegisterDto, ResetPasswordDto, TokenPair } from './auth.interface';

export class AuthService {
  static async login(dto: LoginDto): Promise<TokenPair> {
    return apiClient
      .post<TokenPair>('auth/login', {
        json: dto
      })
      .json();
  }

  static async register(dto: RegisterDto): Promise<TokenPair> {
    return apiClient
      .post<TokenPair>('auth/register', {
        json: dto
      })
      .json();
  }

  static async activate(token: string) {
    return apiClient.post(`auth/activate/${token}`).json();
  }

  static async logout() {
    const refreshToken = localStorage.getItem('refreshToken');

    return await apiClient
      .post('auth/logout', {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      .json();
  }

  static async sendResetPasswordLink(dto: EmailDto) {
    return apiClient
      .post('auth/send-reset-password-link', {
        json: dto
      })
      .json();
  }

  static async resetPassword(dto: ResetPasswordDto) {
    return apiClient
      .post('auth/reset-password', {
        json: dto
      })
      .json();
  }
}
