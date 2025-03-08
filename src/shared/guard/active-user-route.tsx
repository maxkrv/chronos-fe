import { FC, PropsWithChildren } from 'react';

export const ActiveUserRoute: FC<PropsWithChildren> = ({ children }) => {
  // if (!user?.isActive && !isLoading) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};
