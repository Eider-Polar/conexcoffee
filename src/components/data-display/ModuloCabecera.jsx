import { Info, Plus, Search } from 'lucide-react';

/**
 * ModuloCabecera — Componente centralizado de cabecera de módulo
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
  etiqueta = 'Módulo Oficial',
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
                {etiqueta}
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Search className="h-4 w-4" />
                <span>{textoBotonConsultar}</span>
              </button>
            )}
            {onRegistrar && (
              <button
                type="button"
                onClick={onRegistrar}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-terracota hover:bg-brand-orange text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{textoBotonRegistrar}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Franja de información inferior */}
      <div className="px-5 py-3.5 bg-brand-tint/60 border-t border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-surface-700">
          <Info className="h-4 w-4 text-brand-terracota shrink-0" />
          <span className="line-clamp-1">
            {mensaje || 'Gestión y control de información en la plataforma ConexCoffee.'}
          </span>
        </div>
        {typeof totalRegistros === 'number' && (
          <div className="flex items-center gap-1.5 shrink-0 text-surface-600 font-medium">
            <span>Total registrados:</span>
            <span className="font-extrabold text-brand-terracota bg-white px-2 py-0.5 rounded-md border border-surface-200">
              {totalRegistros}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
