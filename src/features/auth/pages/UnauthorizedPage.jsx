import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ShieldX } from 'lucide-react';

// ============================================
// UnauthorizedPage — Página 403
// ============================================

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-danger-50 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="h-10 w-10 text-danger-500" />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-2">
          Acceso no autorizado
        </h1>
        <p className="text-surface-500 mb-8 max-w-md">
          No tienes permisos para acceder a esta sección.
        </p>
        <Link to="/">
          <Button variant="primary">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
