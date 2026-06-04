export const ENVIRONMENT = process.env.EXPO_PUBLIC_ENVIRONMENT || 'development';

export const API_ENDPOINTS = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
};

export const FIREBASE = {
  API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Validation constants
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

// UI constants
export const DEBOUNCE_DELAY = 300;
export const PAGINATION_LIMIT = 20;
export const MESSAGE_BATCH_SIZE = 50;

// Feature flags
export const FEATURES = {
  GROUPS: true,
  STATUSES: true,
  VOICE_CALLS: true,
  VIDEO_CALLS: true,
  END_TO_END_ENCRYPTION: true,
  MESSAGE_REACTIONS: true,
  MESSAGE_REPLIES: true,
  STORY_REACTIONS: true,
};
