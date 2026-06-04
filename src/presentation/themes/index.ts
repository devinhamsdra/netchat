import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { elevation } from './elevation';
import { spacing, borderRadius } from './spacing';

export type Theme = ReturnType<typeof createTheme>;

export const createTheme = (isDark: boolean) => ({
  isDark,
  colors: isDark ? darkColors : lightColors,
  typography,
  elevation,
  spacing,
  borderRadius,
});

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return createTheme(isDark);
};

export { lightColors, darkColors } from './colors';
export { typography } from './typography';
export { elevation } from './elevation';
export { spacing, borderRadius } from './spacing';
