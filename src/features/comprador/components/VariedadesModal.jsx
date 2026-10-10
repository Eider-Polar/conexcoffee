import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X, Coffee, Star, ShoppingBag, ChevronRight } from 'lucide-react';

// ============================================
// VariedadesModal — Tarjetas de variedades de un contenedor
// ============================================

export default function VariedadesModal({ isOpen, onClose, contenedor, onVerDetalle }) {
  if (!contenedor) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200">
                  <div>
                    <DialogTitle className="text-lg font-bold text-surface-900">
                      Variedades disponibles
                    </DialogTitle>
                    <p className="text-sm text-surface-500 mt-0.5">
                      {contenedor.codigo} — Origen: {contenedor.origen}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Tarjetas de variedades */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {contenedor.variedades.map((variedad) => (
                      <div
                        key={variedad.id}
                        className="bg-white border border-surface-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all duration-200 flex flex-col"
                      >
                        {/* Imagen del costal/café */}
                        <div className="relative h-44 bg-surface-100 overflow-hidden">
                          <img
                            src={variedad.imagen}
                            alt={`Café ${variedad.nombre}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {/* Badge puntaje SCA */}
                          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-surface-900">
                              {variedad.puntajeSCA.toFixed(2)} SCA
                            </span>
                          </div>
                          {/* Badge unidades */}
                          <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                            {variedad.unidadesDisponibles} uds.
                          </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-4 flex-1 flex flex-col">
                          {/* Nombre */}
                          <h3 className="font-bold text-surface-900 text-base mb-0.5">
                            Variedad {variedad.nombre}
                          </h3>
                          <p className="text-xs text-surface-400 mb-3">
                            Tipo de secado: {variedad.tipoSecado}
                          </p>

                          {/* Precio */}
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xl font-extrabold text-primary-600">
                              ${variedad.precioCOP.toLocaleString('es-CO')}
                            </span>
                            <span className="text-sm text-surface-400">COP por Kg</span>
                          </div>
                          <p className="text-xs text-surface-400 mb-3">
                            USD ${variedad.precioUSD.toFixed(2)} / Kg
                          </p>

                          {/* Pedido mínimo */}
                          <div className="flex items-center gap-1.5 text-xs text-surface-500 mb-4">
                            <ShoppingBag className="h-3.5 w-3.5" />
                            Pedido mínimo: {variedad.pedidoMinKg} Kg
                          </div>

                          {/* Botón conocer más */}
                          <button
                            id={`btn-detalle-${variedad.id}`}
                            onClick={() => onVerDetalle(variedad)}
                            className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            <Coffee className="h-4 w-4" />
                            Conocer más
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
