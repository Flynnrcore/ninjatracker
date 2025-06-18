import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { PATH } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';
import ReCAPTCHA from 'react-google-recaptcha';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  mode: AuthMode;
  className?: string;
}

const API_URLS = {
  login: 'https://ninjatracker-backend.onrender.com/api/login',
  register: 'https://ninjatracker-backend.onrender.com/api/register',
};

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const AuthForm: React.FC<AuthFormProps> = ({ mode, className }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(mode === 'register');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { login } = useAuth();

  const handleRegister = async (token: string | null) => {
    if (!token) {
      setError('Подтвердите, что вы не робот');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(API_URLS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, recaptchaToken: token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Ошибка');
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setEmail('');
      setName('');
      setPassword('');
      setIsLoading(false);
      setOpen(false);
      recaptchaRef.current?.reset();
    } catch {
      setError('Ошибка сети');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    if (isRegister) {
      await recaptchaRef.current?.executeAsync();
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URLS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Ошибка');
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setEmail('');
      setName('');
      setPassword('');
      setIsLoading(false);
      setOpen(false);
      if (data.token) {
        login(data.token);
      }
    } catch {
      setError('Ошибка сети');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(isRegister ? 'Регистрация успешна!' : 'Вход выполнен!');
  }, [error, success]);

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
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            {isRegister && (
              <div className="grid gap-3">
                <Label htmlFor="name">Никнейм</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите никнейм"
                  value={name}
                  onChange={e => setName(e.target.value)}
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
                type="password"
                required
                placeholder="Введите пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
            </div>
            {isRegister && (
              <ReCAPTCHA ref={recaptchaRef} sitekey={SITE_KEY} size="invisible" onChange={handleRegister} />
            )}
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
