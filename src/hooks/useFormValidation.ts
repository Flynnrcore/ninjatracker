import type { TValidationRule, TFormErrors } from '@/types';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

type ValidationResult = {
  isValid: boolean;
  error: string | null;
};

// Функция для проверки обязательного поля
const validateRequired = (value: unknown, rule: TValidationRule): ValidationResult => {
  if (rule.required && (!value || value === '')) {
    return { isValid: false, error: rule.message };
  }
  return { isValid: true, error: null };
};

// Функция для проверки длины строки
const validateStringLength = (value: unknown, rule: TValidationRule): ValidationResult => {
  if (typeof value !== 'string') {
    return { isValid: true, error: null };
  }

  const hasMinLengthError = rule.minLength && value.length < rule.minLength;
  const hasMaxLengthError = rule.maxLength && value.length > rule.maxLength;

  if (hasMinLengthError || hasMaxLengthError) {
    return { isValid: false, error: rule.message };
  }

  return { isValid: true, error: null };
};

// Функция для проверки паттерна
const validatePattern = (value: unknown, rule: TValidationRule): ValidationResult => {
  if (typeof value !== 'string' || !rule.pattern) {
    return { isValid: true, error: null };
  }

  if (!rule.pattern.test(value)) {
    return { isValid: false, error: rule.message };
  }

  return { isValid: true, error: null };
};

// Функция для проверки кастомного правила
const validateCustom = (value: unknown, rule: TValidationRule): ValidationResult => {
  if (!rule.custom) {
    return { isValid: true, error: null };
  }

  if (!rule.custom(value)) {
    return { isValid: false, error: rule.message };
  }

  return { isValid: true, error: null };
};

export const useFormValidation = (validationRules: TValidationRule[]) => {
  const [errors, setErrors] = useState<TFormErrors>({});

  const validateField = useCallback(
    (name: string, value: unknown): string | null => {
      const rule = validationRules.find(r => r.field === name);
      if (!rule) return null;

      let errorMessage: string | null = null;

      const requiredValidation = validateRequired(value, rule);
      if (!requiredValidation.isValid) {
        errorMessage = requiredValidation.error;
      }

      const lengthValidation = validateStringLength(value, rule);
      if (!lengthValidation.isValid) {
        errorMessage = lengthValidation.error;
      }

      const patternValidation = validatePattern(value, rule);
      if (!patternValidation.isValid) {
        errorMessage = patternValidation.error;
      }

      const customValidation = validateCustom(value, rule);
      if (!customValidation.isValid) {
        errorMessage = customValidation.error;
      }

      return errorMessage;
    },
    [validationRules],
  );

  const validateForm = useCallback(
    (formData: FormData): boolean => {
      const newErrors: TFormErrors = {};
      let isValid = true;

      validationRules.forEach(rule => {
        const value = formData.get(rule.field);
        const error = validateField(rule.field, value);

        if (error) {
          newErrors[rule.field] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [validationRules, validateField],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const showError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  return {
    errors,
    validateForm,
    validateField,
    clearErrors,
    showError,
  };
};
