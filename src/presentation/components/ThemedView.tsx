import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from './useTheme';
import { spacing } from './spacing';

interface ThemedViewProps {
  children: React.ReactNode;
  variant?: 'background' | 'surface' | 'surfaceVariant';
  style?: ViewStyle;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  variant = 'surface',
  style,
}) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'background':
        return theme.colors.background;
      case 'surface':
        return theme.colors.surface;
      case 'surfaceVariant':
        return theme.colors.surfaceVariant;
      default:
        return theme.colors.background;
    }
  };

  return (
    <View style={[{ backgroundColor: getBackgroundColor() }, style]}>
      {children}
    </View>
  );
};
