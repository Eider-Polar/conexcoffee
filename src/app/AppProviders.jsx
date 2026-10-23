import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';
import useAuth from '@/features/auth/hooks/useAuth';
import useAuthStore from '@/store/useAuthStore';
import { setUnauthorizedHandler } from '@/lib/axios';
import { startKeepAliveRobot } from '@/lib/keepAliveBot';

// Registrar el callback de 401 en Axios (Inversión de dependencias)
setUnauthorizedHandler(() => {
  useAuthStore.getState().clearAuth();
});

// ============================================
// AppProviders — Wrapper de todos los providers globales
// ============================================
// Centraliza la inicialización de la app:
// - Verifica la sesión del usuario al cargar (via getMe)
// - Monta el sistema de toasts (react-hot-toast)
// - Activa el robot keep-alive para mantener despierto el backend/Vercel
// ============================================

export default function AppProviders({ children }) {
  const { checkSession } = useAuth();

  // Verificar sesión y activar robot de ping periódico
  useEffect(() => {
    checkSession();
    const cleanupRobot = startKeepAliveRobot();
    return () => cleanupRobot?.();
  }, [checkSession]);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
