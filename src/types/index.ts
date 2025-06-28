// Пользователь и авторизация
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

export type TAuthForm = {
  mode: 'login' | 'register';
  className?: string;
  loader?: boolean;
};

export type TAuthFormFields = {
  isRegister: boolean;
  form: { email: string; name: string; password: string };
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: TFormErrors;
};

// Тренировки и статистика
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

export type TStatistic = {
  alltime: number;
  trainTypes: Record<string, number>;
  totalCount: number;
  avgDuration: number;
  maxDuration: number;
  streak: number;
  difficulties: { timer: number; date: string; difficulty: number }[];
};

// Компоненты UI
export type TTimerButton = {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
  className?: string;
  tooltip?: string;
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

export type TMenuItem = {
  path: string;
  label: string;
};

export type THeaderProps = {
  className?: string;
};

export type TErrorPage = { picUrl: string; message: string; children?: React.ReactNode };

// Метроном
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

// Формы и валидация
export type TValidationRule = {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
  message: string;
};

export type TFormErrors = {
  [key: string]: string;
};

// Хук и утилиты
export type TUseScrollEffectOptions = {
  threshold?: number;
  throttleMs?: number;
};

// Страницы и виды
export type TViewModeToggle = {
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
};

export type TTrainingTypeTags = {
  types: string[];
  className?: string;
};

export type TTrainingTable = {
  trainings: TTraining[];
  onDeleteTraining: (id: number | string) => void;
};

export type TTrainingFilters = {
  selectedInstrument: string;
  selectedType: string;
  onInstrumentChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

export type TTrainingDifficultyStars = {
  difficulty: number;
  maxLevel?: number;
  size?: number;
};

export type TTrainingCards = {
  trainings: TTraining[];
  onDeleteTraining: (id: number | string) => void;
};
