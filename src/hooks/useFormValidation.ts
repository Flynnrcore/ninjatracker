import type { TValidationRule, TFormErrors } from '@/types';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useFormValidation = (validationRules: TValidationRule[]) => {
  const [errors, setErrors] = useState<TFormErrors>({});

  const validateField = useCallback(
    (name: string, value: unknown): string | null => {
      const rule = validationRules.find(r => r.field === name);
      if (!rule) return null;

      let errorMessage: string | null = null;

      if (rule.required && (!value || value === '')) {
        errorMessage = rule.message;
      }

      if (!errorMessage && typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errorMessage = rule.message;
        } else if (rule.maxLength && value.length > rule.maxLength) {
          errorMessage = rule.message;
        }
      }

      if (!errorMessage && rule.pattern && value && typeof value === 'string' && !rule.pattern.test(value)) {
        errorMessage = rule.message;
      }

      if (!errorMessage && rule.custom && !rule.custom(value)) {
        errorMessage = rule.message;
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
