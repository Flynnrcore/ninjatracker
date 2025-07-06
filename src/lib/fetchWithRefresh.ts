import { API_URLS } from '@/constants/api';

export const fetchWithRefresh = async (input: RequestInfo, init?: RequestInit) => {
  let response = await fetch(input, { ...init, credentials: 'include' });

  if (response.status === 401) {
    const refreshResponse = await fetch(API_URLS.refresh, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      response = await fetch(input, { ...init, credentials: 'include' });
    } else {
      const errMockText = 'Ваша сессия истекла. Пожалуйста, обновите страницу и войдите снова';
      const errorData = await response.json().catch(() => ({ error: errMockText }));
      throw new Error(errorData.error || errMockText);
    }
  }

  return response;
};
