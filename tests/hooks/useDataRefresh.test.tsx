import { renderHook } from '@testing-library/react';
import { useDataRefresh } from '../../src/hooks/useDataRefresh';
import { useAuthContext } from '../../src/context/AuthContext';
import { vi } from 'vitest';

vi.mock('../../src/context/AuthContext');

describe('useDataRefresh', () => {
  it('возвращает refreshData из useAuthContext', () => {
    const refreshData = vi.fn();
    (useAuthContext as jest.Mock).mockReturnValue({ refreshData });
    const { result } = renderHook(() => useDataRefresh());
    expect(result.current.refreshData).toBe(refreshData);
  });
});
