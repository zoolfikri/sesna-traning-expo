import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
};

type AuthStore = {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
};

const authState = (set: any): AuthStore => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
});

const persistConfig = {
  name: 'auth-store',
  storage: createJSONStorage(() => AsyncStorage),
};

export const useAuthStore = create<AuthStore>()(
  persist(authState, persistConfig)
);
