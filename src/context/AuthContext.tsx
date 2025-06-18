import { AuthContext, type User } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch('https://ninjatracker-backend.onrender.com/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};
