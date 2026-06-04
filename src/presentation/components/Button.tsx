import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@themes/index';
import { spacing, borderRadius } from '@themes/spacing';

type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  label,
  variant = 'filled',
  size = 'medium',
  isLoading = false,
  disabled = false,
  icon,
  ...props
}: ButtonProps) => {
  const theme = useTheme();

  const sizeStyles = {
    small: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 32,
    },
    medium: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      minHeight: 40,
    },
    large: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      minHeight: 48,
    },
  };

  const variantStyles = {
    filled: {
      backgroundColor: disabled ? theme.colors.outlineVariant : theme.colors.primary,
      borderWidth: 0,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? theme.colors.outlineVariant : theme.colors.outline,
    },
    text: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  };

  const textColor =
    variant === 'filled'
      ? theme.colors.onPrimary
      : variant === 'outlined'
        ? disabled
          ? theme.colors.outlineVariant
          : theme.colors.primary
        : theme.colors.primary;

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        sizeStyles[size],
        variantStyles[variant],
        { opacity: disabled ? 0.5 : 1 },
        props.style,
      ]}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <>{icon}</> }
          <Text
            style={[
              styles.label,
              {
                color: textColor,
                marginLeft: icon ? spacing.sm : 0,
              },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
