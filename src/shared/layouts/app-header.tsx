import { FC, PropsWithChildren } from 'react';

export const AppHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="h-14 sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 w-full z-50">
      {children}
    </header>
  );
};
