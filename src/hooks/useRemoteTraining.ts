import { useAuthContext, type AuthContextType } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { fetchWithRefresh } from '@/lib/fetchWithRefresh';

type Training = {
  name: string;
  description: string;
  date: string;
  difficulty: number;
  instrument: string;
  timer: number;
  type: string[];
};

export const useRemoteTraining = () => {
  const { csrfToken } = useAuthContext() as AuthContextType;

  const getTrainings = async () => {
    const res = await fetchWithRefresh(API_URLS.trainings, {
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken },
    });
    if (!res.ok) throw new Error('Ошибка получения тренировок');
    return await res.json();
  };

  const addTraining = async (training: Training) => {
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

  return { getTrainings, addTraining, deleteTraining, getStatistics };
};
