import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@services/UserService';
import { User, UserSettings } from '@models/User';

const USER_QUERY_KEY = ['user'];
const USER_SETTINGS_QUERY_KEY = ['userSettings'];

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, userId],
    queryFn: async () => {
      const result = await UserService.getUserProfile(userId);
      if (!result.success) throw new Error(result.error);
      return result.user;
    },
    enabled: !!userId,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: Partial<User> }) => {
      const result = await UserService.updateUserProfile(userId, updates);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: [...USER_QUERY_KEY, userId],
      });
    },
  });
};

export const useSearchUsers = (searchTerm: string) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, 'search', searchTerm],
    queryFn: async () => {
      const result = await UserService.searchUsers(searchTerm);
      if (!result.success) throw new Error(result.error);
      return result.users;
    },
    enabled: searchTerm.length > 0,
  });
};

export const useCheckUsernameAvailability = (username: string) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, 'checkUsername', username],
    queryFn: async () => {
      const result = await UserService.checkUsernameAvailability(username);
      if (!result.success) throw new Error(result.error);
      return result.available;
    },
    enabled: username.length > 0,
  });
};

export const useUserSettings = (userId: string) => {
  return useQuery({
    queryKey: [...USER_SETTINGS_QUERY_KEY, userId],
    queryFn: async () => {
      const result = await UserService.getUserSettings(userId);
      if (!result.success) throw new Error(result.error);
      return result.settings;
    },
    enabled: !!userId,
  });
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      updates,
    }: {
      userId: string;
      updates: Partial<UserSettings>;
    }) => {
      const result = await UserService.updateUserSettings(userId, updates);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: [...USER_SETTINGS_QUERY_KEY, userId],
      });
    },
  });
};
