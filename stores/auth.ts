import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  phone?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  restore: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: async () => {
    await AsyncStorage.removeItem("auth_token");
    set({ token: null, user: null });
  },
  restore: async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) set({ token });
    } finally {
      set({ isLoading: false });
    }
  },
}));
