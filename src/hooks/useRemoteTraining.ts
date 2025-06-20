import { useAuthContext } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { fetchWithRefresh } from '@/lib/fetchWithRefresh';
import type { AuthContextType, TTraining } from '@/types';
import { useState } from 'react';

export const useRemoteTraining = () => {
  const { csrfToken } = useAuthContext() as AuthContextType;
  const [loading, setLoading] = useState(false);

  const getTrainings = async () => {
    setLoading(true);
    const res = await fetchWithRefresh(API_URLS.trainings, {
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken },
    });
    if (!res.ok) throw new Error('Ошибка получения тренировок');
    return await res.json();
  };

  const addTraining = async (training: TTraining) => {
    const res = await fetchWithRefresh(API_URLS.trainings, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify(training),
    });
    if (!res.ok) throw new Error('Ошибка добавления тренировки');
    setLoading(false);
    return await res.json();
  };

  const deleteTraining = async (id: number) => {
    const res = await fetchWithRefresh(`${API_URLS.trainings}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken },
    });
    if (!res.ok) throw new Error('Ошибка удаления тренировки');
    return await res.json();
  };

  const getStatistics = async () => {
    const res = await fetchWithRefresh(API_URLS.statistics, {
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken },
    });
    if (!res.ok) throw new Error('Ошибка получения статистики');
    return await res.json();
  };

  return { getTrainings, addTraining, deleteTraining, getStatistics, loading };
};
