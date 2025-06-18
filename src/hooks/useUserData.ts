import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

type Statistic = {
  alltime: number;
  trainTypes: Record<string, number>;
};

type Training = {
  id: number;
  // ... другие поля тренировки
};

export const useUserData = () => {
  const { token } = useAuth();
  const [statistics, setStatistics] = useState<Statistic>({ alltime: 0, trainTypes: {} });
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setStatistics({ alltime: 0, trainTypes: {} });
      setTrainings([]);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, trainingsRes] = await Promise.all([
          fetch('https://ninjatracker-backend.onrender.com/api/trainings/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://ninjatracker-backend.onrender.com/api/trainings', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const stats = statsRes.ok ? await statsRes.json() : [];
        const trns = trainingsRes.ok ? await trainingsRes.json() : [];
        setStatistics(stats);
        setTrainings(trns);
      } catch {
        setStatistics({ alltime: 0, trainTypes: {} });
        setTrainings([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [token]);

  return { statistics, trainings, loading };
};
