import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { Status, StatusView } from '@models/Status';
import { STATUS_AUTO_DELETE_TIME } from '@config/constants';

export class StatusService {
  static async uploadStatus(userId: string, status: Partial<Status>) {
    try {
      const statusesRef = collection(db, 'statuses');
      const newStatus: Partial<Status> = {
        userId,
        type: status.type || 'text',
        content: status.content || '',
        privacy: status.privacy || 'everyone',
        reactions: [],
        views: [],
        isDeleted: false,
        createdAt: Date.now(),
        expiresAt: Date.now() + STATUS_AUTO_DELETE_TIME,
        ...status,
      };

      const docRef = await addDoc(statusesRef, newStatus);
      return { success: true, statusId: docRef.id };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getStatus(statusId: string) {
    try {
      const statusRef = doc(db, 'statuses', statusId);
      const statusDoc = await getDoc(statusRef);

      if (!statusDoc.exists()) {
        return { success: false, error: 'Status not found' };
      }

      return { success: true, status: { id: statusDoc.id, ...statusDoc.data() } as Status };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getUserStatuses(userId: string) {
    try {
      const statusesRef = collection(db, 'statuses');
      const q = query(statusesRef, where('userId', '==', userId), where('isDeleted', '==', false));

      const snapshot = await getDocs(q);
      const statuses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Status[];

      return { success: true, statuses };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getContactStatuses(contactIds: string[]) {
    try {
      const statusesRef = collection(db, 'statuses');
      const q = query(
        statusesRef,
        where('userId', 'in', contactIds),
        where('isDeleted', '==', false)
      );

      const snapshot = await getDocs(q);
      const statuses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Status[];

      return { success: true, statuses };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async addStatusView(statusId: string, view: StatusView) {
    try {
      const statusRef = doc(db, 'statuses', statusId);
      const statusDoc = await getDoc(statusRef);

      if (!statusDoc.exists()) {
        return { success: false, error: 'Status not found' };
      }

      const currentViews = statusDoc.data().views || [];
      const viewExists = currentViews.some((v: StatusView) => v.userId === view.userId);

      if (!viewExists) {
        await updateDoc(statusRef, {
          views: [...currentViews, view],
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async addStatusReaction(
    statusId: string,
    userId: string,
    emoji: string
  ) {
    try {
      const statusRef = doc(db, 'statuses', statusId);
      const statusDoc = await getDoc(statusRef);

      if (!statusDoc.exists()) {
        return { success: false, error: 'Status not found' };
      }

      const currentReactions = statusDoc.data().reactions || [];
      const reactionExists = currentReactions.some(
        (r: any) => r.userId === userId && r.emoji === emoji
      );

      if (!reactionExists) {
        await updateDoc(statusRef, {
          reactions: [
            ...currentReactions,
            {
              emoji,
              userId,
              createdAt: Date.now(),
            },
          ],
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async deleteStatus(statusId: string) {
    try {
      const statusRef = doc(db, 'statuses', statusId);
      await updateDoc(statusRef, {
        isDeleted: true,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
