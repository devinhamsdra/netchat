import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView, ThemedText } from '@components/index';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';

export const StatusScreen = () => {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="headlineMedium">Status Screen</ThemedText>
        <ThemedText
          variant="bodyMedium"
          color={theme.colors.onSurfaceVariant}
          style={{ marginTop: spacing.md }}
        >
          View and share your status moments here
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
