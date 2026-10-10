import { Link } from 'react-router-dom';
import { APP_NAME } from '@/lib/constants';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui';

// ============================================
// PrivacyPage — Política de Privacidad
// ============================================

export default function PrivacyPage() {
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
            <div className="p-2 bg-[#fee8e3] rounded-xl">
              <ShieldCheck className="h-6 w-6 text-[#AD2E01]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">
                Política de Privacidad
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
            <h2 className="text-xl font-semibold text-surface-900 mb-3">1. Información que Recopilamos</h2>
            <p className="text-surface-600 leading-relaxed">
              Recopilamos información que usted nos proporciona directamente al registrarse en {APP_NAME},
              incluyendo: nombre completo, dirección de correo electrónico, rol en la plataforma e
              información relacionada con su actividad comercial en el sector cafetero.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">2. Uso de la Información</h2>
            <p className="text-surface-600 leading-relaxed mb-3">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside text-surface-600 space-y-2 ml-4">
              <li>Proporcionar, mantener y mejorar nuestros servicios</li>
              <li>Procesar transacciones y enviar notificaciones relacionadas</li>
              <li>Verificar la identidad de los usuarios y prevenir fraudes</li>
              <li>Personalizar la experiencia del usuario según su rol</li>
              <li>Comunicar actualizaciones, alertas de seguridad y soporte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">3. Seguridad de los Datos</h2>
            <p className="text-surface-600 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal,
              incluyendo: cifrado de datos en tránsito y en reposo, autenticación segura mediante cookies HttpOnly,
              prevención de ataques XSS y CSRF, y auditorías de seguridad periódicas. No almacenamos tokens de
              sesión ni datos sensibles en el almacenamiento local del navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">4. Cookies</h2>
            <p className="text-surface-600 leading-relaxed">
              Utilizamos cookies estrictamente necesarias para el funcionamiento de la plataforma, incluyendo
              cookies de sesión (HttpOnly) para la autenticación segura. No utilizamos cookies de rastreo
              ni cookies publicitarias de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">5. Compartición de Datos</h2>
            <p className="text-surface-600 leading-relaxed">
              No vendemos, alquilamos ni compartimos su información personal con terceros con fines
              comerciales. Podemos compartir información con proveedores de servicios que nos ayudan a
              operar la plataforma (procesadores de pago, servicios de hosting), quienes están obligados
              a proteger su información.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">6. Derechos del Usuario</h2>
            <p className="text-surface-600 leading-relaxed">
              Usted tiene derecho a acceder, rectificar, eliminar y portar sus datos personales.
              También puede oponerse al procesamiento de sus datos y solicitar la limitación de su uso.
              Para ejercer estos derechos, contacte a nuestro equipo de soporte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">7. Retención de Datos</h2>
            <p className="text-surface-600 leading-relaxed">
              Conservamos su información personal mientras su cuenta esté activa o según sea necesario
              para proporcionarle servicios. Si solicita la eliminación de su cuenta, eliminaremos o
              anonimizaremos su información en un plazo razonable, salvo que la ley exija su retención.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-surface-900 mb-3">8. Contacto</h2>
            <p className="text-surface-600 leading-relaxed">
              Para consultas sobre esta política de privacidad o sobre el tratamiento de sus datos
              personales, puede contactarnos a través de los canales de soporte de la plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
