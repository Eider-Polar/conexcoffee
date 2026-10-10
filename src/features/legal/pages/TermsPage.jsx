import { Link } from 'react-router-dom';
import { APP_NAME } from '@/lib/constants';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui';

// ============================================
// TermsPage — Términos y Condiciones
// ============================================

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="bg-white border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-xl">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">
                Términos y Condiciones
              </h1>
              <p className="text-sm text-surface-500">
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-surface-200 p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">1. Aceptación de los Términos</h2>
            <p className="text-surface-600 leading-relaxed">
              Al acceder y utilizar la plataforma {APP_NAME}, usted acepta estar sujeto a estos Términos y Condiciones de uso.
              Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.
              El uso continuado de la plataforma constituye la aceptación de estos términos y cualquier modificación futura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">2. Descripción del Servicio</h2>
            <p className="text-surface-600 leading-relaxed">
              {APP_NAME} es una plataforma digital que facilita la conexión entre productores de café, empresas,
              brokers y compradores. Nuestro servicio incluye, pero no se limita a: gestión de lotes de café,
              negociaciones comerciales, procesamiento de pagos y seguimiento de pedidos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">3. Registro y Cuentas de Usuario</h2>
            <p className="text-surface-600 leading-relaxed">
              Para utilizar nuestros servicios, debe crear una cuenta proporcionando información precisa y completa.
              Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las
              actividades que ocurran bajo su cuenta. Debe notificar inmediatamente cualquier uso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">4. Roles y Permisos</h2>
            <p className="text-surface-600 leading-relaxed">
              La plataforma opera con diferentes roles (SuperAdmin, Empresa, Broker, Productor, Comprador),
              cada uno con permisos y responsabilidades específicas. El acceso a las funcionalidades está
              determinado por el rol asignado durante el registro o por el administrador de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">5. Transacciones y Pagos</h2>
            <p className="text-surface-600 leading-relaxed">
              Todas las transacciones realizadas a través de {APP_NAME} están sujetas a verificación.
              Los pagos se procesan a través de pasarelas de pago seguras. {APP_NAME} no almacena
              información de tarjetas de crédito ni datos financieros sensibles en sus servidores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">6. Propiedad Intelectual</h2>
            <p className="text-surface-600 leading-relaxed">
              Todo el contenido de la plataforma, incluyendo pero no limitado a logos, textos, gráficos,
              imágenes, software y código fuente, es propiedad de {APP_NAME} o de sus licenciantes y está
              protegido por las leyes de propiedad intelectual aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">7. Limitación de Responsabilidad</h2>
            <p className="text-surface-600 leading-relaxed">
              {APP_NAME} no será responsable de daños directos, indirectos, incidentales, especiales o
              consecuentes que resulten del uso o la imposibilidad de uso de la plataforma. Esto incluye,
              sin limitación, pérdidas de datos, beneficios o interrupciones del negocio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">8. Modificaciones</h2>
            <p className="text-surface-600 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones
              entrarán en vigor inmediatamente después de su publicación en la plataforma. Es su responsabilidad
              revisar periódicamente estos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">9. Contacto</h2>
            <p className="text-surface-600 leading-relaxed">
              Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de los
              canales de soporte disponibles en la plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
