import { create } from 'zustand';

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

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
}));
