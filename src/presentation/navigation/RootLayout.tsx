import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@hooks/useAuth';
import { SplashScreen } from '@screens/SplashScreen';

export const RootLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="verify-email" options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
};

export default RootLayout;
