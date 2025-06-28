import type { TValidationRule, TFormErrors } from '@/types';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useFormValidation = (validationRules: TValidationRule[]) => {
  const [errors, setErrors] = useState<TFormErrors>({});

  const validateField = useCallback(
    (name: string, value: unknown): string | null => {
      const rule = validationRules.find(r => r.field === name);
      if (!rule) return null;

      if (rule.required && (!value || value === '')) {
        return rule.message;
      }

      if (rule.minLength && value && typeof value === 'string' && value.length < rule.minLength) {
        return rule.message;
      }

      if (rule.maxLength && value && typeof value === 'string' && value.length > rule.maxLength) {
        return rule.message;
      }

      if (rule.pattern && value && typeof value === 'string' && !rule.pattern.test(value)) {
        return rule.message;
      }

      if (rule.custom && !rule.custom(value)) {
        return rule.message;
      }

      return null;
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
