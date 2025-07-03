import { vi } from 'vitest';
import { fetchWithRefresh } from '../../src/lib/fetchWithRefresh';
import { API_URLS } from '../../src/constants/api';
import { createMockResponse } from '../testUtils/mockGlobalFetch';

describe('fetchWithRefresh', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('возвращает ответ, если статус не 401', async () => {
    const mockResponse = createMockResponse({ status: 200, ok: true, json: async () => ({ data: 123 }) });
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse);

    const response = await fetchWithRefresh('/api/test');
    expect(response).toBe(mockResponse);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/test', { credentials: 'include' });
  });

  it('делает refresh и повторный fetch при 401, если refresh успешен', async () => {
    const firstResponse = createMockResponse({ status: 401, ok: false });
    const refreshResponse = createMockResponse({ ok: true });
    const secondResponse = createMockResponse({ status: 200, ok: true, json: async () => ({ data: 456 }) });

    const fetchMock = vi
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(firstResponse) // первый запрос — 401
      .mockResolvedValueOnce(refreshResponse) // refresh — ok
      .mockResolvedValueOnce(secondResponse); // повторный запрос

    const response = await fetchWithRefresh('/api/test');
    expect(response).toBe(secondResponse);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/test', { credentials: 'include' });
    expect(fetchMock).toHaveBeenNthCalledWith(2, API_URLS.refresh, { method: 'POST', credentials: 'include' });
    expect(fetchMock).toHaveBeenNthCalledWith(3, '/api/test', { credentials: 'include' });
  });

  it('выбрасывает ошибку, если refresh неуспешен', async () => {
    const firstResponse = createMockResponse({ status: 401, ok: false });
    const refreshResponse = createMockResponse({ ok: false });

    const fetchMock = vi
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(firstResponse)
      .mockResolvedValueOnce(refreshResponse);

    await expect(fetchWithRefresh('/api/test')).rejects.toThrow('Ваша сессия истекла. Пожалуйста, войдите снова');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/test', { credentials: 'include' });
    expect(fetchMock).toHaveBeenNthCalledWith(2, API_URLS.refresh, { method: 'POST', credentials: 'include' });
  });
});
