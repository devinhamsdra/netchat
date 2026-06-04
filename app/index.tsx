import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@hooks/useAuth';
import { SplashScreen } from '@screens/SplashScreen';

export default function IndexScreen() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)/chats');
      } else {
        router.replace('/login');
      }
    }
  }, [isLoading, isAuthenticated]);

  return <SplashScreen />;
}
