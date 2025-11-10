/**
 * 表单验证React Hook
 */

import { useState, useCallback } from 'react';
import { validateField, validateAll } from '@/lib/validation-utils';

export const useFormValidation = ({ schema }: { schema: Record<string, Function[]> }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldTouched = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validate = useCallback((data: Record<string, string>) => {
    const newErrors = validateAll(data, schema);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [schema]);

  const validateSingleField = useCallback((name: string, value: string) => {
    const error = validateField(name, value, schema);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
    return error;
  }, [schema]);

  const getFieldError = useCallback((name: string) => {
    return touched[name] ? errors[name] : null;
  }, [touched, errors]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validate,
    setFieldTouched,
    getFieldError,
    validateSingleField,
    clearErrors
  };
};