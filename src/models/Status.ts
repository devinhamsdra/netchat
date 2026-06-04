// Status Model (Stories)
export interface Status {
  id: string;
  userId: string;
  userName: string;
  userProfileImage?: string;
  content: string;
  mediaUrl?: string;
  type: 'text' | 'image' | 'video';
  privacy: 'everyone' | 'contacts' | 'close_friends' | 'specific_users';
  specificUsers?: string[];
  reactions?: { [emoji: string]: string[] }; // emoji -> array of user IDs
  views?: {
    userId: string;
    viewedAt: number;
  }[];
  viewCount: number;
  duration: number; // in milliseconds
  expiresAt: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
}

export interface StatusReaction {
  statusId: string;
  userId: string;
  emoji: string;
  createdAt: number;
}
