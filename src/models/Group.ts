// Group Model
export interface Group {
  id: string;
  name: string;
  description?: string;
  profileImage?: string;
  ownerId: string;
  admins: string[];
  members: GroupMember[];
  lastMessage?: {
    id: string;
    content: string;
    senderId: string;
    senderName: string;
    createdAt: number;
  };
  createdAt: number;
  updatedAt: number;
  settings?: {
    allowMembersToAdd: boolean;
    allowMembersToEdit: boolean;
    requireApprovalToJoin: boolean;
  };
}

export interface GroupMember {
  userId: string;
  name: string;
  profileImage?: string;
  role: 'member' | 'moderator' | 'admin';
  joinedAt: number;
  lastSeen?: number;
  isActive?: boolean;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  senderProfileImage?: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'voice' | 'document' | 'gif' | 'sticker';
  mediaUrl?: string;
  mediaThumbnail?: string;
  duration?: number;
  reactions?: { [emoji: string]: string[] };
  replies?: GroupMessage[];
  replyTo?: {
    messageId: string;
    content: string;
    senderName: string;
  };
  edited: boolean;
  editedAt?: number;
  deletedForEveryone: boolean;
  seenBy?: string[];
  deliveredTo?: string[];
  createdAt: number;
  updatedAt: number;
}
