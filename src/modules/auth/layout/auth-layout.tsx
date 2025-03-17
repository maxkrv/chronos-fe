import { ArrowDownCircle, Calendar, Clock } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '@/assets/logos/logo';

const TimeAnimation: FC = () => {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      {/* Outer rotating circle */}
      <div className="absolute h-64 w-64 animate-[spin_20s_linear_infinite] rounded-full border-4 border-dashed border-primary/30" />

      {/* Middle rotating circle */}
      <div className="absolute h-48 w-48 animate-[spin_15s_linear_infinite_reverse] rounded-full border-4 border-dashed border-primary/50" />

      {/* Inner circle with clock */}
      <div className="absolute flex h-32 w-32 animate-pulse items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
        <Clock className="h-16 w-16 text-primary" strokeWidth={1.5} />
      </div>

      {/* Orbiting elements */}
      <div className="absolute h-64 w-64 animate-[spin_10s_linear_infinite]">
        <Calendar className="absolute -top-4 left-1/2 h-8 w-8 -translate-x-1/2 text-primary/80" />
      </div>

      <div className="absolute h-64 w-64 animate-[spin_15s_linear_infinite]">
        <ArrowDownCircle className="absolute left-1/2 top-[calc(100%-2rem)] h-8 w-8 -translate-x-1/2 text-primary/80" />
      </div>

      {/* Text label */}
      <div className="absolute -bottom-12 text-center font-medium text-primary/80">
        <p className="text-xl">Chronos</p>
        <p className="text-sm text-primary/60">Time Management System</p>
      </div>
    </div>
  );
};

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
        {/* <Logo /> */}
        <TimeAnimation />
      </div>
    </div>
  );
};
