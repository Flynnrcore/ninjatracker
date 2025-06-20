import { useAuthContext, type AuthContextType } from '../context/AuthContext';
import { API_URLS } from '../constants/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useUserData = () => {
  const { csrfToken } = useAuthContext() as AuthContextType;
  const [user, setUser] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // fetch user
        const userRes = await fetch(API_URLS.session, {
          credentials: 'include',
          headers: { 'x-csrf-token': csrfToken },
        });
        if (userRes.ok) setUser(await userRes.json());
        // fetch trainings
        const trainRes = await fetch(API_URLS.trainings, {
          credentials: 'include',
          headers: { 'x-csrf-token': csrfToken },
        });
        if (trainRes.ok) setTrainings(await trainRes.json());
        // fetch statistics
        const statRes = await fetch(API_URLS.statistics, {
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
