import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { Spinner } from '@/components/ui';

// ============================================
// ProtectedRoute — Rutas que requieren autenticación
// ============================================
// Envuelve rutas que solo pueden ser accedidas por usuarios autenticados.
// Si el usuario NO está autenticado → redirige a /login.
// Mientras se verifica la sesión → muestra un spinner.
// ============================================

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const location = useLocation();

  // Mientras verificamos la sesión, mostrar loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-50">
        <Spinner size="lg" />
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, renderizar las rutas hijas
  return <Outlet />;
}
