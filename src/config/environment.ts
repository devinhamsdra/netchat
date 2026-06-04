import { FIREBASE } from './constants';

const isValidFirebaseConfig = () => {
  const requiredKeys = ['API_KEY', 'AUTH_DOMAIN', 'PROJECT_ID', 'STORAGE_BUCKET', 'MESSAGING_SENDER_ID', 'APP_ID'];
  return requiredKeys.every(key => FIREBASE[key as keyof typeof FIREBASE]);
};

if (!isValidFirebaseConfig()) {
  console.warn('Firebase configuration is incomplete. Some features may not work properly.');
}

export const validateEnvironment = () => {
  const errors = [];

  if (!process.env.EXPO_PUBLIC_FIREBASE_API_KEY) {
    errors.push('EXPO_PUBLIC_FIREBASE_API_KEY is not set');
  }
  if (!process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID) {
    errors.push('EXPO_PUBLIC_FIREBASE_PROJECT_ID is not set');
  }
  if (!process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN) {
    errors.push('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN is not set');
  }
  if (!process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET) {
    errors.push('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET is not set');
  }

  if (errors.length > 0) {
    console.error('Environment validation errors:', errors);
    return false;
  }

  return true;
};
