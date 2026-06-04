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
import { Group, GroupMember, GroupInvite } from '@models/Group';

export class GroupService {
  static async createGroup(
    name: string,
    ownerId: string,
    description?: string,
    profileImage?: string
  ) {
    try {
      const groupsRef = collection(db, 'groups');
      const newGroup: Partial<Group> = {
        name,
        description,
        profileImage,
        ownerId,
        members: [
          {
            userId: ownerId,
            name: '',
            username: '',
            role: 'owner',
            joinedAt: Date.now(),
            isOnline: true,
            lastSeen: Date.now(),
          },
        ],
        admins: [ownerId],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messageCount: 0,
      };

      const docRef = await addDoc(groupsRef, newGroup);
      return { success: true, groupId: docRef.id };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getGroup(groupId: string) {
    try {
      const groupRef = doc(db, 'groups', groupId);
      const groupDoc = await getDoc(groupRef);

      if (!groupDoc.exists()) {
        return { success: false, error: 'Group not found' };
      }

      return { success: true, group: { id: groupDoc.id, ...groupDoc.data() } as Group };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getUserGroups(userId: string) {
    try {
      const groupsRef = collection(db, 'groups');
      const q = query(groupsRef, where('members', 'array-contains', userId));

      const snapshot = await getDocs(q);
      const groups = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Group[];

      return { success: true, groups };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async addMemberToGroup(groupId: string, member: GroupMember) {
    try {
      const groupRef = doc(db, 'groups', groupId);
      const groupDoc = await getDoc(groupRef);

      if (!groupDoc.exists()) {
        return { success: false, error: 'Group not found' };
      }

      const currentMembers = groupDoc.data().members || [];
      const memberExists = currentMembers.some((m: GroupMember) => m.userId === member.userId);

      if (memberExists) {
        return { success: false, error: 'Member already in group' };
      }

      await updateDoc(groupRef, {
        members: [...currentMembers, member],
        updatedAt: Date.now(),
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async removeMemberFromGroup(groupId: string, userId: string) {
    try {
      const groupRef = doc(db, 'groups', groupId);
      const groupDoc = await getDoc(groupRef);

      if (!groupDoc.exists()) {
        return { success: false, error: 'Group not found' };
      }

      const members = groupDoc.data().members || [];
      const updatedMembers = members.filter((m: GroupMember) => m.userId !== userId);

      await updateDoc(groupRef, {
        members: updatedMembers,
        updatedAt: Date.now(),
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async updateGroupInfo(
    groupId: string,
    updates: Partial<{ name: string; description: string; profileImage: string }>
  ) {
    try {
      const groupRef = doc(db, 'groups', groupId);
      await updateDoc(groupRef, {
        ...updates,
        updatedAt: Date.now(),
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async deleteGroup(groupId: string) {
    try {
      const groupRef = doc(db, 'groups', groupId);
      await deleteDoc(groupRef);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
