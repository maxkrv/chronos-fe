import { FC, PropsWithChildren } from 'react';

import { Logo } from '@/assets/logos/logo';

import { NavUser } from '../components/nav-user';
import { Navbar } from '../components/navbar';

export const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center w-14 border-r pb-4">
        <div className="flex items-center justify-center h-14 border-b w-full">
          <Logo width="30px" height="30px" />
        </div>

        <div className="mt-4">
          <Navbar />
        </div>

        <div className="mt-auto">
          <NavUser />
        </div>
      </div>

      {children}
    </div>
  );
};
