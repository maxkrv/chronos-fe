import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '@/assets/logos/logo';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center justify-center gap-2 font-medium">
            <Logo width="24px" height="24px" />
            Chronos
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <Logo />
      </div>
    </div>
  );
};
