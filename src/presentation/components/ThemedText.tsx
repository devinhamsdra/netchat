import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../themes/useTheme';
import { typography } from './typography';

type Variant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

interface ThemedTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'bodyMedium',
  color,
  weight = 'regular',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  const textColor = color || theme.colors.onSurface;

  const fontWeight = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  }[weight];

  return (
    <Text
      style={[
        typography[variant],
        { color: textColor, fontWeight },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
