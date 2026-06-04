import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView, ThemedText, Button, Card } from '@components/index';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';
import { AuthService } from '@services/AuthService';

export const VerifyEmailScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    const result = await AuthService.sendEmailVerification();

    if (result.success) {
      setMessage('Verification email sent!');
      setResendCooldown(60);
    } else {
      setMessage(result.error);
    }

    setIsLoading(false);
  };

  const handleContinue = () => {
    const user = AuthService.getCurrentUser();
    if (user?.emailVerified) {
      router.replace('/(tabs)/chats');
    } else {
      setMessage('Please verify your email first');
    }
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText variant="headlineLarge" style={{ marginBottom: spacing.md }}>
            Verify Your Email
          </ThemedText>
          <ThemedText variant="bodyMedium" color={theme.colors.onSurfaceVariant}>
            We've sent a verification link to your email address
          </ThemedText>
        </View>

        <Card style={styles.card}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <ThemedText variant="displaySmall" color={theme.colors.primary}>
              ✉️
            </ThemedText>
          </View>

          <ThemedText
            variant="bodyMedium"
            color={theme.colors.onSurfaceVariant}
            style={{ textAlign: 'center', marginVertical: spacing.lg }}
          >
            Click the link in your email to verify your account. Once verified, you can start
            chatting!
          </ThemedText>

          {message && (
            <View
              style={[
                styles.messageBox,
                {
                  backgroundColor: message.includes('sent')
                    ? theme.colors.primaryContainer
                    : theme.colors.errorContainer,
                },
              ]}
            >
              <ThemedText
                color={
                  message.includes('sent') ? theme.colors.primary : theme.colors.error
                }
              >
                {message}
              </ThemedText>
            </View>
          )}

          <Button
            label={resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}
            variant="outlined"
            onPress={handleResendEmail}
            disabled={resendCooldown > 0 || isLoading}
            isLoading={isLoading}
            style={{ marginBottom: spacing.md }}
          />

          <Button
            label="Continue"
            onPress={handleContinue}
            disabled={isLoading}
          />
        </Card>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xl,
  },
  card: {
    alignItems: 'center',
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  messageBox: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    width: '100%',
  },
});
