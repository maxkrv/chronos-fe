import { apiClient } from '../api/api';
import { ReactionDto } from '../types/interfaces';

export class ReactionService {
  static async createPostReaction(postId: number, dto: ReactionDto) {
    return apiClient
      .post(`reaction/post/${postId}`, {
        json: dto
      })
      .json();
  }

  static async deletePostReaction(postId: number, dto: ReactionDto) {
    return apiClient
      .delete(`reaction/post/${postId}`, {
        json: dto
      })
      .json();
  }

  static async createCommentReaction(commentId: number, dto: ReactionDto) {
    return apiClient
      .post(`reaction/comment/${commentId}`, {
        json: dto
      })
      .json();
  }

  static async deleteCommentReaction(commentId: number, dto: ReactionDto) {
    return apiClient
      .delete(`reaction/comment/${commentId}`, {
        json: dto
      })
      .json();
  }
}
