import { createContext, useContext } from 'react';

export type User = {
  id: number;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth должен быть внутри AuthProvider');
  return ctx;
};
