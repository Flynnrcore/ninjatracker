import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URLS } from '../constants/api';
import { fetchWithRefresh } from '@/lib/fetchWithRefresh';
import type { AuthContextType, TUser } from '@/types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(true);

  // Получить CSRF-токен при старте
  useEffect(() => {
    fetchWithRefresh(API_URLS.csrf, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken));
  }, []);

  // Проверить сессию при старте
  useEffect(() => {
    if (!csrfToken) return;
    fetchWithRefresh(API_URLS.session, {
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken },
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, [csrfToken]);

  const value = { user, setUser, csrfToken, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
