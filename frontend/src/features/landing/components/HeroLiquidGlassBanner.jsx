// HeroLiquidGlassBanner — Cinta Liquid Glass con efecto de agua
// Se posiciona en la parte inferior del Hero, sin dots.
// Efecto: ondas de luz refractada sobre superficie líquida al cambiar de slide.

import { useEffect, useRef, useState } from 'react';
import { Sprout, FlaskConical, MapPin, Handshake, Globe, ShieldCheck } from 'lucide-react';

const FEATURES = [
  { label: 'Café verde de especialidad', icon: Sprout },
  { label: 'Calidad verificada por laboratorios', icon: FlaskConical },
  { label: 'Trazabilidad desde la finca', icon: MapPin },
  { label: 'Compra directa con productores', icon: Handshake },
  { label: 'Exportación internacional', icon: Globe },
  { label: 'Pago seguro y confiable', icon: ShieldCheck },
];

// ============================================
// HeroLiquidGlassBanner
// Props:
//   - currentSlide : Índice del slide activo (dispara el efecto agua)
// ============================================
export default function HeroLiquidGlassBanner({ currentSlide }) {
  const [waterKey, setWaterKey] = useState(0);
  const prevSlideRef = useRef(currentSlide);

  // Re-montar capa de agua en cada cambio de slide
  useEffect(() => {
    if (prevSlideRef.current !== currentSlide) {
      prevSlideRef.current = currentSlide;
      setWaterKey((k) => k + 1);
    }
  }, [currentSlide]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Panel Liquid Glass ── */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/[0.18] shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
          style={{
            background: 'rgba(255,255,255,0.055)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
          }}
        >
          {/* Brillo especular fijo superior */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none rounded-t-2xl"
            style={{
              height: '48%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
            }}
          />

          {/* ── Capa de agua (se remonta con waterKey) ── */}
          <div
            key={waterKey}
            className="water-layer absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            aria-hidden="true"
          >
            {/* Onda 1 — banda de luz ancha barriendo de izquierda a derecha */}
            <div className="water-wave water-wave--1" />
            {/* Onda 2 — banda más estrecha, ángulo y timing distintos */}
            <div className="water-wave water-wave--2" />
            {/* Onda 3 — destello suave central */}
            <div className="water-wave water-wave--3" />
          </div>

          {/* Grid de características */}
          <div className="relative z-10 grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 p-2 sm:p-2.5">
            {FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-2 px-2 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.10] border border-white/[0.08] hover:border-brand-orange/45 transition-all duration-300 cursor-default"
                >
                  <div className="shrink-0 w-7 h-7 rounded-lg bg-white/[0.07] border border-white/[0.11] flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-white/88 leading-tight group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
