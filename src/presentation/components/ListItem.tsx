import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '../themes/useTheme';
import { spacing } from '../themes/spacing';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  onPress,
  style,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: theme.colors.outline,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        },
        style,
      ]}
      onPress={onPress}
    >
      {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
      <View style={styles.content}>
        <ThemedText variant="bodyMedium" weight="medium">
          {title}
        </ThemedText>
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
      {rightElement ? (
        <View style={styles.rightElement}>{rightElement}</View>
      ) : (
        <MaterialIcons
          name="chevron-right"
          size={24}
          color={theme.colors.onSurfaceVariant}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
