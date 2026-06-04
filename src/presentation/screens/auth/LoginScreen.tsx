import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView, ThemedText, Button, Input, Card } from '@components/index';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';
import { AuthService } from '@services/AuthService';
import { loginSchema, type LoginInput } from '@utils/validation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    const result = await AuthService.login(data);

    if (result.success) {
      router.replace('/(tabs)/chats');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <ThemedView variant="background" style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText variant="displaySmall" color={theme.colors.primary}>
            NetChat
          </ThemedText>
          <ThemedText variant="bodyMedium" color={theme.colors.onSurfaceVariant}>
            Connect. Chat. Share Moments.
          </ThemedText>
        </View>

        <Card style={styles.card}>
          <ThemedText variant="headlineSmall" style={{ marginBottom: spacing.lg }}>
            Welcome Back
          </ThemedText>

          {error && (
            <View
              style={[
                styles.errorBox,
                { backgroundColor: theme.colors.errorContainer },
              ]}
            >
              <ThemedText color={theme.colors.error}>{error}</ThemedText>
            </View>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
                containerStyle={{ marginBottom: spacing.lg }}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.password?.message}
                containerStyle={{ marginBottom: spacing.lg }}
              />
            )}
          />

          <Button
            label="Sign In"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={isLoading}
            style={{ marginBottom: spacing.md }}
          />

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <ThemedText
              variant="bodySmall"
              color={theme.colors.primary}
              style={{ textAlign: 'center' }}
            >
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>
        </Card>

        <View style={styles.footer}>
          <ThemedText variant="bodySmall" color={theme.colors.onSurfaceVariant}>
            Don't have an account?{' '}
          </ThemedText>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <ThemedText variant="bodySmall" color={theme.colors.primary}>
              Sign Up
            </ThemedText>
          </TouchableOpacity>
        </View>
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
    marginBottom: spacing.xxl,
    alignItems: 'center',
  },
  card: {
    marginBottom: spacing.xl,
  },
  errorBox: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
