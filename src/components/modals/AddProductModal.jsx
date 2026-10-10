import { Link } from 'react-router-dom';
import { Package, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import ModalBase from './ModalBase';
import { APP_NAME } from '@/lib/constants';

// ============================================
// AddProductModal — Modal reusable para publicar café
// ============================================

export default function AddProductModal({ isOpen, onClose }) {
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Publicar Lote de Café"
      size="md"
    >
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4 text-primary-700">
          <Package className="h-7 w-7" />
        </div>
        <h4 className="text-lg font-bold text-surface-900 mb-2">
          Publica tu café en {APP_NAME}
        </h4>
        <p className="text-sm text-surface-600 mb-6 leading-relaxed">
          Para agregar y ofrecer lotes de café en el catálogo general, debes contar con una cuenta
          activa como <strong>Productor</strong> o <strong>Empresa</strong>.
        </p>

        <div className="space-y-3">
          <Link to="/login" onClick={onClose}>
            <Button variant="primary" className="w-full justify-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Iniciar Sesión para Publicar</span>
            </Button>
          </Link>
          <Link to="/register" onClick={onClose}>
            <Button variant="outline" className="w-full justify-center">
              Registrar Finca o Empresa Gratis
            </Button>
          </Link>
          <Link to="/agregar-producto" onClick={onClose} className="block pt-2">
            <span className="text-xs font-semibold text-primary-700 hover:underline inline-flex items-center gap-1">
              <span>Más información sobre publicar productos</span>
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </div>
    </ModalBase>
  );
}
