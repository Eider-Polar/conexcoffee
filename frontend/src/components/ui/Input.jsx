import { forwardRef } from 'react';

// ============================================
// Input — Componente de input reutilizable
// ============================================
// Incluye label, error message, y estados visuales.
// Compatible con react-hook-form via forwardRef.
// ============================================

const Input = forwardRef(function Input(
  {
    label,
    error,
    type = 'text',
    placeholder,
    className = '',
    id,
    required = false,
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-surface-700 mb-1.5"
        >
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-3.5 py-2.5 
          bg-white border rounded-lg
          text-surface-900 text-sm
          placeholder:text-surface-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:bg-surface-100 disabled:cursor-not-allowed
          ${
            error
              ? 'border-danger-500 focus:ring-danger-500/30 focus:border-danger-500'
              : 'border-surface-300 focus:ring-primary-500/30 focus:border-primary-500'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
});

export default Input;
