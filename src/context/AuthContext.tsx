import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { API_URLS } from '../constants/api';
import { fetchWithRefresh } from '@/lib/fetchWithRefresh';
import type { AuthContextType, TUser } from '@/types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  // Получить CSRF-токен при старте
  useEffect(() => {
    fetchWithRefresh(API_URLS.csrf, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(() => setLoading(false));
  }, []);

  // Проверить сессию при старте
  useEffect(() => {
    setLoading(true);
    if (!csrfToken) return;

    fetchWithRefresh(API_URLS.session, {
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken },
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, [csrfToken]);

  // Функция для принудительного обновления данных
  const refreshData = useCallback(() => {
    setDataRefreshTrigger(prev => prev + 1);
  }, []);

  const value = {
    user,
    setUser,
    csrfToken,
    loading,
    dataRefreshTrigger,
    refreshData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
