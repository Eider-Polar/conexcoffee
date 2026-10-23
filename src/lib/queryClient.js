import { QueryClient } from '@tanstack/react-query';

// ============================================
// QueryClient — Estado de servidor (TanStack Query)
// ============================================
// Zustand = estado de cliente (sesión, UI).
// TanStack Query = estado de servidor (listas, detalle, caché, refetch).
// NUNCA duplicar datos del servidor dentro de Zustand ni en useState.
// ============================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // No reintentar errores de cliente (4xx): son deterministas
        const status = error?.response?.status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
    },
  },
});

export default queryClient;
