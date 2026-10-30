import ModalBase from './ModalBase';
import { Button } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

// ============================================
// ConfirmModal — Modal de confirmación reutilizable
// ============================================
// Para acciones destructivas o que requieren confirmación.
//
// Uso:
//   <ConfirmModal
//     isOpen={isOpen}
//     onClose={() => setIsOpen(false)}
//     onConfirm={() => deleteItem(id)}
//     title="¿Eliminar usuario?"
//     description="Esta acción no se puede deshacer."
//     confirmText="Eliminar"
//     variant="danger"
//   />
// ============================================

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  description = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger', // 'danger' | 'primary'
  loading = false,
}) {
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center py-2">
        {/* Icon */}
        <div
          className={`
            mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4
            ${variant === 'danger' ? 'bg-danger-50' : 'bg-primary-50'}
          `}
        >
          <AlertTriangle
            className={`h-6 w-6 ${variant === 'danger' ? 'text-danger-600' : 'text-primary-600'}`}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-surface-900 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-surface-500 mb-6">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
