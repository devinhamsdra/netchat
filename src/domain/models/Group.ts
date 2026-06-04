export interface Group {
  id: string;
  name: string;
  description?: string;
  profileImage?: string;
  ownerId: string;
  members: GroupMember[];
  admins: string[];
  createdAt: number;
  updatedAt: number;
  lastMessage?: string;
  lastMessageTime?: number;
  messageCount: number;
  inviteLink?: string;
}

export interface GroupMember {
  userId: string;
  name: string;
  username: string;
  profileImage?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: number;
  isOnline: boolean;
  lastSeen: number;
}

export interface GroupInvite {
  id: string;
  groupId: string;
  groupName: string;
  groupImage?: string;
  invitedBy: string;
  invitedUser: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: number;
  expiresAt: number;
}

export interface GroupSettings {
  groupId: string;
  allowMembersToAdd: boolean;
  allowMembersToLeave: boolean;
  requireApprovalForJoin: boolean;
  allowMessagesFromNonMembers: boolean;
}
