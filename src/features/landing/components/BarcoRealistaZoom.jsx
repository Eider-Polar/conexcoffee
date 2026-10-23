import { Compass, Waves, Navigation, Camera, Crosshair } from 'lucide-react';

// ==========================================================
// ConexCoffee — BarcoRealistaZoom
// Coreografía Cinematográfica Realista:
// Enfoque nítido continuo sin doble exposición ni efecto fantasma
// ==========================================================

export default function BarcoRealistaZoom({ zoomProgress = 0 }) {
  // zoomProgress: 0.0 (inicio del scroll) -> 1.0 (máximo acercamiento)
  
  // Cinemática de cámara cinematográfica fluida
  let camPanX = 0;
  let camPanY = 0;
  let camRotY = 0;
  let camRotX = 0;
  let camScale = 1;

  if (zoomProgress <= 0.5) {
    // FASE 1: Cámara desciende suavemente y panea a la DERECHA siguiendo la marcha del buque
    const p = zoomProgress / 0.5;
    const easeP = p * p * (3 - 2 * p);
    camPanX = -12 * easeP;
    camPanY = 12 * easeP;
    camRotY = -3.5 * Math.sin(easeP * Math.PI * 0.85);
    camRotX = 2.5 * easeP;
    camScale = 1 + easeP * 0.45; // 1.0x -> 1.45x
  } else {
    // FASE 2: Cámara panea a la IZQUIERDA para centrar la bahía de contenedores sobre cubierta
    const p = (zoomProgress - 0.5) / 0.5;
    const easeP = p * p * (3 - 2 * p);
    camPanX = -12 + 16 * easeP; // De -12% a +4%
    camPanY = 12 + 10 * easeP; // De 12% a 22%
    camRotY = -3.0 * (1 - easeP) + 0.8 * easeP;
    camRotX = 2.5 + 2 * easeP;
    camScale = 1.45 + easeP * 0.45; // 1.45x -> 1.90x
  }

  const hudPanDeg = Math.round(camRotY * 3);
  const hudZoomRatio = (camScale).toFixed(1);

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none bg-surface-950"
      style={{ perspective: '1400px' }}
    >
      {/* ==========================================================
          VISTA FOTORREALISTA 8K DEL BUQUE EN ALTA MAR
          Una sola toma continua y nítida (sin doble exposición fantasma)
          ========================================================== */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: `
            scale(${camScale})
            translate3d(${camPanX}%, ${camPanY}%, 0px)
            rotateY(${camRotY}deg)
            rotateX(${camRotX}deg)
          `,
          transformOrigin: '55% 55%',
          transition: 'transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <img
          src="/images/destinos/buque_maritimo.jpg"
          alt="Buque de Carga ConexCoffee en Alta Mar"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Capa cinematográfica sutil */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Retícula de Enfoque Sutil */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: zoomProgress > 0.15 && zoomProgress < 0.85 ? 0.35 : 0 }}
      >
        <Crosshair className="h-16 w-16 text-primary-400 stroke-[1]" />
      </div>

      {/* ==========================================================
          HUD DE TELEMETRÍA CINEMATOGRÁFICA
          ========================================================== */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 bg-surface-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-white shadow-2xl">
          <div className="h-8 w-8 rounded-lg bg-primary-600/30 border border-primary-500/40 flex items-center justify-center text-primary-400 shrink-0">
            <Camera className="h-4 w-4" />
          </div>
          <div className="font-mono text-xs">
            <div className="text-white/60 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span>Cámara Dinámica de Inspección</span>
              <span>•</span>
              <span className="text-brand-orange font-bold">
                {zoomProgress < 0.5 ? 'Paneo a Estribor (Der)' : 'Enfoque a Cubierta (Izq)'}
              </span>
            </div>
            <div className="font-bold text-white tracking-wide flex items-center gap-2">
              <span>PAN: {hudPanDeg >= 0 ? `+${hudPanDeg}°` : `${hudPanDeg}°`}</span>
              <span>•</span>
              <span>ZOOM: {hudZoomRatio}x</span>
              <span>•</span>
              <span className="text-primary-300">03° 53' N, 77° 04' W</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-surface-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white flex items-center gap-2 shadow-2xl">
            <Navigation className="h-3.5 w-3.5 text-primary-400" />
            <span>Rumbo: <strong>284° ONO</strong></span>
          </div>

          <div className="bg-surface-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white flex items-center gap-2 shadow-2xl">
            <Waves className="h-3.5 w-3.5 text-sky-400" />
            <span>Mar: <strong>Calma 1</strong></span>
          </div>

          <div className="hidden md:flex bg-surface-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white items-center gap-2 shadow-2xl">
            <Compass className="h-3.5 w-3.5 text-brand-orange animate-spin" style={{ animationDuration: '16s' }} />
            <span>Puerto Buenaventura — Tránsito Directo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
