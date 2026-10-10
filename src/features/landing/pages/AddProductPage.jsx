import { useNavigate } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Coffee,
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import useAuthStore from '@/store/useAuthStore';

// ============================================
// AddProductPage — Información & Publicación de Lote
// ============================================

export default function AddProductPage() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuthStore();

  const handlePublishClick = () => {
    if (isAuthenticated) {
      if (role === 'productor') {
        navigate('/productor/dashboard');
      } else if (role === 'empresa') {
        navigate('/empresa/dashboard');
      } else {
        navigate(`/${role}/dashboard`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-surface-50 text-surface-900">
      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-surface-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-primary-700 font-bold text-xs uppercase tracking-wider mb-3">
            <Package className="h-4 w-4" />
            <span>Oferta Directa al Mercado</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-surface-900 tracking-tight mb-4">
            Publica y Vende tu Café de Especialidad
          </h1>
          <p className="text-surface-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Conecta tus lotes con compradores verificados de todo el mundo, recibe ofertas directas y asegura pagos transparentes con respaldo contractual.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={handlePublishClick}
            className="gap-2 shadow-md"
          >
            <UploadCloud className="h-5 w-5" />
            <span>{isAuthenticated ? 'Ir al Módulo de Registro de Lotes' : 'Iniciar Sesión para Publicar'}</span>
          </Button>
        </div>
      </section>

      {/* Pasos y Requisitos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4 text-primary-700">
              <FileCheck className="h-6 w-6" />
            </div>
            <h2 className="text-base font-bold text-surface-900 mb-2">1. Ficha Técnica</h2>
            <p className="text-xs text-surface-600 leading-relaxed">
              Registra altitud, variedad botánica, proceso de beneficio (lavado, honey, natural) y humedad del lote.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#fee8e3] flex items-center justify-center mx-auto mb-4 text-[#AD2E01]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-base font-bold text-surface-900 mb-2">2. Validación Sensorial</h2>
            <p className="text-xs text-surface-600 leading-relaxed">
              Ingresa el reporte de catación o envía una muestra a los laboratorios aliados para certificar el puntaje SCA.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-4 text-accent-700">
              <Coffee className="h-6 w-6" />
            </div>
            <h2 className="text-base font-bold text-surface-900 mb-2">3. Negociación Directa</h2>
            <p className="text-xs text-surface-600 leading-relaxed">
              Recibe órdenes de compra, negocia volúmenes y asegura el despacho con trazabilidad digital.
            </p>
          </Card>
        </div>

        {/* Requisitos */}
        <div className="bg-white p-8 sm:p-10 rounded-xl border border-surface-200">
          <h2 className="text-xl font-bold text-surface-900 mb-4">Requisitos para Vendedores</h2>
          <div className="space-y-3 text-sm text-surface-600">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#AD2E01] shrink-0" />
              <span>Tener cuenta verificada como Productor o Empresa en ConexCoffee.</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#AD2E01] shrink-0" />
              <span>Contar con registro de origen o predio cafetero georreferenciado.</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#AD2E01] shrink-0" />
              <span>Disponer de lotes mínimos negociables (desde microlotes de 5 sacos hasta contenedores).</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
