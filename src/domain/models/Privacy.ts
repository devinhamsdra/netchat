export interface BlockedUser {
  id: string;
  blockingUserId: string;
  blockedUserId: string;
  blockedUserName: string;
  blockedUserImage?: string;
  createdAt: number;
}

export interface UserReport {
  id: string;
  reportedBy: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: ReportReason;
  description: string;
  evidence?: string[];
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: number;
  resolvedAt?: number;
}

export type ReportReason =
  | 'spam'
  | 'abuse'
  | 'harassment'
  | 'inappropriate_content'
  | 'impersonation'
  | 'other';

export interface MutedChat {
  id: string;
  userId: string;
  chatId: string;
  mutedUntil: number | null; // null means muted indefinitely
  createdAt: number;
}
