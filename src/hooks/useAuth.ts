import { useAuthContext, type AuthContextType } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { toast } from 'sonner';
import { useState } from 'react';

export const useAuth = () => {
  const { setUser, csrfToken } = useAuthContext() as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, recaptchaToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URLS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'x-csrf-token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, recaptchaToken }),
      });
      if (!response.ok) {
        toast.error('Ошибка входа');
        throw new Error('Ошибка входа');
      }
      const data = await response.json();
      setUser(data.user);
      toast.success('Вы успешно вошли в аккаунт');
    } catch (err: unknown) {
      toast.error((err as Error).message);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, recaptchaToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URLS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name, recaptchaToken }),
      });
      if (!response.ok) {
        toast.error('Ошибка регистрации');
        throw new Error('Ошибка регистрации');
      }
      const data = await response.json();
      setUser(data.user);
      toast.success('Вы успешно зарегистрировались');
    } catch (err: unknown) {
      toast.error((err as Error).message);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetch(API_URLS.logout, {
        method: 'POST',
        headers: { 'x-csrf-token': csrfToken },
        credentials: 'include',
      });
      setUser(null);
      toast.success('Вы успешно вышли из аккаунта');
    } catch (err: unknown) {
      toast.error((err as Error).message);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { login, register, logout, loading, error };
};
