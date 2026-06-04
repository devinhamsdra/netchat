import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  Text,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@themes/index';
import { spacing, borderRadius } from '@themes/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  helper?: string;
}

export const Input = ({
  label,
  error,
  containerStyle,
  helper,
  ...props
}: InputProps) => {
  const theme = useTheme();

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: theme.colors.onSurface,
            marginBottom: spacing.sm,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        style={[
          styles.input,
          {
            borderColor: error ? theme.colors.error : theme.colors.outline,
            backgroundColor: theme.colors.surface,
            color: theme.colors.onSurface,
          },
          props.style,
        ]}
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
      {error && (
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.error,
            marginTop: spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
      {helper && !error && (
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.onSurfaceVariant,
            marginTop: spacing.xs,
          }}
        >
          {helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    fontSize: 14,
  },
});
