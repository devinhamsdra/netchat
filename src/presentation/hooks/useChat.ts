import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatService } from '@services/ChatService';
import { Chat, Message } from '@models/Chat';

const CHATS_QUERY_KEY = ['chats'];
const MESSAGES_QUERY_KEY = ['messages'];

export const useUserChats = (userId: string) => {
  return useQuery({
    queryKey: [...CHATS_QUERY_KEY, userId],
    queryFn: async () => {
      const result = await ChatService.getUserChats(userId);
      if (!result.success) throw new Error(result.error);
      return result.chats;
    },
    enabled: !!userId,
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: [...CHATS_QUERY_KEY, chatId],
    queryFn: async () => {
      const result = await ChatService.getChat(chatId);
      if (!result.success) throw new Error(result.error);
      return result.chat;
    },
    enabled: !!chatId,
  });
};

export const useMessages = (chatId: string) => {
  return useQuery({
    queryKey: [...MESSAGES_QUERY_KEY, chatId],
    queryFn: async () => {
      const result = await ChatService.getMessages(chatId);
      if (!result.success) throw new Error(result.error);
      return result.messages;
    },
    enabled: !!chatId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chatId,
      message,
    }: {
      chatId: string;
      message: Partial<Message>;
    }) => {
      const result = await ChatService.sendMessage(chatId, message);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({
        queryKey: [...MESSAGES_QUERY_KEY, chatId],
      });
      queryClient.invalidateQueries({
        queryKey: [...CHATS_QUERY_KEY],
      });
    },
  });
};

export const useEditMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chatId,
      messageId,
      newContent,
    }: {
      chatId: string;
      messageId: string;
      newContent: string;
    }) => {
      const result = await ChatService.editMessage(chatId, messageId, newContent);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({
        queryKey: [...MESSAGES_QUERY_KEY, chatId],
      });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chatId,
      messageId,
      deleteForEveryone,
    }: {
      chatId: string;
      messageId: string;
      deleteForEveryone?: boolean;
    }) => {
      const result = await ChatService.deleteMessage(chatId, messageId, deleteForEveryone);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({
        queryKey: [...MESSAGES_QUERY_KEY, chatId],
      });
    },
  });
};
