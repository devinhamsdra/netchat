import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView, ThemedText, Button } from '@components/index';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';
import { useRouter } from 'expo-router';

export const ChatsScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText variant="headlineMedium">Chats Screen</ThemedText>
        <ThemedText
          variant="bodyMedium"
          color={theme.colors.onSurfaceVariant}
          style={{ marginTop: spacing.md }}
        >
          This is where all your conversations will appear
        </ThemedText>
        <Button
          label="Explore"
          onPress={() => {}}
          style={{ marginTop: spacing.lg }}
        />
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
