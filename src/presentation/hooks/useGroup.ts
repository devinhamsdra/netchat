import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GroupService } from '@services/GroupService';
import { Group, GroupMember } from '@models/Group';

const GROUP_QUERY_KEY = ['group'];

export const useUserGroups = (userId: string) => {
  return useQuery({
    queryKey: [...GROUP_QUERY_KEY, userId],
    queryFn: async () => {
      const result = await GroupService.getUserGroups(userId);
      if (!result.success) throw new Error(result.error);
      return result.groups;
    },
    enabled: !!userId,
  });
};

export const useGroup = (groupId: string) => {
  return useQuery({
    queryKey: [...GROUP_QUERY_KEY, groupId],
    queryFn: async () => {
      const result = await GroupService.getGroup(groupId);
      if (!result.success) throw new Error(result.error);
      return result.group;
    },
    enabled: !!groupId,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      ownerId,
      description,
      profileImage,
    }: {
      name: string;
      ownerId: string;
      description?: string;
      profileImage?: string;
    }) => {
      const result = await GroupService.createGroup(
        name,
        ownerId,
        description,
        profileImage
      );
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { ownerId }) => {
      queryClient.invalidateQueries({
        queryKey: [...GROUP_QUERY_KEY, ownerId],
      });
    },
  });
};

export const useAddGroupMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      groupId,
      member,
    }: {
      groupId: string;
      member: GroupMember;
    }) => {
      const result = await GroupService.addMemberToGroup(groupId, member);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({
        queryKey: [...GROUP_QUERY_KEY, groupId],
      });
    },
  });
};

export const useRemoveGroupMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      groupId,
      userId,
    }: {
      groupId: string;
      userId: string;
    }) => {
      const result = await GroupService.removeMemberFromGroup(groupId, userId);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({
        queryKey: [...GROUP_QUERY_KEY, groupId],
      });
    },
  });
};

export const useUpdateGroupInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      groupId,
      updates,
    }: {
      groupId: string;
      updates: Partial<{
        name: string;
        description: string;
        profileImage: string;
      }>;
    }) => {
      const result = await GroupService.updateGroupInfo(groupId, updates);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({
        queryKey: [...GROUP_QUERY_KEY, groupId],
      });
    },
  });
};
