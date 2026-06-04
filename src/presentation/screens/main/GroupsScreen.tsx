import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView, ThemedText } from '@components/index';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';

export const GroupsScreen = () => {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="headlineMedium">Groups Screen</ThemedText>
        <ThemedText
          variant="bodyMedium"
          color={theme.colors.onSurfaceVariant}
          style={{ marginTop: spacing.md }}
        >
          All your groups will appear here
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
