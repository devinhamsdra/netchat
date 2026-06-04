import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@themes/index';

interface ThemedViewProps extends ViewProps {
  variant?: 'surface' | 'background' | 'container';
}

export const ThemedView = ({ variant = 'surface', style, ...props }: ThemedViewProps) => {
  const theme = useTheme();

  const backgroundColor =
    variant === 'surface'
      ? theme.colors.surface
      : variant === 'background'
        ? theme.colors.background
        : theme.colors.primaryContainer;

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor,
        },
        style,
      ]}
    />
  );
};
