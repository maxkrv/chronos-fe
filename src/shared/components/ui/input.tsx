import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  wrapperClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, iconPosition, icon, wrapperClassName, ...props }, ref) => {
    return (
      <div className={wrapperClassName}>
        <div className="relative">
          <input
            type={type}
            data-slot="input"
            className={cn(
              'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              className,
              {
                'pl-9': iconPosition === 'left',
                'pr-8': iconPosition === 'right'
              }
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <div
              className={cn('absolute top-1/2 -translate-y-1/2', {
                'left-3': iconPosition === 'left',
                'right-2': iconPosition === 'right'
              })}>
              {icon}
            </div>
          )}
        </div>
        {errorMessage && <div className="mt-1 text-sm text-destructive">{errorMessage}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
