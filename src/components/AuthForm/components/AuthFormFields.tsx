import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import type { TAuthFormFields } from '@/types';
import FormField from './FormField';

const AuthFormFields = ({ isRegister, form, isLoading, handleChange, errors }: TAuthFormFields) => (
  <div className="flex flex-col gap-4">
    <FormField
      name="email"
      label="Email"
      placeholder="Введите email"
      onChange={handleChange}
      value={form.email}
      error={errors?.email}
    />
    {isRegister && (
      <FormField
        name="name"
        label="Никнейм"
        placeholder="Введите никнейм"
        onChange={handleChange}
        value={form.name}
        error={errors?.name}
      />
    )}
    <FormField
      name="password"
      label="Пароль"
      placeholder="Введите пароль"
      onChange={handleChange}
      value={form.password}
      error={errors?.password}
    />
    <div className="flex flex-col gap-3">
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : isRegister ? 'Зарегистрироваться' : 'Войти'}
      </Button>
    </div>
  </div>
);

export default AuthFormFields;
