import { apiClient } from '../api/api';
import { Category } from '../types/interfaces';

export class CategoryService {
  static async get() {
    return apiClient.get<Category[]>('category').json();
  }
}
