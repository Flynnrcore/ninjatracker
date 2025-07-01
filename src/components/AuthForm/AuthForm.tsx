import React, { useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { PATH } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';
import { useFormValidation } from '@/hooks/useFormValidation';
import { AUTH_FORM_VALIDATION_RULES } from '@/constants/validation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui';
import AuthFormFields from './components/AuthFormFields';
import type { TAuthForm } from '@/types';

const AuthForm = ({ mode, loader, className }: TAuthForm) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(mode === 'register');

  const { login, register } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { validateForm, errors, clearErrors } = useFormValidation(AUTH_FORM_VALIDATION_RULES);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
      if (errors[e.target.name]) {
        clearErrors();
      }
    },
    [errors, clearErrors],
  );

  const resetForm = useCallback(() => {
    setForm({ email: '', name: '', password: '' });
    setIsLoading(false);
    clearErrors();
  }, [clearErrors]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Валидация формы для регистрации
      const formData = new FormData(e.target as HTMLFormElement);
      if (isRegister && !validateForm(formData)) {
        toast.error('Пожалуйста, исправьте ошибки в форме');
        return;
      }

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
          await register(form.email, form.password, form.name, recaptchaToken);

          const loginRecaptchaToken = await executeRecaptcha('login');
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
        toast.error((err as Error).message);
        setIsLoading(false);
      }
    },
    [isRegister, register, login, form, executeRecaptcha, resetForm, validateForm],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`${className} w-[200px] px-4`} disabled={loader}>
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
          <img src={PATH.AUTH_IMG} loading="lazy" alt="auth" className="mx-auto h-auto w-1/2" />
          <AuthFormFields
            isRegister={isRegister}
            form={form}
            isLoading={isLoading}
            handleChange={handleChange}
            errors={errors}
          />
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
