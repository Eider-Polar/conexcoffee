import ModalBase from './ModalBase';
import { Button } from '@/components/ui';

// ============================================
// FormModal — Modal con formulario reutilizable
// ============================================
// Para crear/editar recursos dentro de un modal.
//
// Uso:
//   <FormModal
//     isOpen={isOpen}
//     onClose={() => setIsOpen(false)}
//     onSubmit={handleSubmit}
//     title="Crear Lote"
//     submitText="Guardar"
//   >
//     <Input label="Nombre" ... />
//     <Input label="Cantidad" ... />
//   </FormModal>
// ============================================

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
  loading = false,
  size = 'md',
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title} size={size}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields passed as children */}
        {children}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {submitText}
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
