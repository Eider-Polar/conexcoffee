import { useState } from 'react';
import ModalBase from '@/components/modals/ModalBase';
import { Button, Input } from '@/components/ui';
import { Search, Award, Phone } from 'lucide-react';

export default function ConsultarCatadorModal({ isOpen, onClose, catadores = [], onSelectCatador }) {
  const [searchTerm, setSearchTerm] = useState('');

  const resultados = catadores.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.identificacion.toLowerCase().includes(term) ||
      c.nombres.toLowerCase().includes(term) ||
      c.apellidos.toLowerCase().includes(term) ||
      (c.certificadoQ && c.certificadoQ.toLowerCase().includes(term))
    );
  });

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Consultar Catador" size="lg">
      <div className="space-y-4">
        <Input
          placeholder="Buscar por cédula, nombre, apellido o certificación Q..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<Search className="w-4 h-4 text-surface-400" />}
          autoFocus
        />

        <div className="max-h-72 overflow-y-auto divide-y divide-surface-100 rounded-lg border border-surface-200">
          {resultados.length === 0 ? (
            <div className="py-8 text-center text-surface-500 text-sm">
              No se encontraron catadores que coincidan con la búsqueda.
            </div>
          ) : (
            resultados.map((catador) => (
              <div
                key={catador.id}
                className="p-3 hover:bg-surface-50 flex items-center justify-between transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-surface-900 text-sm">
                    {catador.nombres} {catador.apellidos}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-surface-500 mt-0.5">
                    <span>CC: {catador.identificacion}</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {catador.telefono}
                    </span>
                    {catador.certificadoQ && (
                      <span className="text-primary-700 font-medium flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {catador.certificadoQ}
                      </span>
                    )}
                  </div>
                </div>
                {onSelectCatador && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      onSelectCatador(catador);
                      onClose();
                    }}
                  >
                    Ver Detalles
                  </Button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-surface-200">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
