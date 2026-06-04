import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StatusService } from '@services/StatusService';
import { Status } from '@models/Status';

const STATUS_QUERY_KEY = ['status'];

export const useUserStatuses = (userId: string) => {
  return useQuery({
    queryKey: [...STATUS_QUERY_KEY, userId],
    queryFn: async () => {
      const result = await StatusService.getUserStatuses(userId);
      if (!result.success) throw new Error(result.error);
      return result.statuses;
    },
    enabled: !!userId,
  });
};

export const useContactStatuses = (contactIds: string[]) => {
  return useQuery({
    queryKey: [...STATUS_QUERY_KEY, 'contacts', contactIds],
    queryFn: async () => {
      const result = await StatusService.getContactStatuses(contactIds);
      if (!result.success) throw new Error(result.error);
      return result.statuses;
    },
    enabled: contactIds.length > 0,
  });
};

export const useUploadStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      status,
    }: {
      userId: string;
      status: Partial<Status>;
    }) => {
      const result = await StatusService.uploadStatus(userId, status);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: [...STATUS_QUERY_KEY, userId],
      });
    },
  });
};

export const useAddStatusReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      statusId,
      userId,
      emoji,
    }: {
      statusId: string;
      userId: string;
      emoji: string;
    }) => {
      const result = await StatusService.addStatusReaction(statusId, userId, emoji);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { statusId }) => {
      queryClient.invalidateQueries({
        queryKey: [...STATUS_QUERY_KEY],
      });
    },
  });
};
