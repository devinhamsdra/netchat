import { Text, StyleSheet, TextProps } from 'react-native';
import { useTheme } from '@themes/index';
import { typography } from '@themes/typography';

type TypographyVariant = keyof typeof typography;

interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export const ThemedText = ({
  variant = 'bodyMedium',
  color,
  style,
  ...props
}: ThemedTextProps) => {
  const theme = useTheme();
  const typographyStyle = typography[variant];
  const textColor = color || theme.colors.onSurface;

  return (
    <Text
      {...props}
      style={[
        {
          fontSize: typographyStyle.fontSize,
          lineHeight: typographyStyle.lineHeight,
          fontWeight: typographyStyle.fontWeight,
          letterSpacing: typographyStyle.letterSpacing,
          color: textColor,
        },
        style,
      ]}
    />
  );
};
