import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from '../../src/components/AuthForm/AuthForm';
import { useAuth } from '../../src/hooks/useAuth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useFormValidation } from '../../src/hooks/useFormValidation';
import { toast } from 'sonner';
import { vi } from 'vitest';

vi.mock('../../src/hooks/useAuth');
vi.mock('react-google-recaptcha-v3');
vi.mock('../../src/hooks/useFormValidation');
vi.mock('sonner', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

describe('AuthForm', () => {
  const login = vi.fn();
  const register = vi.fn();
  const executeRecaptcha = vi.fn();
  const validateForm = vi.fn().mockReturnValue(true);
  const clearErrors = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      login,
      register,
      logout: vi.fn(),
      loading: false,
    });
    vi.mocked(useGoogleReCaptcha).mockReturnValue({ executeRecaptcha });
    vi.mocked(useFormValidation).mockReturnValue({
      validateForm,
      errors: {},
      validateField: vi.fn(),
      clearErrors,
      showError: vi.fn(),
    });
    (toast.error as unknown as jest.Mock).mockClear?.();
    (toast.success as unknown as jest.Mock).mockClear?.();
    login.mockClear();
    register.mockClear();
    executeRecaptcha.mockClear();
    validateForm.mockClear();
    clearErrors.mockClear();
  });

  it('отображает кнопку и открывает диалог', () => {
    render(<AuthForm mode="login" />);
    expect(screen.getByText(/Вход\/Регистрация/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Вход\/Регистрация/i));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('отправляет форму входа', async () => {
    executeRecaptcha.mockResolvedValue('recaptcha-token');
    login.mockResolvedValue({});
    render(<AuthForm mode="login" />);
    fireEvent.click(screen.getByText(/Вход\/Регистрация/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@mail.com', name: 'email' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: '123456', name: 'password' } });
    const form = screen.getByPlaceholderText(/Email/i).closest('form');
    fireEvent.submit(form!);
    await waitFor(() => expect(login).toHaveBeenCalledWith('test@mail.com', '123456', 'recaptcha-token'));
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('отправляет форму регистрации и затем логин', async () => {
    executeRecaptcha.mockResolvedValueOnce('reg-token').mockResolvedValueOnce('login-token');
    register.mockResolvedValue({});
    login.mockResolvedValue({});
    render(<AuthForm mode="register" />);
    fireEvent.click(screen.getByText(/Вход\/Регистрация/i));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@mail.com', name: 'email' } });
    fireEvent.change(screen.getByPlaceholderText(/никнейм/i), { target: { value: 'Test', name: 'name' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: '123456', name: 'password' } });
    const form = screen.getByPlaceholderText(/Email/i).closest('form');
    fireEvent.submit(form!);
    await waitFor(() => expect(register).toHaveBeenCalledWith('test@mail.com', '123456', 'Test', 'reg-token'));
    await waitFor(() => expect(login).toHaveBeenCalledWith('test@mail.com', '123456', 'login-token'));
    expect(toast.success).toHaveBeenCalledWith('Регистрация успешна! Вы автоматически вошли в систему.');
  });

  it('показывает ошибку, если reCAPTCHA не инициализирована', async () => {
    vi.mocked(useGoogleReCaptcha).mockReturnValue({ executeRecaptcha: undefined });
    render(<AuthForm mode="login" />);
    fireEvent.click(screen.getByText(/Вход\/Регистрация/i));
    const form = screen.getByPlaceholderText(/Email/i).closest('form');
    fireEvent.submit(form!);
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Ошибка инициализации reCAPTCHA'));
  });

  it('показывает ошибку валидации при регистрации', async () => {
    validateForm.mockReturnValue(false);
    render(<AuthForm mode="register" />);
    fireEvent.click(screen.getByText(/Вход\/Регистрация/i));
    const form = screen.getByPlaceholderText(/Email/i).closest('form');
    fireEvent.submit(form!);
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Пожалуйста, исправьте ошибки в форме'));
  });

  it('переключает режим между входом и регистрацией', () => {
    render(<AuthForm mode="login" />);
    fireEvent.click(screen.getByText(/Вход\/Регистрация/i));
    expect(screen.getByRole('heading', { name: /Вход/i })).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Зарегистрироваться/));
    expect(screen.getByRole('heading', { name: /Регистрация/i })).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Войти/));
    expect(screen.getByRole('heading', { name: /Вход/i })).toBeInTheDocument();
  });
});
