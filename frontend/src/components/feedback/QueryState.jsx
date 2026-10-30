import { Spinner } from '@/components/ui';
import { AlertCircle } from 'lucide-react';

// ============================================
// QueryState — Estados de carga y error de una consulta
// ============================================
// Uso en una page:
//   if (query.isLoading || query.isError) return <QueryState query={query} />;
// ============================================

export default function QueryState({ query, errorMessage = 'No se pudo cargar la información.' }) {
  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[40vh] text-center">
        <AlertCircle className="h-8 w-8 text-danger-600" />
        <p className="text-sm text-stone-600">{errorMessage}</p>
        <button
          type="button"
          onClick={() => query.refetch()}
          className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return null;
}
