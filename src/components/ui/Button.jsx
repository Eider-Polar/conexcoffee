// ============================================
// Button — Componente de botón reutilizable
// ============================================
// Variantes: primary, secondary, danger, ghost, outline
// Tamaños: sm, md, lg
// ============================================

const variants = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-terracota focus:ring-brand-orange/40 shadow-sm transition-colors',
  secondary:
    'bg-brand-terracota text-white hover:bg-primary-800 focus:ring-brand-terracota/40 shadow-sm transition-colors',
  danger:
    'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-sm',
  ghost:
    'bg-transparent text-surface-700 hover:bg-surface-100 focus:ring-surface-400',
  outline:
    'border border-surface-300 bg-white text-surface-800 hover:border-brand-orange hover:text-brand-orange focus:ring-brand-orange/30 transition-colors',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
