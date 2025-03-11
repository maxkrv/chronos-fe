import { useLocation } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export const NotActivatedAccount = () => {
  const { pathname } = useLocation();

  if (pathname.includes('activate')) {
    return null;
  }

  return (
    <Alert variant="destructive" className="rounded-none">
      <AlertTitle>Your account is not activated</AlertTitle>
      <AlertDescription>Please check your email to activate your account</AlertDescription>
    </Alert>
  );
};
