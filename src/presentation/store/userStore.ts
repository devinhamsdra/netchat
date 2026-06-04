import { create } from 'zustand';
import { User, UserSettings } from '@models/User';

interface UserStoreState {
  currentUser: User | null;
  userSettings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
  setCurrentUser: (user: User | null) => void;
  setUserSettings: (settings: UserSettings | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUserProfile: (user: Partial<User>) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  currentUser: null,
  userSettings: null,
  isLoading: false,
  error: null,

  setCurrentUser: (user) => set({ currentUser: user }),
  setUserSettings: (settings) => set({ userSettings: settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  updateUserProfile: (updates) =>
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, ...updates }
        : null,
    })),
}));
