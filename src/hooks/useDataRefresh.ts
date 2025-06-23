import { useAuthContext } from '@/context/AuthContext';
import type { AuthContextType } from '@/types';

export const useDataRefresh = () => {
  const { refreshData } = useAuthContext() as AuthContextType;
  return { refreshData };
};
