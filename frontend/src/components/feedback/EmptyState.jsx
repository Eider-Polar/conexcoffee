import { Inbox } from 'lucide-react';

// ============================================
// EmptyState — Estado vacío reutilizable
// ============================================
// Muestra un mensaje cuando una lista o sección no tiene datos.
//
// Uso:
//   <EmptyState
//     title="No hay lotes"
//     description="Crea tu primer lote de café para empezar."
//     action={<Button>Crear Lote</Button>}
//   />
// ============================================

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No hay datos',
  description = 'No se encontraron resultados.',
  action,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-14 h-14 rounded-full bg-surface-100 flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-surface-400" />
      </div>
      <h3 className="text-base font-semibold text-surface-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-surface-500 max-w-sm mb-4">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
