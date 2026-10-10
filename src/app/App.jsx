import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/feedback';
import AppProviders from './AppProviders';
import router from './router';

// ============================================
// App — Componente raíz de la aplicación
// ============================================
// Estructura:
// ErrorBoundary → AppProviders → RouterProvider
//
// ErrorBoundary: Captura errores fatales de React.
// AppProviders: Inicializa sesión, toasts y futuros providers.
// RouterProvider: Renderiza el árbol de rutas.
// ============================================

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
}
