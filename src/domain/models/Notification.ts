export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  isRead: boolean;
  relatedId?: string;
  relatedUserId?: string;
  createdAt: number;
}

export type NotificationType =
  | 'new_message'
  | 'new_status'
  | 'group_message'
  | 'mention'
  | 'group_invite'
  | 'friend_request'
  | 'status_reaction';

export interface PushNotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}
