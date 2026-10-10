import { useState } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// IntensityBar — Barra Segmentada CVA (Estilo 21st.dev)
// ============================================
// - Arriba: Barra segmentada pura (sin números dentro) con micro-animaciones en hover
// - Abajo: Control deslizante con escala numérica e indicador reactivo en tiempo real
// ============================================

export default function IntensityBar({
  label,
  value = 8,
  onChange,
  className = '',
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const segments = 15;

  const getZona = (val) => {
    if (val <= 4)  return { texto: 'Baja'  };
    if (val <= 10) return { texto: 'Media' };
    return           { texto: 'Alta'  };
  };

  const zona = getZona(value);

  const getSegmentStyle = (index) => {
    let scale = 1;
    let translateY = 0;

    if (hoveredIndex !== null) {
      const distance = Math.abs(hoveredIndex - index);
      if (distance === 0) {
        scale = 1.35;
        translateY = -2;
      } else if (distance <= 2) {
        const falloff = Math.cos((distance / 2) * (Math.PI / 2));
        scale = 1 + 0.22 * falloff;
        translateY = -1 * falloff;
      }
    }

    return {
      transform: `scaleY(${scale}) translateY(${translateY}px)`,
    };
  };

  return (
    <div className={cn('space-y-3 p-4 bg-white rounded-xl border border-surface-200 shadow-2xs', className)}>
      {/* Cabecera con Etiqueta y Badge Dinámico */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-surface-800 tracking-wide">
          {label}
        </label>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border transition-all duration-300 font-mono text-primary-700 bg-primary-50 border-primary-300">
          {zona.texto} ({value} / 15)
        </span>
      </div>

      {/* 1. Barra Segmentada Pura (Sin números internos, estilo 21st.dev) */}
      <div
        className="flex items-center gap-[3px] py-1.5 px-1 bg-surface-50 rounded-xl border border-surface-200/70 select-none"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={1}
        aria-valuemax={15}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const segmentNumber = i + 1;
          const isFilled = segmentNumber <= value;
          const isHovered = hoveredIndex === i;

          const colorClass = isFilled ? 'bg-primary-600' : 'bg-surface-200';

          return (
            <div
              key={segmentNumber}
              onClick={() => onChange(segmentNumber)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={getSegmentStyle(i)}
              className={cn(
                'h-3.5 flex-1 rounded-[3px] cursor-pointer origin-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                colorClass,
                isFilled && isHovered && 'brightness-125 shadow-sm',
                !isFilled && isHovered && 'bg-surface-300',
                hoveredIndex !== null && !isFilled && !isHovered && 'bg-surface-200/50'
              )}
              title={`Nivel ${segmentNumber}`}
            />
          );
        })}
      </div>

      {/* 2. Control Deslizante Numérico Inferior */}
      <div className="space-y-1.5 pt-0.5">
        <input
          type="range"
          min="1"
          max="15"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-surface-200 rounded-full appearance-none cursor-pointer
            accent-primary-600
            transition-all duration-200
            focus:outline-none focus:ring-1 focus:ring-primary-500"
        />

        {/* 3. Escala Numérica Interactiva debajo del deslizador */}
        <div className="flex justify-between items-center text-[10px] text-surface-500 font-mono select-none px-0.5">
          {Array.from({ length: 15 }).map((_, i) => {
            const num = i + 1;
            const isCurrent = num === value;
            const isKeyPoint = num === 1 || num === 5 || num === 8 || num === 10 || num === 15;

            return (
              <button
                key={num}
                type="button"
                onClick={() => onChange(num)}
                className={cn(
                  'transition-all duration-200 cursor-pointer rounded px-0.5',
                  isCurrent
                    ? 'font-bold text-xs text-primary-600 scale-125 underline'
                    : isKeyPoint
                    ? 'font-semibold text-surface-600'
                    : 'text-surface-400 opacity-60 hover:opacity-100'
                )}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Guía de Zonas CVA */}
        <div className="flex justify-between items-center text-[10px] text-surface-400 font-medium pt-1 border-t border-surface-100">
          <span className={cn(value <= 4 ? 'font-bold text-primary-700' : '')}>
            Baja (1 – 4)
          </span>
          <span className={cn(value >= 5 && value <= 10 ? 'font-bold text-primary-700' : '')}>
            Media (5 – 10)
          </span>
          <span className={cn(value >= 11 ? 'font-bold text-primary-700' : '')}>
            Alta (11 – 15)
          </span>
        </div>
      </div>
    </div>
  );
}
