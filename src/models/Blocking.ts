// Blocking Model
export interface BlockedUser {
  id: string;
  blockingUserId: string;
  blockedUserId: string;
  blockedUserName: string;
  blockedUserProfileImage?: string;
  reason?: string;
  createdAt: number;
}

export interface BlockedUserProfile {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  email?: string;
}
