'use client';

import { AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { type FC, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface ErrorFallbackProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-card rounded-3xl shadow-lg border border-border p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-destructive/5 rounded-full animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full animate-pulse-slow animation-delay-1000" />

        <div className="relative z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-destructive/10 rounded-full animate-ping-slow opacity-75" />
              <div className="relative bg-destructive/20 text-destructive p-4 rounded-full animate-bounce-slow">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              We&apos;ve encountered an unexpected error. Our team has been notified.
            </p>

            <div className="flex flex-col items-center justify-center sm:flex-row gap-3 w-full">
              <Button onClick={resetErrorBoundary} className="gap-2 transition-all duration-300 hover:scale-105 group">
                <RefreshCw className="h-4 w-4 animate-spin-slow" />
                Try again
              </Button>

              <Button
                variant="outline"
                onClick={() => (window.location.href = '/')}
                className="gap-2 transition-all duration-300 hover:border-primary">
                Go to homepage
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {isDev && (
            <div className="mt-6">
              <Button
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm w-full justify-between">
                {showDetails ? 'Hide' : 'Show'} error details
                <ArrowRight className={cn('h-4 w-4 transition-transform duration-300', showDetails && 'rotate-90')} />
              </Button>

              {showDetails && (
                <div className="mt-2 p-4 bg-muted/50 rounded-xl border text-sm font-mono overflow-auto max-h-60 animate-in slide-in-from-top duration-300">
                  <p className="text-destructive font-semibold">
                    {error?.name}: {error?.message}
                  </p>
                  <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">{error?.stack}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
