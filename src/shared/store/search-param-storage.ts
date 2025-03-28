import { createJSONStorage, PersistOptions } from 'zustand/middleware';

const getSearchParams = () => {
  return new URLSearchParams(window.location.search);
};

const updateSearchParams = (searchParams: URLSearchParams) => {
  window.history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
};

const getSearchParam = (key: string) => {
  const searchParams = getSearchParams();
  return searchParams.get(key);
};

const updateSearchParam = (key: string, value: string) => {
  const searchParams = getSearchParams();
  searchParams.set(key, value);

  updateSearchParams(searchParams);
};

const removeSearchParam = (key: string) => {
  const searchParams = getSearchParams();
  searchParams.delete(key);

  updateSearchParams(searchParams);
};

export const searchParamsStorage = {
  getItem: (key: string) => getSearchParam(key),
  hasItem: (key: string) => getSearchParam(key) !== null,
  setItem: (key: string, value: string) => updateSearchParam(key, value),
  removeItem: (key: string) => removeSearchParam(key)
};

export const createSearchParamsStorage = <T, U>(key: string): PersistOptions<T, U> => {
  return {
    name: key,
    storage: createJSONStorage(() => searchParamsStorage)
  };
};
