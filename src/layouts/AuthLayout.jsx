import { Link, Outlet } from 'react-router-dom';

// ============================================
// AuthLayout — Layout para páginas públicas (Login, Register)
// ============================================
// Sin sidebar ni header del dashboard.
// Diseño centrado con branding oficial de Conexcoffee.
// ============================================

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Panel izquierdo — Branding Oficial */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 border-r border-surface-800">
        <div className="max-w-md text-center">
          <Link to="/" className="inline-block group mb-8" title="Volver al inicio">
            <img
              src="/images/logo-light_conex.png"
              alt="Conexcoffee — we connect with quality"
              className="h-20 w-auto mx-auto object-contain drop-shadow-md transition-transform group-hover:scale-102"
            />
          </Link>
          <p className="text-surface-300 text-lg leading-relaxed">
            Conectamos productores, empresas y compradores en una plataforma segura y eficiente para el comercio del café.
          </p>
        </div>
      </div>

      {/* Panel derecho — Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-block" title="Volver al inicio">
              <img
                src="/images/logo-light_conex.png"
                alt="Conexcoffee — we connect with quality"
                className="h-14 w-auto mx-auto mb-2 object-contain"
              />
            </Link>
          </div>

          {/* Formulario (se inyecta aquí) */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
