import { Info, Plus, Search } from 'lucide-react';

/**
 * ModuloCabecera — Replicación fiel y moderna de `components.cabecera-modulo`
 * Incluye imagen de portada superior (/images/portadas/[modulo].jpg),
 * mensaje descriptivo oficial, y botones de acción rápida ('Registrar', 'Consultar').
 */
export default function ModuloCabecera({
  titulo,
  subtitulo,
  imagenPortada,
  mensaje,
  icono: Icono,
  totalRegistros,
  onRegistrar,
  onConsultar,
  textoBotonRegistrar = 'Registrar',
  textoBotonConsultar = 'Consultar',
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm border border-surface-200 bg-white">
      {/* Banner con imagen de fondo (Portada) */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-surface-900">
        <img
          src={imagenPortada}
          alt={titulo}
          className="w-full h-full object-cover object-center opacity-70 scale-105 transition-transform duration-700 hover:scale-100"
          onError={(e) => {
            e.currentTarget.src = '/images/portadas/caficultor.jpg';
          }}
        />
        {/* Gradiente oscuro sobre la portada */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/40 to-transparent" />

        {/* Contenido flotante sobre la portada */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1.5">
              {Icono && (
                <div className="h-7 w-7 rounded-lg bg-[#AD2E01] flex items-center justify-center text-white shadow-md">
                  <Icono className="h-4 w-4" />
                </div>
              )}
              <span className="text-xs font-bold tracking-wider uppercase text-[#F39200]">
                Módulo SuperAdmin
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
              {titulo}
            </h1>
            {subtitulo && (
              <p className="text-xs sm:text-sm text-surface-200 mt-0.5 max-w-2xl line-clamp-1">
                {subtitulo}
              </p>
            )}
          </div>

          {/* Botones de acción principales sobre el hero */}
          <div className="flex items-center gap-2.5 shrink-0">
            {onConsultar && (
              <button
                type="button"
                onClick={onConsultar}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <Search className="h-4 w-4 text-surface-200" />
                <span>{textoBotonConsultar}</span>
              </button>
            )}

            {onRegistrar && (
              <button
                type="button"
                onClick={onRegistrar}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#AD2E01] hover:bg-[#8D2501] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>{textoBotonRegistrar}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Franja descriptiva inferior inspirada en la original */}
      <div className="px-4 sm:px-6 py-3 bg-surface-50 border-t border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-surface-700">
          <div className="h-6 w-6 rounded-full bg-[#FFF1ED] text-[#AD2E01] flex items-center justify-center shrink-0 border border-[#AD2E01]/20">
            <Info className="h-3.5 w-3.5" />
          </div>
          <span className="font-medium text-surface-600">
            {mensaje || 'En este módulo podrás gestionar la información detallada de los registros.'}
          </span>
        </div>

        {totalRegistros !== undefined && (
          <div className="shrink-0 font-semibold text-surface-700 bg-white px-3 py-1 rounded-lg border border-surface-200 shadow-2xs">
            Total registros: <span className="font-bold text-[#AD2E01]">{totalRegistros}</span>
          </div>
        )}
      </div>
    </div>
  );
}
