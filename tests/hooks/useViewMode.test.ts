import { renderHook, act } from '@testing-library/react';
import { useViewMode } from '../../src/hooks/useViewMode';

describe('Тест хука useViewMode', () => {
  it('смена режима отображения', () => {
    const { result } = renderHook(() => useViewMode());
    expect(result.current.viewMode).toBe('table');
    act(() => result.current.setViewMode('cards'));
    expect(result.current.viewMode).toBe('cards');
  });
});
