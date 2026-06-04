// App Constants
export const APP_NAME = 'NetChat';
export const APP_VERSION = '1.0.0';
export const PACKAGE_NAME = 'com.inhams.netchat';

// Validation
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const BIO_MAX_LENGTH = 160;

// File Sizes (in bytes)
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024; // 25MB
export const MAX_VOICE_NOTE_DURATION = 600; // 10 minutes in seconds

// Status
export const STATUS_AUTO_DELETE_TIME = 24 * 60 * 60 * 1000; // 24 hours

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MESSAGES_PAGE_SIZE = 30;
export const CHATS_PAGE_SIZE = 20;

// Timeouts
export const TYPING_INDICATOR_TIMEOUT = 3000; // 3 seconds
export const MESSAGE_DELIVERY_TIMEOUT = 30000; // 30 seconds

// Premium
export const PREMIUM_PLAN = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  LIFETIME: 'lifetime',
};

// Group Limits
export const MAX_GROUP_NAME_LENGTH = 64;
export const MAX_GROUP_MEMBERS_FREE = 50;
export const MAX_GROUP_MEMBERS_PREMIUM = 500;
