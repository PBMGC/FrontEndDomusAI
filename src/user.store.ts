import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, User } from "./shared/types/user";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user: User) =>
        set(() => ({
          user,
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          user: null,
          isAuthenticated: false,
        })),

      setUser: (user: User) =>
        set(() => ({
          user,
          isAuthenticated: !!user,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
