// ============================================
// Card — Componente de tarjeta reutilizable
// ============================================

export default function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        bg-white rounded-xl border border-surface-200
        shadow-sm
        ${hover ? 'hover:shadow-md hover:border-surface-300 transition-all duration-200' : ''}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
