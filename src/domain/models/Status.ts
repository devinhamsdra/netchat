export interface Status {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  type: StatusType;
  mediaUrl?: string;
  mediaThumbnail?: string;
  reactions: StatusReaction[];
  views: StatusView[];
  privacy: 'everyone' | 'contacts' | 'custom';
  customVisibility?: string[];
  isDeleted: boolean;
  createdAt: number;
  expiresAt: number;
}

export type StatusType = 'text' | 'image' | 'video';

export interface StatusReaction {
  userId: string;
  emoji: string;
  createdAt: number;
}

export interface StatusView {
  userId: string;
  userName: string;
  userImage?: string;
  viewedAt: number;
}
