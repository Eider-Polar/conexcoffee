import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PlusCircle,
  LogIn,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui';
import useAuthStore from '@/store/useAuthStore';

// ============================================
// PublicNavbar — Barra de navegación transparente
// ============================================

const NAV_LINKS = [
  { label: 'Inicio', path: '/' },
  { label: 'Destinos', path: '/destinos' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contactos', path: '/contacto' },
];

export default function PublicNavbar({ onOpenAddProduct }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/75 backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'bg-transparent border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial Conexcoffee */}
          <Link
            to="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#F25433] rounded-lg py-1 px-0.5 group"
            title="Conexcoffee — Inicio"
          >
            <img
              src="/images/logo-dark_conex.png"
              alt="Conexcoffee — we connect with quality"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F25433] after:transition-all ${
                    isActive
                      ? 'text-[#F25433] after:w-full'
                      : 'text-white/85 hover:text-white after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Botón: Agregar Producto */}
            <button
              onClick={onOpenAddProduct}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F25433]"
              title="Publicar un nuevo lote de café"
            >
              <PlusCircle className="h-4 w-4 text-[#F25433]" />
              <span>Agregar Producto</span>
            </button>

            {/* Botón: Iniciar Sesión / Mi Panel */}
            {isAuthenticated ? (
              <Link to={`/${role}/dashboard`}>
                <Button variant="primary" size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Mi Panel</span>
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 px-3 border-t border-white/10 bg-black/95 backdrop-blur-xl rounded-b-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1 pb-3">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`px-3 py-2 text-base font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#F25433]/20 text-[#F25433]'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAddProduct();
                }}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl cursor-pointer"
              >
                <PlusCircle className="h-4 w-4 text-[#F25433]" />
                <span>Agregar Producto</span>
              </button>

              {isAuthenticated ? (
                <Link
                  to={`/${role}/dashboard`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" size="md" className="w-full gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Ir a Mi Panel</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button variant="primary" size="md" className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Iniciar Sesión</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
