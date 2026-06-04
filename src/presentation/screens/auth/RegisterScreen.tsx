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
import { registerSchema, type RegisterInput } from '@utils/validation';
import { UserService } from '@services/UserService';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const RegisterScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    // Check username availability
    const usernameResult = await UserService.checkUsernameAvailability(data.username);
    if (!usernameResult.success || !usernameResult.available) {
      setError('Username is already taken');
      setIsLoading(false);
      return;
    }

    // Register user
    const authResult = await AuthService.register(data);

    if (authResult.success) {
      // Create user profile
      const profileResult = await UserService.createUserProfile(authResult.user.uid, {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
      });

      if (profileResult.success) {
        // Create user settings
        await UserService.createUserSettings(authResult.user.uid);
        router.replace('/verify-email');
      } else {
        setError(profileResult.error);
      }
    } else {
      setError(authResult.error);
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
          <ThemedText variant="headlineLarge">Create Account</ThemedText>
          <ThemedText variant="bodyMedium" color={theme.colors.onSurfaceVariant}>
            Join NetChat and start chatting
          </ThemedText>
        </View>

        <Card style={styles.card}>
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
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                error={errors.fullName?.message}
                containerStyle={{ marginBottom: spacing.lg }}
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Username"
                placeholder="Choose a unique username"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                error={errors.username?.message}
                containerStyle={{ marginBottom: spacing.lg }}
              />
            )}
          />

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
                placeholder="Create a strong password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.password?.message}
                containerStyle={{ marginBottom: spacing.lg }}
                helper="Min 8 chars, 1 uppercase, 1 number, 1 special char"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.confirmPassword?.message}
                containerStyle={{ marginBottom: spacing.lg }}
              />
            )}
          />

          <Button
            label="Sign Up"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </Card>

        <View style={styles.footer}>
          <ThemedText variant="bodySmall" color={theme.colors.onSurfaceVariant}>
            Already have an account?{' '}
          </ThemedText>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <ThemedText variant="bodySmall" color={theme.colors.primary}>
              Sign In
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
  },
  header: {
    marginBottom: spacing.xl,
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
