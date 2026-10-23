import {
  MapPin,
  User,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ModalBase } from '@/components/modals';

export default function DetalleOfertaLibreModal({
  isOpen,
  onClose,
  oferta,
  onAceptarCarga,
  onReservar,
}) {
  if (!oferta) return null;

  const estaReservada = oferta.estado === 'Reservada';
  const estaAceptada = oferta.estado === 'Aceptada';

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      title={
        <div className="flex flex-wrap items-center gap-2">
          <span className="p-1 rounded-md bg-amber-50 text-brand-terracota">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono font-bold text-brand-terracota bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            {oferta.codigo}
          </span>
          <span className="text-sm sm:text-base font-extrabold text-stone-900">
            {oferta.finca_nombre}
          </span>
        </div>
      }
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-stone-800">
        {/* Banner de Estado: Si está reservado */}
        {estaReservada && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-3">
            <span className="p-1.5 rounded-lg bg-amber-100 text-brand-terracota shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </span>
            <div className="text-xs">
              <p className="font-bold text-stone-900">
                Oferta Reservada por tu Empresa
              </p>
              <p className="text-stone-600 mt-0.5 leading-relaxed">
                Tienes <strong>3 días de exclusividad</strong> para contactar al caficultor y acordar detalles. Ninguna otra empresa podrá tomar este lote durante este periodo.
              </p>
            </div>
          </div>
        )}

        {/* Imagen de la Finca con Ubicación */}
        {oferta.finca_imagen && (
          <div className="w-full h-40 sm:h-52 rounded-xl overflow-hidden relative border border-stone-200 bg-stone-100 shadow-2xs">
            <img
              src={oferta.finca_imagen}
              alt={oferta.finca_nombre}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3 sm:p-4">
              <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 drop-shadow-sm">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{oferta.ubicacion}</span>
                <span>•</span>
                <span>{oferta.altura_msnm} msnm</span>
              </span>
            </div>
          </div>
        )}

        {/* Bloque de Especificaciones del Café */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 space-y-3 text-xs">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Especificaciones del Lote
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3 border-b border-stone-200/70">
            <div>
              <span className="text-stone-500 block mb-0.5 font-medium">
                Variedad / Especie
              </span>
              <strong className="text-stone-900 font-bold text-sm block">
                {oferta.variedad} ({oferta.especie || 'Arábica'})
              </strong>
            </div>
            <div>
              <span className="text-stone-500 block mb-0.5 font-medium">
                Cantidad Ofertada
              </span>
              <strong className="text-stone-900 font-mono font-bold text-sm block">
                {oferta.cantidad_kg?.toLocaleString('es-CO')} Kg{' '}
                <span className="text-xs font-normal text-stone-500">
                  ({oferta.sacos} Sacos de 60kg)
                </span>
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3 border-b border-stone-200/70">
            <div>
              <span className="text-stone-500 block mb-0.5 font-medium">
                Proceso de Beneficio
              </span>
              <span className="text-stone-900 font-semibold block">
                {oferta.proceso}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block mb-0.5 font-medium">
                Precio Estimado por Carga
              </span>
              <span className="text-brand-terracota font-mono font-bold text-sm block">
                ${oferta.precio_estimado_carga?.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>

          {/* Información del Caficultor y Teléfono Directo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3 border-b border-stone-200/70">
            <div>
              <span className="text-stone-500 block mb-0.5 font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-400" />
                Productor / Caficultor
              </span>
              <strong className="text-stone-900 font-bold text-sm block">
                {oferta.caficultor_nombre}
              </strong>
            </div>
            <div>
              <span className="text-stone-500 block mb-0.5 font-medium flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-brand-terracota" />
                Contacto Telefónico Directo
              </span>
              <a
                href={`tel:${oferta.caficultor_telefono}`}
                className="inline-flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm text-brand-terracota hover:text-brand-terracota-dark bg-amber-50 hover:bg-amber-100/70 px-2.5 py-1 rounded-lg border border-amber-200/70 transition-colors"
                title="Llamar o contactar al caficultor"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{oferta.caficultor_telefono}</span>
              </a>
            </div>
          </div>

          {/* Ubicación del Predio */}
          <div>
            <span className="text-stone-500 block mb-0.5 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              Ubicación del Predio
            </span>
            <span className="text-stone-800 font-medium">
              {oferta.finca_nombre}, {oferta.vereda}, {oferta.municipio} ({oferta.departamento})
            </span>
          </div>
        </div>

        {/* Acciones del Modal: Responsive y alineadas */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 text-xs font-semibold cursor-pointer transition-colors text-center order-3 sm:order-1"
          >
            Cerrar
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 order-1 sm:order-2 w-full sm:w-auto">
            {/* Botón de Reservar por 3 días */}
            {!estaAceptada && (
              <button
                type="button"
                onClick={() => onReservar(oferta)}
                disabled={estaReservada}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  estaReservada
                    ? 'bg-amber-100 text-amber-900 border border-amber-300/80 cursor-default opacity-90'
                    : 'bg-white border-2 border-brand-orange text-brand-terracota hover:bg-amber-50/70 active:scale-[0.99]'
                }`}
              >
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>
                  {estaReservada ? 'Reservada (3 días restantes)' : 'Reservar (3 días)'}
                </span>
              </button>
            )}

            {/* Botón de Aceptar Carga */}
            <button
              type="button"
              onClick={() => onAceptarCarga(oferta)}
              disabled={estaAceptada}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                estaAceptada
                  ? 'bg-emerald-600 cursor-default opacity-90'
                  : 'bg-brand-terracota hover:bg-brand-terracota-dark active:scale-[0.99]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{estaAceptada ? 'Carga Aceptada' : 'Aceptar esta Carga'}</span>
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
