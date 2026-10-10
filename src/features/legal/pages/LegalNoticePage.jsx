import { Link } from 'react-router-dom';
import { APP_NAME } from '@/lib/constants';
import { ArrowLeft, Scale } from 'lucide-react';
import { Button } from '@/components/ui';

// ============================================
// LegalNoticePage — Aviso Legal
// ============================================

export default function LegalNoticePage() {
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
            <div className="p-2 bg-accent-50 rounded-xl">
              <Scale className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">
                Aviso Legal
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
            <h2 className="text-xl font-semibold text-surface-900 mb-3">1. Información General</h2>
            <p className="text-surface-600 leading-relaxed">
              En cumplimiento de la normativa vigente sobre servicios de la sociedad de la información,
              se pone a disposición del usuario la siguiente información sobre el titular de esta plataforma:
            </p>
            <div className="mt-4 bg-surface-50 rounded-xl p-4 space-y-2">
              <p className="text-sm text-surface-700"><span className="font-medium">Plataforma:</span> {APP_NAME}</p>
              <p className="text-sm text-surface-700"><span className="font-medium">Actividad:</span> Plataforma digital de comercio de café</p>
              <p className="text-sm text-surface-700"><span className="font-medium">Contacto:</span> Disponible a través de los canales de la plataforma</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">2. Objeto</h2>
            <p className="text-surface-600 leading-relaxed">
              El presente aviso legal regula el uso del sitio web y la plataforma {APP_NAME}, que pone a
              disposición de los usuarios herramientas para facilitar el comercio de café entre productores,
              empresas, brokers y compradores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">3. Condiciones de Acceso</h2>
            <p className="text-surface-600 leading-relaxed">
              El acceso a la plataforma atribuye la condición de usuario e implica la aceptación plena y
              sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal,
              en los términos y condiciones de uso, y en la política de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">4. Responsabilidad</h2>
            <p className="text-surface-600 leading-relaxed">
              {APP_NAME} se reserva el derecho a modificar, suspender, cancelar o restringir el contenido
              de la plataforma, los vínculos o la información obtenida a través de ella, sin necesidad de
              previo aviso. {APP_NAME} no se responsabiliza de los posibles daños o perjuicios que se
              pudieran derivar de interferencias, omisiones, interrupciones, virus informáticos, averías
              telefónicas o desconexiones en el funcionamiento de este sistema electrónico.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">5. Legislación Aplicable</h2>
            <p className="text-surface-600 leading-relaxed">
              Las presentes condiciones se rigen por la legislación vigente en el país donde opera la
              plataforma. Para la resolución de cualquier controversia, las partes se someterán a los
              juzgados y tribunales competentes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">6. Enlaces a Documentos Relacionados</h2>
            <div className="flex flex-col gap-2">
              <Link
                to="/terms"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm hover:underline"
              >
                Términos y Condiciones
              </Link>
              <Link
                to="/privacy"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm hover:underline"
              >
                Política de Privacidad
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
