import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { Chat, Message, TypingIndicator } from '@models/Chat';
import { MESSAGES_PAGE_SIZE } from '@config/constants';

export class ChatService {
  static async createChat(participants: string[]) {
    try {
      const chatRef = collection(db, 'chats');
      const newChat: Partial<Chat> = {
        participants: participants.sort(),
        participantDetails: [],
        unreadCount: 0,
        isMuted: false,
        isPinned: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const docRef = await addDoc(chatRef, newChat);
      return { success: true, chatId: docRef.id };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getOrCreateChat(userId1: string, userId2: string) {
    try {
      const chatsRef = collection(db, 'chats');
      const participants = [userId1, userId2].sort();

      const q = query(
        chatsRef,
        where('participants', '==', participants)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        return { success: true, chatId: snapshot.docs[0].id };
      }

      // Create new chat if doesn't exist
      return await this.createChat(participants);
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getChat(chatId: string) {
    try {
      const chatRef = doc(db, 'chats', chatId);
      const chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) {
        return { success: false, error: 'Chat not found' };
      }

      return { success: true, chat: { id: chatDoc.id, ...chatDoc.data() } as Chat };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getUserChats(userId: string) {
    try {
      const chatsRef = collection(db, 'chats');
      const q = query(
        chatsRef,
        where('participants', 'array-contains', userId),
        orderBy('lastMessageTime', 'desc')
      );

      const snapshot = await getDocs(q);
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Chat[];

      return { success: true, chats };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async sendMessage(chatId: string, message: Partial<Message>) {
    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const newMessage: Message = {
        id: '',
        chatId,
        senderId: message.senderId || '',
        senderName: message.senderName || '',
        content: message.content || '',
        type: message.type || 'text',
        reactions: [],
        isEdited: false,
        isDeleted: false,
        deletedFor: [],
        isPinned: false,
        isStarred: false,
        deliveryStatus: 'pending',
        readBy: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...message,
      };

      const docRef = await addDoc(messagesRef, newMessage);

      // Update chat's last message
      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: message.content,
        lastMessageTime: Date.now(),
        updatedAt: Date.now(),
      });

      return { success: true, messageId: docRef.id };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getMessages(chatId: string, pageSize: number = MESSAGES_PAGE_SIZE) {
    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const q = query(
        messagesRef,
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      return { success: true, messages: messages.reverse() };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async editMessage(chatId: string, messageId: string, newContent: string) {
    try {
      const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
      await updateDoc(messageRef, {
        content: newContent,
        isEdited: true,
        editedAt: Date.now(),
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async deleteMessage(
    chatId: string,
    messageId: string,
    deleteForEveryone: boolean = false
  ) {
    try {
      const messageRef = doc(db, 'chats', chatId, 'messages', messageId);

      if (deleteForEveryone) {
        await updateDoc(messageRef, {
          isDeleted: true,
          content: '[This message was deleted]',
        });
      } else {
        // For now, we'll mark it as deleted for the user
        // In a real app, you'd need to track which users deleted it
        await updateDoc(messageRef, {
          isDeleted: true,
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async markMessagesAsRead(chatId: string, userId: string, messageIds: string[]) {
    try {
      for (const messageId of messageIds) {
        const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
        await updateDoc(messageRef, {
          deliveryStatus: 'read',
          readBy: [
            {
              userId,
              readAt: Date.now(),
            },
          ],
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
