import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { COLORS_DARK, COLORS_LIGHT } from './colors';

interface Theme {
  dark: boolean;
  colors: typeof COLORS_LIGHT;
}

export const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>({
    dark: colorScheme === 'dark',
    colors: colorScheme === 'dark' ? COLORS_DARK : COLORS_LIGHT,
  });

  useEffect(() => {
    setTheme({
      dark: colorScheme === 'dark',
      colors: colorScheme === 'dark' ? COLORS_DARK : COLORS_LIGHT,
    });
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
