import { Coffee } from 'lucide-react';

// ============================================
// TazasSelector — Selector de 5 tazas de café
// ============================================

export default function TazasSelector({
  label,
  sublabel,
  selectedCups = [],
  onToggleCup,
  colorScheme = 'amber', // 'amber' para no uniformes, 'red' para defectuosas
}) {
  const cups = [1, 2, 3, 4, 5];

  const activeColor =
    colorScheme === 'red'
      ? 'bg-red-500 text-white border-red-600 shadow-2xs'
      : 'bg-amber-500 text-white border-amber-600 shadow-2xs';

  const badgeColor =
    colorScheme === 'red'
      ? 'text-red-700 bg-red-50 border-red-200'
      : 'text-amber-700 bg-amber-50 border-amber-200';

  return (
    <div className="space-y-2 p-3.5 bg-surface-50 rounded-xl border border-surface-200">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-surface-900 block">{label}</span>
          {sublabel && <span className="text-[11px] text-surface-500">{sublabel}</span>}
        </div>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
          {selectedCups.length} de 5 tazas
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 pt-1">
        {cups.map((cupNumber) => {
          const isSelected = selectedCups.includes(cupNumber);
          return (
            <button
              key={cupNumber}
              type="button"
              onClick={() => onToggleCup(cupNumber)}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? activeColor
                  : 'bg-white text-surface-600 border-surface-200 hover:border-surface-400 hover:bg-surface-100/60'
              }`}
            >
              <Coffee className={`w-5 h-5 mb-1 ${isSelected ? 'text-white' : 'text-surface-400'}`} />
              <span>Taza {cupNumber}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
