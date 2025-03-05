import { useQuery } from '@tanstack/react-query';

import { CATEGORIES } from '../constants/query-keys';
import { CategoryService } from '../services/category.service';
import { Category } from '../types/interfaces';

export const useCategories = (): { categories: Category[]; isLoading: boolean } => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [CATEGORIES],
    queryFn: CategoryService.get,
    staleTime: 1000 * 60 * 60
  });

  return {
    categories: data || [],
    isLoading: isLoading || isFetching
  };
};
