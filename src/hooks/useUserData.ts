import { useAuthContext } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchWithRefresh } from '@/lib/fetchWithRefresh';
import type { AuthContextType, TStatistic } from '@/types';

export const useUserData = () => {
  const { csrfToken, user, dataRefreshTrigger } = useAuthContext() as AuthContextType;
  const [statistics, setStatistics] = useState<TStatistic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Если пользователь не авторизован, очищаем данные
        if (!user) {
          setStatistics(null);
          setLoading(false);
          return;
        }

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
  }, [csrfToken, user, dataRefreshTrigger]);

  return { statistics, loading };
};
