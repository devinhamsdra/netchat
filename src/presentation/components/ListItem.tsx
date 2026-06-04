import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@themes/index';
import { spacing, borderRadius } from '@themes/spacing';
import { ThemedText } from './ThemedText';

interface ListItemProps extends TouchableOpacityProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

export const ListItem = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  onPress,
  ...props
}: ListItemProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outline,
        },
      ]}
    >
      {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
      <View style={styles.content}>
        <ThemedText variant="titleMedium">{title}</ThemedText>
        {subtitle && (
          <ThemedText
            variant="bodySmall"
            color={theme.colors.onSurfaceVariant}
            style={{ marginTop: spacing.xs }}
          >
            {subtitle}
          </ThemedText>
        )}
      </View>
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  leftElement: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  rightElement: {
    marginLeft: spacing.md,
  },
});
