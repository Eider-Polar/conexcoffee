import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

// ============================================
// RouteError — errorElement de React Router
// ============================================
// Captura errores de render/carga (incluidos chunks lazy que fallan al
// descargar) dentro de un grupo de rutas, para no tumbar toda la app.
// El ErrorBoundary global sigue siendo la última red de seguridad.
// ============================================

export default function RouteError() {
  const error = useRouteError();

  const isChunkError =
    error?.name === 'ChunkLoadError' ||
    /dynamically imported module|Failed to fetch/i.test(error?.message || '');

  const title = isRouteErrorResponse(error)
    ? `Error ${error.status}`
    : isChunkError
      ? 'No se pudo cargar esta sección'
      : 'Ha ocurrido un error inesperado';

  console.error('[ConexCoffee RouteError]:', error);

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-surface-200 p-8 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-danger-50 text-danger-600 flex items-center justify-center mx-auto mb-5 border border-danger-100">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-3">{title}</h1>
        <p className="text-surface-600 text-sm leading-relaxed mb-6">
          {isChunkError
            ? 'Revisa tu conexión e intenta recargar la página.'
            : 'Puedes recargar la vista o volver al inicio.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Recargar página
          </Button>
          <Link to="/">
            <Button variant="outline" size="md">
              <Home className="h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
