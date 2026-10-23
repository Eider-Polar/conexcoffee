// ============================================
// Badge — Componente de etiqueta reutilizable
// ============================================
// Para mostrar estados, roles, categorías, etc.
// ============================================

const variants = {
  default: 'bg-surface-100 text-surface-700',
  primary: 'bg-primary-100 text-primary-800',
  secondary: 'bg-primary-100 text-brand-terracota',
  accent: 'bg-accent-100 text-accent-800',
  danger: 'bg-danger-50 text-danger-700',
  success: 'bg-primary-100 text-brand-terracota border border-primary-200',
  brand: 'bg-brand-terracota text-white',
  dark: 'bg-black text-white',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
