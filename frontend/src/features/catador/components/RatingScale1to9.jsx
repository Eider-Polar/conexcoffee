import { useState } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// RatingScale1to9 — Círculos numerados (limpio)
// ============================================

export default function RatingScale1to9({ label, value = 6, onChange, className = '' }) {
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <p className="text-xs font-semibold text-surface-700">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {ratings.map((num) => {
          const isSelected = value === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={cn(
                'w-9 h-9 rounded-full text-sm font-bold border-2 transition-all duration-200 cursor-pointer flex items-center justify-center',
                isSelected
                  ? 'bg-primary-600 border-primary-600 text-white shadow-sm scale-110'
                  : 'bg-white border-surface-300 text-surface-600 hover:border-primary-400 hover:text-primary-600'
              )}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}
