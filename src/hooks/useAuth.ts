import { useAuthContext, type AuthContextType } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { toast } from 'sonner';
import { useState } from 'react';

export const useAuth = () => {
  const { setUser, csrfToken } = useAuthContext() as AuthContextType;
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, recaptchaToken: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, recaptchaToken }),
      });
      if (!response.ok) {
        throw new Error('Ошибка входа');
      }
      const data = await response.json();
      setUser(data.user);
      toast.success('Вы успешно вошли в аккаунт');
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, recaptchaToken: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name, recaptchaToken }),
      });
      if (!response.ok) {
        throw new Error('Ошибка регистрации');
      }
      const data = await response.json();
      setUser(data.user);
      toast.success('Вы успешно зарегистрировались');
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch(API_URLS.logout, {
        method: 'POST',
        headers: { 'x-csrf-token': csrfToken },
        credentials: 'include',
      });
      setUser(null);
      toast.success('Вы успешно вышли из аккаунта');
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { login, register, logout, loading };
};
