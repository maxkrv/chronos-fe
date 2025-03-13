import { FC, PropsWithChildren } from 'react';

import { Logo } from '@/assets/logos/logo';

import { NavUser } from '../components/nav-user';
import { Navbar } from '../components/navbar';

export const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col items-center w-14 border-r pb-4 sticky top-0" style={{ maxHeight: `100dvh` }}>
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

      <div className="w-full">{children}</div>
    </div>
  );
};
