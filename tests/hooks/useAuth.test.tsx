import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../src/hooks/useAuth';
import { useAuthContext } from '../../src/context/AuthContext';
import { API_URLS } from '../../src/constants/api';
import { fetchWithRefresh } from '../../src/lib/fetchWithRefresh';
import { toast } from 'sonner';

import { vi } from 'vitest';
import type { MockInstance } from 'vitest';

vi.mock('../../src/context/AuthContext');
vi.mock('../../src/lib/fetchWithRefresh');
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe('useAuth', () => {
  const setUser = vi.fn();
  const refreshData = vi.fn();
  const csrfToken = 'test-csrf-token';

  beforeEach(() => {
    global.fetch = vi.fn();
    (useAuthContext as jest.Mock).mockReturnValue({ setUser, csrfToken, refreshData });
    (fetchWithRefresh as jest.Mock).mockClear();
    (global.fetch as unknown as MockInstance).mockClear();
    setUser.mockClear();
    refreshData.mockClear();
    (toast.success as jest.Mock).mockClear();
  });

  it('успешный login', async () => {
    (fetchWithRefresh as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 1, name: 'Test' } }),
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login('test@mail.com', '123', 'recaptcha');
    });

    expect(fetchWithRefresh).toHaveBeenCalledWith(API_URLS.login, expect.any(Object));
    expect(setUser).toHaveBeenCalledWith({ id: 1, name: 'Test' });
    expect(refreshData).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Вы успешно вошли в аккаунт');
    expect(result.current.loading).toBe(false);
  });

  it('login с ошибкой', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'Ошибка входа' }),
    };

    (fetchWithRefresh as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth());
    await expect(result.current.login('test@mail.com', '123', 'recaptcha')).rejects.toThrow('Ошибка входа');
    expect(result.current.loading).toBe(false);
  });

  it('успешный register', async () => {
    (global.fetch as unknown as MockInstance).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 2, name: 'User' } }),
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.register('test@mail.com', '123', 'User', 'recaptcha');
    });

    expect(global.fetch).toHaveBeenCalledWith(API_URLS.register, expect.any(Object));
    expect(setUser).toHaveBeenCalledWith({ id: 2, name: 'User' });
    expect(refreshData).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Вы успешно зарегистрировались');
    expect(result.current.loading).toBe(false);
  });

  it('register с ошибкой', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'Ошибка регистрации' }),
    };

    (global.fetch as unknown as MockInstance).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth());
    await expect(result.current.register('test@mail.com', '123', 'User', 'recaptcha')).rejects.toThrow(
      'Ошибка регистрации',
    );
    expect(result.current.loading).toBe(false);
  });

  it('успешный logout', async () => {
    (global.fetch as unknown as MockInstance).mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.logout();
    });

    expect(global.fetch).toHaveBeenCalledWith(API_URLS.logout, expect.any(Object));
    expect(setUser).toHaveBeenCalledWith(null);
    expect(refreshData).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Вы успешно вышли из аккаунта');
    expect(result.current.loading).toBe(false);
  });

  it('logout с ошибкой', async () => {
    (global.fetch as unknown as MockInstance).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useAuth());
    await expect(result.current.logout()).rejects.toThrow('fail');
    expect(result.current.loading).toBe(false);
  });
});
