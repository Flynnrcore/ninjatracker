import { renderHook, act } from '@testing-library/react';
import { useScrollEffect } from '../../src/hooks/useScrollEffect';
import { vi } from 'vitest';

describe('useScrollEffect', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('возвращает false при скролле меньше порога', () => {
    const { result } = renderHook(() => useScrollEffect({ threshold: 100 }));
    expect(result.current).toBe(false);
  });

  it('возвращает true при скролле больше порога', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useScrollEffect({ threshold: 50, throttleMs: 0 }));
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 60, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    // Ждём выполнения всех таймеров
    await act(async () => {
      vi.runAllTimers();
    });
    expect(result.current).toBe(true);
    vi.useRealTimers();
  });

  it('возвращает false если скролл меньше порога после скролла вниз', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useScrollEffect({ threshold: 30, throttleMs: 0 }));
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 40, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    await act(async () => {
      vi.runAllTimers();
    });
    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 10, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    await act(async () => {
      vi.runAllTimers();
    });
    expect(result.current).toBe(false);
    vi.useRealTimers();
  });

  it('учитывает throttleMs', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useScrollEffect({ threshold: 10, throttleMs: 100 }));
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 20, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false);
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(true);
    vi.useRealTimers();
  });
});
