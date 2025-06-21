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
      throw new Error('Ваша сессия истекла. Пожалуйста, войдите снова');
    }
  }

  return response;
};
