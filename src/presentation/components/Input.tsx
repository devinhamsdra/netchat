import React, { useState } from 'react';
import {
  TextInput,
  View,
  ViewStyle,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '../themes/useTheme';
import { spacing } from '../themes/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  helper,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={containerStyle}>
      {label && (
        <ThemedText
          variant="labelMedium"
          weight="medium"
          style={{ marginBottom: spacing.sm }}
        >
          {label}
        </ThemedText>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? theme.colors.error
              : isFocused
              ? theme.colors.primary
              : theme.colors.outline,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.onSurface,
              flex: 1,
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error && (
        <ThemedText
          variant="labelSmall"
          color={theme.colors.error}
          style={{ marginTop: spacing.xs }}
        >
          {error}
        </ThemedText>
      )}
      {helper && !error && (
        <ThemedText
          variant="labelSmall"
          color={theme.colors.onSurfaceVariant}
          style={{ marginTop: spacing.xs }}
        >
          {helper}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
});
