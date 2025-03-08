import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  inverse: () => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => ({
      theme: Theme.LIGHT,
      setTheme: (theme) => set({ theme }),
      inverse: () => {
        const newTheme = get().theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        set({ theme: newTheme });
      }
    }),
    { name: 'theme', storage: createJSONStorage(() => localStorage) }
  )
);

export const useTheme = () => {
  const { theme, setTheme, inverse } = useThemeStore((state) => state);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.remove(Theme.LIGHT, Theme.DARK);
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').onchange = (event) => {
      const newColorScheme = event.matches ? Theme.DARK : Theme.LIGHT;
      setTheme(newColorScheme);
    };
  }, [setTheme]);

  return {
    theme,
    setTheme,
    inverse,
    isDark: theme === Theme.DARK,
    isLight: theme === Theme.LIGHT
  };
};
