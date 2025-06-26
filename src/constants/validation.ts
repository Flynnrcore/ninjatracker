import type { TValidationRule } from '@/types';

export const TRAINING_FORM_VALIDATION_RULES: TValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: 1,
    maxLength: 50,
    message: 'Пожалуйста, введите название тренировки',
  },
  {
    field: 'instrument',
    required: true,
    message: 'Пожалуйста, выберите инструмент',
  },
  {
    field: 'type',
    required: true,
    custom: (value: unknown) => {
      if (typeof value !== 'string') return false;
      const types = value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      return types.length > 0;
    },
    message: 'Пожалуйста, выберите тип тренировки',
  },
  {
    field: 'description',
    maxLength: 100,
    message: 'Описание не должно превышать 100 символов',
  },
];

export const FORM_CONSTRAINTS = {
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 100,
  MAX_DIFFICULTY: 5,
  MIN_DIFFICULTY: 1,
  MAX_TIMER_HOURS: 24,
  MAX_TIMER_MINUTES: 59,
  MAX_TIMER_SECONDS: 59,
} as const;
