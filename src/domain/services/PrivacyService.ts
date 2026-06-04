import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { BlockedUser, UserReport, MutedChat } from '@models/Privacy';

export class PrivacyService {
  static async blockUser(blockingUserId: string, blockedUserId: string, blockedUserName: string, blockedUserImage?: string) {
    try {
      const blockRef = doc(db, 'blocked_users', `${blockingUserId}_${blockedUserId}`);
      const blockedUser: BlockedUser = {
        id: blockRef.id,
        blockingUserId,
        blockedUserId,
        blockedUserName,
        blockedUserImage,
        createdAt: Date.now(),
      };

      await setDoc(blockRef, blockedUser);

      // Also update user's blockedUsers array
      const userRef = doc(db, 'users', blockingUserId);
      await updateDoc(userRef, {
        blockedUsers: [
          blockedUserId,
        ],
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async unblockUser(blockingUserId: string, blockedUserId: string) {
    try {
      const blockRef = doc(db, 'blocked_users', `${blockingUserId}_${blockedUserId}`);
      await deleteDoc(blockRef);

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getBlockedUsers(userId: string) {
    try {
      const blockedRef = collection(db, 'blocked_users');
      const q = query(blockedRef, where('blockingUserId', '==', userId));

      const snapshot = await getDocs(q);
      const blockedUsers = snapshot.docs.map((doc) => doc.data() as BlockedUser);

      return { success: true, blockedUsers };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async reportUser(
    reportedBy: string,
    reportedUserId: string,
    reportedUserName: string,
    reason: string,
    description: string
  ) {
    try {
      const reportsRef = collection(db, 'reports');
      const report: UserReport = {
        id: '',
        reportedBy,
        reportedUserId,
        reportedUserName,
        reason: reason as any,
        description,
        status: 'pending',
        createdAt: Date.now(),
      };

      const docRef = await addDoc(reportsRef, report);
      return { success: true, reportId: docRef.id };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async muteChat(userId: string, chatId: string, mutedUntil: number | null = null) {
    try {
      const muteRef = doc(db, 'muted_chats', `${userId}_${chatId}`);
      const mutedChat: MutedChat = {
        id: muteRef.id,
        userId,
        chatId,
        mutedUntil,
        createdAt: Date.now(),
      };

      await setDoc(muteRef, mutedChat);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async unmuteChat(userId: string, chatId: string) {
    try {
      const muteRef = doc(db, 'muted_chats', `${userId}_${chatId}`);
      await deleteDoc(muteRef);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}

import { addDoc } from 'firebase/firestore';
