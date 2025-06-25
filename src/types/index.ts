export type TStatistic = {
  alltime: number;
  trainTypes: Record<string, number>;
  totalCount: number;
  avgDuration: number;
  maxDuration: number;
  streak: number;
  difficulties: { timer: number; date: string; difficulty: number }[];
};

export type TTraining = {
  id?: number;
  createdAt?: string;
  userId?: number;
  name: string;
  description: string;
  date: string;
  type: string[];
  difficulty: number;
  instrument: string;
  timer: number;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthContextType = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  csrfToken: string;
  loading: boolean;
  dataRefreshTrigger: number;
  refreshData: () => void;
};

export type TTimerButton = {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export type TTimeInput = {
  id: string;
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
  className?: string;
};

export type TMetronomeState = {
  bpm: number;
  isRunning: boolean;
  beatCount: number;
  beatsPerMeasure: number;
};

export type TMetronomeAction =
  | { type: 'SET_BPM'; payload: number }
  | { type: 'SET_IS_RUNNING'; payload: boolean }
  | { type: 'SET_BEAT_COUNT'; payload: number }
  | { type: 'SET_BEATS_PER_MEASURE'; payload: number };

export type TErrorPage = { picUrl: string; message: string; children?: React.ReactNode };

export type TMenuItem = {
  path: string;
  label: string;
};

export type THeaderProps = {
  className?: string;
};
