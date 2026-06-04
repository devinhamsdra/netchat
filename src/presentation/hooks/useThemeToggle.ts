import { useState, useCallback } from 'react';
import { useTheme } from '@themes/index';
import { COLORS_LIGHT, COLORS_DARK } from '@themes/colors';

export const useThemeToggle = () => {
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme.dark);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? COLORS_DARK : COLORS_LIGHT,
  };
};
