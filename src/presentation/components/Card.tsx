import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { useTheme } from '@themes/index';
import { spacing, borderRadius } from '@themes/spacing';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const Card = ({ children, style, ...props }: CardProps) => {
  const theme = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          ...theme.elevation.level1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
});
