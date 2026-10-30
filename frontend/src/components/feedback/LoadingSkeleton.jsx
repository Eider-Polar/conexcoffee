// ============================================
// LoadingSkeleton — Esqueleto de carga reutilizable
// ============================================
// Muestra un placeholder animado mientras se cargan los datos.
// Más profesional que un simple spinner para listas y tarjetas.
//
// Uso:
//   <LoadingSkeleton lines={3} />
//   <LoadingSkeleton variant="card" count={4} />
// ============================================

function SkeletonLine({ width = '100%' }) {
  return (
    <div
      className="h-4 bg-surface-200 rounded animate-pulse"
      style={{ width }}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-surface-200 p-6 space-y-4">
      <div className="h-5 bg-surface-200 rounded animate-pulse w-2/3" />
      <div className="space-y-2">
        <div className="h-3 bg-surface-200 rounded animate-pulse w-full" />
        <div className="h-3 bg-surface-200 rounded animate-pulse w-4/5" />
      </div>
      <div className="h-8 bg-surface-200 rounded animate-pulse w-1/3" />
    </div>
  );
}

function SkeletonTable({ rows = 5 }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
      {/* Header */}
      <div className="flex gap-4 p-4 border-b border-surface-200 bg-surface-50">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-surface-200 rounded animate-pulse flex-1" />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-surface-100">
          {[...Array(4)].map((_, j) => (
            <div key={j} className="h-4 bg-surface-200 rounded animate-pulse flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function LoadingSkeleton({
  variant = 'lines', // 'lines' | 'card' | 'table'
  lines = 3,
  count = 1,
  className = '',
}) {
  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {[...Array(count)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return <SkeletonTable rows={lines} />;
  }

  // Default: lines
  const widths = ['100%', '90%', '75%', '85%', '60%'];
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <SkeletonLine key={i} width={widths[i % widths.length]} />
      ))}
    </div>
  );
}
