import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@/assets/logos/logo';

import { NavUser } from '../components/nav-user';
import { Navbar } from '../components/navbar';

export const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  const nav = useNavigate();
  return (
    <div className="flex flex-1">
      <div className="flex flex-col items-center w-full shrink-0 max-w-12  border-r pb-4 sticky top-0 max-h-dvh">
        <button className="flex items-center justify-center h-14 border-b w-full" onClick={() => nav('/')}>
          <Logo className="size-8 transition-transform hover:scale-120" />
        </button>

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
