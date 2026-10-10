import { Link } from 'react-router-dom';
import { BookOpen, Users, Phone, Package } from 'lucide-react';

// ============================================
// PublicFooter — Footer oficial Conexcoffee
// ============================================

export default function PublicFooter() {
  return (
    <footer
      className="relative text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-2xl border-t-2 border-[#F25433] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/pagina-web/background-footer.png')",
        backgroundColor: '#3b1206',
      }}
    >
      {/* Overlay sólido sin gradientes */}
      <div className="absolute inset-0 bg-[#AD2E01]/85 backdrop-blur-[1px]" />
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 items-start">
          {/* Columna 1: Logo Oficial Conexcoffee y descripción (5 cols) */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div>
              <Link to="/" className="inline-block group" title="Conexcoffee">
                <img
                  src="/images/logo-light_conex.png"
                  alt="Conexcoffee — we connect with quality"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-102"
                />
              </Link>
            </div>

            <p className="text-sm font-semibold text-white/95 pt-2">
              Encuentra los mejores cafés de Colombia.
            </p>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md font-normal">
              Conectamos pequeños Caficultores de cafés de especialidad en Colombia con compradores
              internacionales, garantizando la calidad, transparencia, precio justo y la entrega
              hasta su destino.
            </p>
          </div>

          {/* Columna 2: CONÓCENOS (3 cols) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <div className="inline-block border-b-2 border-white pb-1 mb-2">
              <h3 className="text-base sm:text-lg font-extrabold tracking-wider text-white uppercase">
                CONÓCENOS
              </h3>
            </div>

            <ul className="space-y-3.5 pt-1">
              <li>
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-white/80 group-hover:text-white transition-colors shrink-0" />
                  <span className="font-medium">Nuestro blog</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/nosotros"
                  className="group inline-flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"
                >
                  <Users className="h-4 w-4 text-white/80 group-hover:text-white transition-colors shrink-0" />
                  <span className="font-medium">Nosotros</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-white/80 group-hover:text-white transition-colors shrink-0" />
                  <span className="font-medium">Contáctanos</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: NUESTROS DESTINOS (4 cols) */}
          <div className="md:col-span-3 lg:col-span-4 space-y-4">
            <div className="inline-block border-b-2 border-white pb-1 mb-2">
              <h3 className="text-base sm:text-lg font-extrabold tracking-wider text-white uppercase">
                NUESTROS DESTINOS
              </h3>
            </div>

            <div className="pt-2">
              <Link to="/destinos" className="inline-block">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-white text-[#AD2E01] hover:bg-surface-50 font-extrabold text-sm sm:text-base tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-white/50"
                >
                  <Package className="h-5 w-5 text-[#AD2E01]" />
                  <span>CONÓCELOS</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Línea divisoria y Copyright */}
        <div className="pt-6 border-t border-white/20 text-center">
          <p className="text-xs text-white/80 tracking-wide font-normal">
            © BUXTAR Todos los derechos reservados - 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
