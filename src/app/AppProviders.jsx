import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/features/auth';

// ============================================
// AppProviders — Wrapper de todos los providers globales
// ============================================
// Centraliza la inicialización de la app:
// - Verifica la sesión del usuario al cargar (via getMe)
// - Monta el sistema de toasts (react-hot-toast)
// - Aquí se añaden futuros providers (ThemeProvider, etc.)
// ============================================

export default function AppProviders({ children }) {
  const { checkSession } = useAuth();

  // Verificar sesión al montar la app
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1c1917',
            color: '#fafaf9',
            borderRadius: '13px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#F25433',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {children}
    </>
  );
}
