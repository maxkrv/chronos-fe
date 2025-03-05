import { apiClient } from '../api/api';
import { CreatePostDto, GetPostsDto, PaginationResponse, PostResponse, UpdatePostDto } from '../types/interfaces';

export class PostService {
  static async create(dto: CreatePostDto) {
    return apiClient.post<{ data: { id: number } }>('post', { json: dto }).json();
  }

  static async getAll(dto?: GetPostsDto) {
    const searchParams = new URLSearchParams();

    if (dto) {
      Object.entries(dto).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value);
        }
      });
    }

    return apiClient.get<PaginationResponse<PostResponse>>('post', { searchParams }).json();
  }

  static async getById(id: number) {
    return apiClient.get<PostResponse>(`post/${id}`).json();
  }

  static async getForEdit(id: number) {
    return apiClient.get<PostResponse>(`post/edit/${id}`).json();
  }

  static async getMe(dto: GetPostsDto) {
    const searchParams = new URLSearchParams();

    if (dto) {
      Object.entries(dto).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value);
        }
      });
    }

    return apiClient.get<PaginationResponse<PostResponse>>('post/me', { searchParams }).json();
  }

  static async getFavorites(dto: GetPostsDto) {
    const searchParams = new URLSearchParams();

    if (dto) {
      Object.entries(dto).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value);
        }
      });
    }

    return apiClient.get<PaginationResponse<PostResponse>>('post/favorites', { searchParams }).json();
  }

  static async update(id: number, dto: UpdatePostDto) {
    return apiClient.patch(`post/${id}`, { json: dto }).json();
  }

  static async delete(id: number) {
    return apiClient.delete(`post/${id}`).json();
  }

  static async setFavorite(postId: number) {
    return apiClient.post(`post/favorites/${postId}`).json();
  }

  static async deleteFavorite(postId: number) {
    return apiClient.delete(`post/favorites/${postId}`).json();
  }
}
