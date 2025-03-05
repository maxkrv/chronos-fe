import { apiClient } from '../api/api';
import { CommentDto, CommentResponse, GetCommentsDto, PaginationResponse } from '../types/interfaces';

export class CommentService {
  static async create(dto: CommentDto) {
    return apiClient.post('comment', { json: dto }).json();
  }

  static async getAll(dto: GetCommentsDto) {
    const searchParams = new URLSearchParams();

    Object.entries(dto).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });

    return apiClient.get<PaginationResponse<CommentResponse>>('comment', { searchParams }).json();
  }

  static async update(id: number, dto: { content: string }) {
    return apiClient.patch(`comment/${id}`, { json: dto }).json();
  }

  static async delete(id: number) {
    return apiClient.delete(`comment/${id}`).json();
  }
}
