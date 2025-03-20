export const config = {
  environment: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  apiUrl: import.meta.env.VITE_API_URL
};
