import { useAuthContext } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { fetchWithRefresh } from '@/lib/fetchWithRefresh';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { AuthContextType, TTraining } from '@/types';

export const useRemoteTraining = () => {
  const { csrfToken, user, dataRefreshTrigger } = useAuthContext() as AuthContextType;
  const [trainings, setTrainings] = useState<TTraining[]>([]);
  const [loading, setLoading] = useState(true);

  // Получение тренировок
  const getTrainings = useCallback(async () => {
    const res = await fetchWithRefresh(API_URLS.trainings, {
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken },
    });
    if (!res.ok) throw new Error('Ошибка получения тренировок');
    return await res.json();
  }, [csrfToken]);

  // Автоматическое обновление данных при изменении аутентификации
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Если пользователь не авторизован, очищаем данные
        if (!user) {
          setTrainings([]);
          setLoading(false);
          return;
        }

        const data = await getTrainings();
        setTrainings(data);
      } catch (err: unknown) {
        toast.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (csrfToken) fetchData();
  }, [csrfToken, user, dataRefreshTrigger, getTrainings]);

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

  return { 
    trainings, 
    loading, 
    getTrainings, 
    addTraining, 
    deleteTraining, 
    getStatistics,
    setTrainings 
  };
};
