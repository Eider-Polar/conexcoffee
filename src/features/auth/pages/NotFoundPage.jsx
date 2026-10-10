import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { Home, ArrowLeft, RefreshCw, AlertCircle, Coffee } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

// ============================================
// NotFoundPage — Página de Error 404
// ============================================
// Desplegada ante rutas no existentes o cuando un fallo
// redirige al estado 404. Previene pantallas en blanco.
// ============================================

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col justify-between p-4 sm:p-6">
      {/* Top bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Coffee className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-surface-900">{APP_NAME}</span>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Regresar
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-lg w-full mx-auto my-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-50 text-primary-600 mb-6 border border-primary-100 shadow-sm">
          <AlertCircle className="h-10 w-10" />
        </div>

        <p className="text-sm font-semibold tracking-wider text-primary-600 uppercase mb-2">
          Error 404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 tracking-tight mb-3">
          Página no encontrada
        </h1>
        <p className="text-surface-600 text-base leading-relaxed mb-8">
          La dirección que intentas acceder no existe, ha sido trasladada o ocurrió un error al procesar tu solicitud. No te preocupes, puedes volver al inicio de forma segura.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full">
              <Home className="h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Recargar página
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-surface-400 py-4 border-t border-surface-200/60">
        &copy; {new Date().getFullYear()} {APP_NAME}. Sistema protegido contra contingencias de enrutamiento.
      </footer>
    </div>
  );
}
