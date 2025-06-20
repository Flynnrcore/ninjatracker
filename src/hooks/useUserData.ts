import { useAuthContext, type AuthContextType } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchWithRefresh } from '@/lib/fetchWithRefresh';

type TStatistic = {
  alltime: number;
  trainTypes: Record<string, number>;
  totalCount: number;
  avgDuration: number;
  maxDuration: number;
  maxStreak: number;
};

export const useUserData = () => {
  const { csrfToken } = useAuthContext() as AuthContextType;
  const [user, setUser] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [statistics, setStatistics] = useState<TStatistic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // получение пользователя
        const userRes = await fetchWithRefresh(API_URLS.session, {
          credentials: 'include',
          headers: { 'x-csrf-token': csrfToken },
        });
        if (userRes.ok) setUser(await userRes.json());
        // получение тренировок
        const trainRes = await fetchWithRefresh(API_URLS.trainings, {
          credentials: 'include',
          headers: { 'x-csrf-token': csrfToken },
        });
        if (trainRes.ok) setTrainings(await trainRes.json());
        // получение статистики
        const statRes = await fetchWithRefresh(API_URLS.statistics, {
          credentials: 'include',
          headers: { 'x-csrf-token': csrfToken },
        });
        if (statRes.ok) setStatistics(await statRes.json());
      } catch (e: unknown) {
        toast.error(e instanceof Error ? e.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };
    if (csrfToken) fetchData();
  }, [csrfToken]);

  return { user, trainings, statistics, loading };
};
