import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';
import { getAccessToken } from '../utils/utils';

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const token = getAccessToken();
  const { user, isLoading } = useAppSelector((state) => state.user);

  if (isLoading) {
    return null;
  }

  if ((!token || !user) && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
