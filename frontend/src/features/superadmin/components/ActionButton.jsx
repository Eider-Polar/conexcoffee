import { useRef } from 'react';
import { animate } from 'animejs';

const VARIANT_STYLES = {
  primary:
    'text-surface-600 hover:text-brand-terracota hover:border-brand-terracota/30 hover:bg-brand-tint',
  view:
    'text-surface-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50',
  success:
    'text-surface-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50',
  warning:
    'text-surface-600 hover:text-brand-orange hover:border-brand-orange/30 hover:bg-brand-tint-soft',
};

/**
 * ActionButton — Botón de acción estandarizado para tablas del SuperAdmin.
 * Utiliza bordes y contenedor idénticos al módulo de Empresa con micro-animaciones en anime.js.
 */
export default function ActionButton({
  icon: Icon,
  title,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    if (disabled || !buttonRef.current) return;
    animate(buttonRef.current, {
      scale: 1.12,
      translateY: -1,
      duration: 180,
      ease: 'outCubic',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    animate(buttonRef.current, {
      scale: 1,
      translateY: 0,
      duration: 180,
      ease: 'outCubic',
    });
  };

  const handleMouseDown = () => {
    if (disabled || !buttonRef.current) return;
    animate(buttonRef.current, {
      scale: 0.92,
      duration: 90,
      ease: 'outQuad',
    });
  };

  const handleMouseUp = () => {
    if (disabled || !buttonRef.current) return;
    animate(buttonRef.current, {
      scale: 1.12,
      duration: 110,
      ease: 'outCubic',
    });
  };

  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      title={title}
      aria-label={title}
      disabled={disabled}
      className={`p-1.5 rounded-lg border border-surface-200 bg-white transition-colors cursor-pointer shadow-2xs inline-flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed ${variantClass} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
    </button>
  );
}
