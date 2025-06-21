import React, { useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { PATH } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button, Input, Label } from '@/components/ui';

type AuthFormProps = {
  mode: 'login' | 'register';
  className?: string;
  loader?: boolean;
};

const AuthForm = ({ mode, loader, className }: AuthFormProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(mode === 'register');

  const { login, register } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Универсальный обработчик изменения полей
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Сброс формы
  const resetForm = useCallback(() => {
    setForm({ email: '', name: '', password: '' });
    setIsLoading(false);
  }, []);

  // Отправка формы
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (!executeRecaptcha) {
        setIsLoading(false);
        toast.error('Ошибка инициализации reCAPTCHA');
        return;
      }
      const action = isRegister ? 'register' : 'login';
      const recaptchaToken = await executeRecaptcha(action);
      if (!recaptchaToken) {
        setIsLoading(false);
        toast.error('Подтвердите, что вы не робот');
        return;
      }

      try {
        if (isRegister) {
          // Сначала регистрация
          await register(form.email, form.password, form.name, recaptchaToken);
          
          // После успешной регистрации автоматически входим
          const loginAction = 'login';
          const loginRecaptchaToken = await executeRecaptcha(loginAction);
          if (loginRecaptchaToken) {
            await login(form.email, form.password, loginRecaptchaToken);
            toast.success('Регистрация успешна! Вы автоматически вошли в систему.');
          } else {
            toast.success('Регистрация успешна! Теперь вы можете войти в систему.');
          }
        } else {
          await login(form.email, form.password, recaptchaToken);
        }
        setOpen(false);
        resetForm();
      } catch (err: unknown) {
        toast.error((err as Error).message || (isRegister ? 'Ошибка регистрации' : 'Ошибка входа'));
        setIsLoading(false);
      }
    },
    [isRegister, register, login, form, executeRecaptcha, resetForm],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`${className} px-4`} disabled={loader}>
          {loader ? (
            <>
              Проверка сессии <Loader2 className="animate-spin" />
            </>
          ) : (
            'Вход/Регистрация'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{isRegister ? 'Регистрация' : 'Вход'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="max-w-md">
          <img src={PATH.AUTH_IMG} alt="auth" className="mx-auto h-auto w-1/2" />
          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
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
              <div className="grid gap-1">
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
            <div className="grid gap-1">
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
        <DialogFooter className="mt-2 flex flex-row items-center justify-center text-sm md:mt-0">
          {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <button onClick={() => setIsRegister(!isRegister)} className="underline underline-offset-4">
            {isRegister ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
