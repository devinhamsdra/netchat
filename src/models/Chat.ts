// Chat Model
export interface Chat {
  id: string;
  participants: string[];
  participantDetails?: {
    [userId: string]: {
      name: string;
      profileImage?: string;
    };
  };
  lastMessage?: Message;
  lastMessageTime?: number;
  createdAt: number;
  updatedAt: number;
  isGroup: false;
  isMuted?: { [userId: string]: boolean };
  archivedBy?: string[];
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderProfileImage?: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'voice' | 'document' | 'gif' | 'sticker';
  mediaUrl?: string;
  mediaThumbnail?: string;
  duration?: number; // for voice/video
  reactions?: { [emoji: string]: string[] }; // emoji -> array of user IDs
  replies?: Message[];
  replyTo?: {
    messageId: string;
    content: string;
    senderName: string;
  };
  edited: boolean;
  editedAt?: number;
  deletedForEveryone: boolean;
  seenBy?: { [userId: string]: number }; // userId -> timestamp
  deliveredTo?: { [userId: string]: number }; // userId -> timestamp
  createdAt: number;
  updatedAt: number;
}

export interface ChatSettings {
  chatId: string;
  userId: string;
  isMuted: boolean;
  isArchived: boolean;
  isPinned: boolean;
  notificationSettings: {
    all: boolean;
    mentions: boolean;
    off: boolean;
  };
}
