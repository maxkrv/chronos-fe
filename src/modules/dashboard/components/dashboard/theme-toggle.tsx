import { MoonIcon, SunIcon } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

import { Button } from '../../../../shared/components/ui/button';
import { useTheme } from '../../../../shared/store/theme.store';

export const ThemeToggle = memo(() => {
  const { theme, inverse } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full h-full border-2 border-foreground rounded-3xl aspect-square transition-all hover:bg-primary/5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => inverse()}
        className="rounded-full h-12 w-12 hover:scale-110 transition-transform">
        {theme === 'dark' ? (
          <SunIcon className="h-6 w-6 text-yellow-400" />
        ) : (
          <MoonIcon className="h-6 w-6 text-blue-600" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
