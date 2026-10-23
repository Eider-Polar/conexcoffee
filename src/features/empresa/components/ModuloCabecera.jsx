import { Info, Plus, Search } from 'lucide-react';

/**
 * ModuloCabecera — Replicación fiel de `components.cabecera-modulo` para el rol Empresa.
 * Incluye imagen de portada (/images/portadas/[modulo].jpg), overlay,
 * franja de información oficial, contador de registros y botones de acción ('Registrar', 'Consultar').
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
                <div className="h-7 w-7 rounded-lg bg-brand-terracota flex items-center justify-center text-white shadow-md">
                  <Icono className="h-4 w-4" />
                </div>
              )}
              <span className="text-xs font-bold tracking-wider uppercase text-brand-gold">
                Módulo Empresa
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
              >
                <Search className="h-4 w-4 text-surface-200" />
                <span>{textoBotonConsultar}</span>
              </button>
            )}

            {onRegistrar && (
              <button
                type="button"
                onClick={onRegistrar}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-terracota hover:bg-brand-terracota-dark text-white text-xs font-bold transition-all duration-200 shadow-lg shadow-brand-terracota/30 active:scale-95 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{textoBotonRegistrar}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Franja informativa oficial (Alerts bar) */}
      <div className="px-5 py-3.5 bg-surface-50 border-t border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-surface-600">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-5 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-terracota shrink-0">
            <Info className="h-3.5 w-3.5" />
          </div>
          <span className="text-surface-600">
            {mensaje || 'En este módulo podrás gestionar la información detallada de los registros de tu empresa.'}
          </span>
        </div>

        {totalRegistros !== undefined && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-200/80 text-surface-700 font-semibold shrink-0 self-start sm:self-auto text-xs">
            <span>Total registros:</span>
            <span className="font-extrabold text-brand-terracota">{totalRegistros}</span>
          </div>
        )}
      </div>
    </div>
  );
}
