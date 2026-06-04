import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView, ThemedText, Button, Input, Card } from '@components/index';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';
import { AuthService } from '@services/AuthService';
import { passwordResetSchema, type PasswordResetInput } from '@utils/validation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<PasswordResetInput>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetInput) => {
    setIsLoading(true);
    setMessage(null);

    const result = await AuthService.sendPasswordReset(data);

    if (result.success) {
      setMessage('Password reset email sent! Check your inbox.');
      setEmailSent(true);
    } else {
      setMessage(result.error);
    }

    setIsLoading(false);
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.push('/login')}>
          <ThemedText variant="bodyMedium" color={theme.colors.primary}>
            ← Back to Login
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.header}>
          <ThemedText variant="headlineLarge">Reset Password</ThemedText>
          <ThemedText variant="bodyMedium" color={theme.colors.onSurfaceVariant}>
            Enter your email to receive password reset instructions
          </ThemedText>
        </View>

        <Card style={styles.card}>
          {message && (
            <View
              style={[
                styles.messageBox,
                {
                  backgroundColor: emailSent
                    ? theme.colors.primaryContainer
                    : theme.colors.errorContainer,
                },
              ]}
            >
              <ThemedText color={emailSent ? theme.colors.primary : theme.colors.error}>
                {message}
              </ThemedText>
            </View>
          )}

          {!emailSent ? (
            <>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email address"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email?.message}
                    containerStyle={{ marginBottom: spacing.lg }}
                  />
                )}
              />

              <Button
                label="Send Reset Email"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </>
          ) : (
            <Button
              label="Back to Login"
              onPress={() => router.push('/login')}
            />
          )}
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
    marginVertical: spacing.xl,
  },
  card: {
    marginBottom: spacing.xl,
  },
  messageBox: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
});
