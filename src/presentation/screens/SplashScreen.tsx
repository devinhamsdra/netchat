import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';
import { ThemedView, ThemedText } from '@components/index';

export const SplashScreen = () => {
  const theme = useTheme();

  return (
    <ThemedView variant="background" style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="displayLarge" color={theme.colors.primary}>
          NetChat
        </ThemedText>
        <ThemedText
          variant="titleMedium"
          color={theme.colors.onSurfaceVariant}
          style={{ marginTop: spacing.md }}
        >
          Connect. Chat. Share Moments.
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
});
