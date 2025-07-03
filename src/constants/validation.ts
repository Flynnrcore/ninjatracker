import type { TValidationRule } from '@/types';

// Регулярное выражение для валидации email
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AUTH_FORM_VALIDATION_RULES: TValidationRule[] = [
  {
    field: 'email',
    required: true,
    pattern: EMAIL_REGEX,
    message: 'Пожалуйста, введите корректный email адрес',
  },
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 10,
    message: 'Никнейм должен содержать от 2 до 10 символов',
  },
  {
    field: 'password',
    required: true,
    minLength: 8,
    maxLength: 20,
    custom: (value: unknown) => {
      if (typeof value !== 'string') return false;
      return /[a-zA-Z]/.test(value) && /\d/.test(value);
    },
    message: 'Пароль должен содержать минимум 8 символов, включая буквы и цифры',
  },
];

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
