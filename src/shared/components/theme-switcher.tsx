import { MoonIcon, SunIcon } from 'lucide-react';

import { Theme, useTheme } from '../store/theme.store';
import { Switch } from './ui/switch';

export const ThemeSwitcher = () => {
  const { setTheme, isDark } = useTheme();

  return (
    <div className="flex items-center">
      <Switch
        aria-label="Toggle dark mode"
        checked={isDark}
        onCheckedChange={(value) => {
          setTheme(value ? Theme.DARK : Theme.LIGHT);
        }}>
        <div className="absolute inset-0 flex items-center justify-center ">
          {isDark ? (
            <MoonIcon className="w-6 h-6 text-blue-500 fill-current" />
          ) : (
            <SunIcon className="w-6 h-6 text-yellow fill-current" />
          )}
        </div>
      </Switch>
    </div>
  );
};
