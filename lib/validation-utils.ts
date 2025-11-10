/**
 * 验证工具函数
 */

// 简单的验证函数
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateTitle = (title: string): string | null => {
  if (!title.trim()) return '标题不能为空';
  if (title.length < 2) return '标题至少需要2个字符';
  if (title.length > 100) return '标题不能超过100个字符';
  return null;
};

export const validateContent = (content: string): string | null => {
  if (!content.trim()) return '内容不能为空';
  if (content.length < 10) return '内容至少需要10个字符';
  return null;
};

export const validateExcelFile = (file: File): string | null => {
  if (!file) return '请选择文件';

  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ];

  const validExtensions = ['.xlsx', '.xls', '.csv'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

  if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
    return '请选择有效的Excel文件 (.xlsx, .xls, .csv)';
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return '文件大小不能超过10MB';
  }

  return null;
};

// 验证规则
export const ValidationRules = {
  required: (message: string) => (value: string) => {
    return value && value.trim() ? null : message;
  },

  url: (message: string) => (value: string) => {
    if (!value || !value.trim()) return null;
    return validateUrl(value) ? null : message;
  },

  minLength: (min: number, message: string) => (value: string) => {
    if (!value || !value.trim()) return null;
    return value.length >= min ? null : message;
  },

  maxLength: (max: number, message: string) => (value: string) => {
    if (!value || !value.trim()) return null;
    return value.length <= max ? null : message;
  }
};

// 表单验证工具函数
export const validateField = (name: string, value: string, schema: Record<string, Function[]>) => {
  const validators = schema[name] || [];
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

export const validateAll = (data: Record<string, string>, schema: Record<string, Function[]>) => {
  const newErrors: Record<string, string> = {};
  Object.keys(schema).forEach(name => {
    const error = validateField(name, data[name] || '', schema);
    if (error) {
      newErrors[name] = error;
    }
  });
  return newErrors;
};