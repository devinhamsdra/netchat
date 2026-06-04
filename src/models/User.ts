// User Model
export interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  profileImage?: string;
  about?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  createdAt: number;
  updatedAt: number;
  lastSeen?: number;
  isOnline?: boolean;
  status?: 'available' | 'away' | 'busy' | 'offline';
}

export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
    messagePreviews: boolean;
  };
  privacy: {
    lastSeen: 'everyone' | 'contacts' | 'nobody';
    profilePhoto: 'everyone' | 'contacts' | 'nobody';
    status: 'everyone' | 'contacts' | 'nobody';
    readReceipts: boolean;
    groups: 'everyone' | 'contacts' | 'nobody';
  };
  blockedUsers: string[];
  mutedChats: string[];
  createdAt: number;
  updatedAt: number;
}
