import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { PATH } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { API_URLS } from '@/constants/api';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  mode: AuthMode;
  className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, className }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(mode === 'register');

  const { login } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Универсальный обработчик изменения полей
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  // Сброс формы
  const resetForm = useCallback(() => {
    setForm({ email: '', name: '', password: '' });
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  }, []);

  // Логин
  const doLogin = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(API_URLS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        login(data.token);
      }
    } catch {
      setError('Ошибка входа');
      setIsLoading(false);
    }
  }, [login]);

  // Регистрация
  const handleRegister = useCallback(async () => {
    if (!executeRecaptcha) {
      setError('Ошибка инициализации reCAPTCHA');
      setIsLoading(false);
      return;
    }
    const token = await executeRecaptcha('register');
    if (!token) {
      setError('Подтвердите, что вы не робот');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(API_URLS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken: token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Ошибка');
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setOpen(false);
      await doLogin(form.email, form.password); // Автоматический вход
      resetForm();
    } catch {
      setError('Ошибка сети');
      setIsLoading(false);
    }
  }, [executeRecaptcha, form, doLogin, resetForm]);

  // Отправка формы
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    if (isRegister) {
      await handleRegister();
      return;
    }

    try {
      const response = await fetch(API_URLS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Ошибка');
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setOpen(false);
      resetForm();
      if (data.token) {
        login(data.token);
      }
    } catch {
      setError('Ошибка сети');
      setIsLoading(false);
    }
  }, [isRegister, handleRegister, form, login, resetForm]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(isRegister ? 'Регистрация успешна!' : 'Вход выполнен!');
  }, [error, success, isRegister]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          Вход/Регистрация
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isRegister ? 'Регистрация' : 'Вход'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="max-w-md">
          <img src={PATH.AUTH_IMG} alt="auth" className="mx-auto h-auto w-1/2" />
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Введите email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
            {isRegister && (
              <div className="grid gap-3">
                <Label htmlFor="name">Никнейм</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Введите никнейм"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            )}
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Введите пароль"
                value={form.password}
                onChange={handleChange}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : isRegister ? 'Зарегистрироваться' : 'Войти'}
              </Button>
            </div>
          </div>
        </form>
        <DialogFooter className="flex items-center justify-center text-sm">
          {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <button onClick={() => setIsRegister(!isRegister)} className="underline underline-offset-4">
            {isRegister ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};