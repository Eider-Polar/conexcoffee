import { create } from 'zustand';

// ============================================
// Store de UI — ConexCoffee
// ============================================
// Estado global de la interfaz de usuario.
// Controla sidebar, modales y preferencias visuales.
// ============================================

const useUIStore = create((set) => ({
  // ============================================
  // Sidebar
  // ============================================
  sidebarOpen: true,

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) =>
    set({ sidebarOpen: open }),

  // ============================================
  // Modal System
  // ============================================
  activeModal: null, // Nombre del modal activo
  modalData: null,   // Datos pasados al modal

  /**
   * Abre un modal con datos opcionales.
   *
   * @param {string} modalName - Identificador del modal ('confirm', 'form', etc.)
   * @param {object} data - Datos para el modal (título, callbacks, etc.)
   *
   * @example
   * openModal('confirm', { title: '¿Eliminar?', onConfirm: () => {} });
   */
  openModal: (modalName, data = null) =>
    set({ activeModal: modalName, modalData: data }),

  /**
   * Cierra el modal activo y limpia los datos.
   */
  closeModal: () =>
    set({ activeModal: null, modalData: null }),
}));

export default useUIStore;
