export interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  profileImage?: string;
  about?: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  isOnline: boolean;
  lastSeen: number;
  createdAt: number;
  updatedAt: number;
  isPremium: boolean;
  premiumExpiresAt?: number;
  blockedUsers: string[];
  pushNotificationsToken?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  username: string;
  profileImage?: string;
  about?: string;
  phoneNumber?: string;
  isOnline: boolean;
  lastSeen: number;
  isPremium: boolean;
}

export interface UserSettings {
  userId: string;
  lastSeenVisibility: 'everyone' | 'contacts' | 'nobody';
  onlineStatusVisibility: 'everyone' | 'contacts' | 'nobody';
  readReceiptsEnabled: boolean;
  profilePhotoVisibility: 'everyone' | 'contacts' | 'nobody';
  statusVisibility: 'everyone' | 'contacts' | 'nobody';
  notificationsEnabled: boolean;
  pushNotificationsEnabled: boolean;
}
