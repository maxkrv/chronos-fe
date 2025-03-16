import * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, errorMessage, ...props }, ref) => {
  return (
    <div>
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        {...props}
      />

      {errorMessage && <div className="mt-1 text-sm text-destructive">{errorMessage}</div>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
