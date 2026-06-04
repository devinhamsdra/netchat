export interface Chat {
  id: string;
  participants: string[];
  participantDetails: ChatParticipant[];
  lastMessage?: Message;
  lastMessageTime?: number;
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ChatParticipant {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  isOnline: boolean;
  lastSeen: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  content: string;
  type: MessageType;
  mediaUrl?: string;
  mediaThumbnail?: string;
  mediaSize?: number;
  mediaDuration?: number;
  replyTo?: MessageReply;
  reactions: MessageReaction[];
  isEdited: boolean;
  editedAt?: number;
  isDeleted: boolean;
  deletedFor: string[];
  isPinned: boolean;
  isStarred: boolean;
  deliveryStatus: 'pending' | 'sent' | 'delivered' | 'read';
  readBy: ReadReceipt[];
  createdAt: number;
  updatedAt: number;
}

export type MessageType = 'text' | 'image' | 'video' | 'voice' | 'document' | 'gif' | 'sticker';

export interface MessageReply {
  messageId: string;
  senderName: string;
  content: string;
  type: MessageType;
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  createdAt: number;
}

export interface ReadReceipt {
  userId: string;
  readAt: number;
}

export interface TypingIndicator {
  chatId: string;
  userId: string;
  isTyping: boolean;
}
