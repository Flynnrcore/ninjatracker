import { Input, Label, Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import type { TAuthFormFields } from '@/types';

const AuthFormFields = ({ isRegister, form, isLoading, handleChange, errors }: TAuthFormFields) => (
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
        className={errors?.email ? 'input-error' : ''}
      />
      {errors?.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
          className={errors?.name ? 'input-error' : ''}
        />
        {errors?.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
    )}
    <div className="grid gap-1">
      <Label htmlFor="password">Пароль</Label>
      <Input
        id="password"
        name="password"
        type="password"
        required
        placeholder="Введите пароль"
        value={form.password}
        onChange={handleChange}
        autoComplete={isRegister ? 'new-password' : 'current-password'}
        className={errors?.password ? 'input-error' : ''}
      />
      {errors?.password && <p className="text-sm text-red-500">{errors.password}</p>}
    </div>
    <div className="flex flex-col gap-3">
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : isRegister ? 'Зарегистрироваться' : 'Войти'}
      </Button>
    </div>
  </div>
);

export default AuthFormFields;
