export const config = {
  environment: import.meta.env.NODE_ENV,
  isProduction: import.meta.env.NODE_ENV === 'production',
  isDevelopment: import.meta.env.NODE_ENV === 'development',
  isTest: import.meta.env.NODE_ENV === 'test',
  apiUrl: import.meta.env.VITE_API_URL
};
