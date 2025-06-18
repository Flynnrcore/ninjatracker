import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export type Training = {
  id: number | string;
  name: string;
  description?: string;
  date: string;
  type: string[];
  difficulty: number;
  instrument: string;
  timer: number;
};

export const useRemoteTrainings = () => {
  const { token } = useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setTrainings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch('https://ninjatracker-backend.onrender.com/api/trainings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setTrainings(data);
        setLoading(false);
      })
      .catch(() => {
        setTrainings([]);
        setLoading(false);
      });
  }, [token]);

  return { trainings, loading, setTrainings };
};
