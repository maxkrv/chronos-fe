import * as React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { cn } from '@/shared/lib/utils';

import { Button } from './button';
import { Input, InputProps } from './input';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle pr-10', className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute h-9 right-0 top-0 px-3 py-2 hover:bg-transparent z-10 pointer"
        onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? (
          <FaEye className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FaEyeSlash className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>

      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
