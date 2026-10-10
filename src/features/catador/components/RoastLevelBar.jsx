import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

// ============================================
// RoastLevelBar — Selector Segmentado de Tueste (21st.dev)
// ============================================
// 6 Niveles de tueste con física interactiva y paleta tostada:
// 1. Muy Claro (Canela / Light Cinnamon)
// 2. Claro (New England)
// 3. Medio-Claro (American)
// 4. Medio (City Roast)
// 5. Medio-Oscuro (Full City)
// 6. Oscuro (French / Dark)
// ============================================

const ROAST_LEVELS = [
  { level: 1, label: 'Muy Claro', code: 'Canela', color: 'bg-[#C89D7C]', border: 'border-[#B08564]' },
  { level: 2, label: 'Claro', code: 'Light', color: 'bg-[#B07D54]', border: 'border-[#99653D]' },
  { level: 3, label: 'Medio-Claro', code: 'American', color: 'bg-[#986036]', border: 'border-[#7E4922]' },
  { level: 4, label: 'Medio', code: 'City', color: 'bg-[#7E461E]', border: 'border-[#663513]' },
  { level: 5, label: 'Medio-Oscuro', code: 'Full City', color: 'bg-[#5C2F10]', border: 'border-[#452009]' },
  { level: 6, label: 'Oscuro', code: 'Dark', color: 'bg-[#361706]', border: 'border-[#220B02]' },
];

export default function RoastLevelBar({
  value = 3,
  onChange,
  className = '',
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const currentRoast = ROAST_LEVELS.find((r) => r.level === value) || ROAST_LEVELS[2];

  const getSegmentStyle = (index) => {
    let scale = 1;
    let translateY = 0;

    if (hoveredIndex !== null) {
      const distance = Math.abs(hoveredIndex - index);
      if (distance === 0) {
        scale = 1.15;
        translateY = -2;
      } else if (distance <= 1) {
        scale = 1.06;
        translateY = -1;
      }
    }

    return {
      transform: `scaleY(${scale}) translateY(${translateY}px)`,
    };
  };

  return (
    <div className={cn('space-y-3 p-3.5 bg-white rounded-xl border border-surface-200 shadow-2xs', className)}>
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-surface-800 tracking-wide flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-primary-600" />
          Nivel de Tueste de la Muestra (1 a 6):
        </label>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1">
          Nivel {currentRoast.level}: {currentRoast.label}
        </span>
      </div>

      {/* 6 Bloques Segmentados Interactivos */}
      <div className="grid grid-cols-6 gap-2 pt-1 select-none">
        {ROAST_LEVELS.map((roast, index) => {
          const isSelected = roast.level === value;
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={roast.level}
              type="button"
              onClick={() => onChange(roast.level)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={getSegmentStyle(index)}
              className={cn(
                'group relative flex flex-col items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer text-center',
                isSelected
                  ? 'ring-2 ring-primary-500 ring-offset-1 shadow-md bg-surface-50 border-primary-400'
                  : 'bg-white border-surface-200 hover:border-surface-300'
              )}
            >
              {/* Pastilla de color del tueste */}
              <div
                className={cn(
                  'w-full h-4 rounded-md mb-2 transition-transform shadow-2xs',
                  roast.color,
                  isSelected && 'scale-105 shadow-sm'
                )}
              />

              {/* Nivel y Nombre */}
              <span className="text-xs font-mono font-extrabold text-surface-900 block">
                {roast.level}
              </span>
              <span className="text-[10px] font-semibold text-surface-600 mt-0.5 leading-tight line-clamp-1">
                {roast.label}
              </span>
              <span className="text-[9px] text-surface-400 font-mono mt-0.5">
                {roast.code}
              </span>

              {/* Indicador activo */}
              {isSelected && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
