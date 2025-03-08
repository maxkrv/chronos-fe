import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { isLoggedIn } from '../lib/utils';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
