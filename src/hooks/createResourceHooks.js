import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/lib/axios';

// ============================================
// createResourceHooks — Fábrica de hooks de datos
// ============================================
// Convierte un servicio creado con `createResourceApi` en hooks de
// TanStack Query con caché e invalidación automática:
//
//   const { useList, useCreate, useUpdate, useRemove } =
//     createResourceHooks('caficultor-fincas', fincasApi);
//
//   const { data: fincas = [], isLoading, isError } = useList();
//   const crear = useCreate();   crear.mutate(nuevaFinca);
//
// Las pages solo consumen hooks; nunca servicios ni axios.
// ============================================

export function createResourceHooks(resourceKey, resourceApi, { labels = {} } = {}) {
  const keys = {
    all: [resourceKey],
    list: (params) => [resourceKey, 'list', params ?? null],
    detail: (id) => [resourceKey, 'detail', id],
  };

  const messages = {
    created: labels.created ?? 'Registro creado correctamente',
    updated: labels.updated ?? 'Registro actualizado correctamente',
    removed: labels.removed ?? 'Registro eliminado correctamente',
  };

  function useList(params, options = {}) {
    return useQuery({
      queryKey: keys.list(params),
      queryFn: () => resourceApi.list(params),
      ...options,
    });
  }

  function useDetail(id, options = {}) {
    return useQuery({
      queryKey: keys.detail(id),
      queryFn: () => resourceApi.get(id),
      enabled: id != null,
      ...options,
    });
  }

  function useMutationWith(mutationFn, successMessage) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.all });
        if (successMessage) toast.success(successMessage);
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  }

  const useCreate = () => useMutationWith(resourceApi.create, messages.created);
  const useUpdate = () => useMutationWith(resourceApi.update, messages.updated);
  const useRemove = () => useMutationWith(resourceApi.remove, messages.removed);

  return { keys, useList, useDetail, useCreate, useUpdate, useRemove };
}
