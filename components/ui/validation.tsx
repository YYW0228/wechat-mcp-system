/**
 * 验证相关的UI组件
 */

import React from 'react';

// 简单的错误组件
export const SimpleError = ({ error }: { error?: string }) => {
  if (!error) return null;

  return (
    <span className="text-red-500 text-xs mt-1 block">
      {error}
    </span>
  );
};

// 简单的成功组件
export const SimpleSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <span className="text-green-600 text-xs mt-1 block">
      ✓ {message}
    </span>
  );
};

// 验证错误组件
export const ValidationError = ({ error }: { error?: string }) => {
  if (!error) return null;

  return (
    <span className="text-red-500 text-sm mt-1 flex items-center">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {error}
    </span>
  );
};

// 验证成功组件
export const ValidationSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <span className="text-green-600 text-sm mt-1 flex items-center">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </span>
  );
};