import { useLocation } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const ignoreRoutes = ['/login', '/sign-up', '/activate', '/reset-password', '/auth', '/forgot-password'];

export const NotActivatedAccount = () => {
  const { pathname } = useLocation();

  if (ignoreRoutes.some((route) => pathname.startsWith(route)) || pathname === '/') {
    return null;
  }

  return (
    <Alert variant="destructive" className="rounded-none">
      <AlertTitle>Your account is not activated</AlertTitle>
      <AlertDescription>Please check your email to activate your account</AlertDescription>
    </Alert>
  );
};
