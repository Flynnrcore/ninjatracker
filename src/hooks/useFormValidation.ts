import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface ValidationRule {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (validationRules: ValidationRule[]) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback(
    (name: string, value: unknown): string | null => {
      const rule = validationRules.find(r => r.field === name);
      if (!rule) return null;

      // Required validation
      if (rule.required && (!value || value === '')) {
        return rule.message;
      }

      // Min length validation
      if (rule.minLength && value && typeof value === 'string' && value.length < rule.minLength) {
        return rule.message;
      }

      // Max length validation
      if (rule.maxLength && value && typeof value === 'string' && value.length > rule.maxLength) {
        return rule.message;
      }

      // Pattern validation
      if (rule.pattern && value && typeof value === 'string' && !rule.pattern.test(value)) {
        return rule.message;
      }

      // Custom validation
      if (rule.custom && !rule.custom(value)) {
        return rule.message;
      }

      return null;
    },
    [validationRules],
  );

  const validateForm = useCallback(
    (formData: FormData): boolean => {
      const newErrors: FormErrors = {};
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
