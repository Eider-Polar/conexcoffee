import useUIStore from '@/store/useUIStore';

// ============================================
// useModal — Hook para controlar modales desde cualquier componente
// ============================================
// Abstrae el store de UI para facilitar el uso de modales.
//
// Uso:
//   const { openModal, closeModal, isOpen, modalData } = useModal();
//   openModal('confirm', { title: '¿Eliminar?', onConfirm: () => {} });
// ============================================

export default function useModal() {
  const { activeModal, modalData, openModal, closeModal } = useUIStore();

  return {
    activeModal,
    modalData,
    openModal,
    closeModal,
    isOpen: (modalName) => activeModal === modalName,
  };
}
