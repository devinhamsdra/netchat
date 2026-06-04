import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { User, UserSettings } from '@models/User';

export class UserService {
  static async createUserProfile(userId: string, userData: Partial<User>) {
    try {
      const userRef = doc(db, 'users', userId);
      const newUser: User = {
        id: userId,
        email: userData.email || '',
        fullName: userData.fullName || '',
        username: userData.username || '',
        isEmailVerified: false,
        isOnline: true,
        lastSeen: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isPremium: false,
        blockedUsers: [],
        ...userData,
      };

      await setDoc(userRef, newUser);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getUserProfile(userId: string) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return { success: false, error: 'User not found' };
      }

      return { success: true, user: userDoc.data() as User };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<User>) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: Date.now(),
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async searchUsers(searchTerm: string, limit: number = 20) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('username', '>=', searchTerm),
        where('username', '<=', searchTerm + '\uf8ff')
      );

      const snapshot = await getDocs(q);
      const users = snapshot.docs.map((doc) => doc.data() as User);

      return { success: true, users: users.slice(0, limit) };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async checkUsernameAvailability(username: string) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const snapshot = await getDocs(q);

      return { success: true, available: snapshot.empty };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async createUserSettings(userId: string) {
    try {
      const settingsRef = doc(db, 'user_settings', userId);
      const settings: UserSettings = {
        userId,
        lastSeenVisibility: 'everyone',
        onlineStatusVisibility: 'everyone',
        readReceiptsEnabled: true,
        profilePhotoVisibility: 'everyone',
        statusVisibility: 'everyone',
        notificationsEnabled: true,
        pushNotificationsEnabled: true,
      };

      await setDoc(settingsRef, settings);
      return { success: true, settings };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getUserSettings(userId: string) {
    try {
      const settingsRef = doc(db, 'user_settings', userId);
      const settingsDoc = await getDoc(settingsRef);

      if (!settingsDoc.exists()) {
        return await this.createUserSettings(userId);
      }

      return { success: true, settings: settingsDoc.data() as UserSettings };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async updateUserSettings(userId: string, updates: Partial<UserSettings>) {
    try {
      const settingsRef = doc(db, 'user_settings', userId);
      await updateDoc(settingsRef, updates);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
