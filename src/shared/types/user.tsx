export interface User {
  id: string;
  email: string;
  preferencias: {};
  token:string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}
