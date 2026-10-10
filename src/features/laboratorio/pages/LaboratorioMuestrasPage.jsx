import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { Archive, Eye, Calendar, Scale, Droplet } from 'lucide-react';
import { MUESTRAS_DATA } from '../data/laboratorioData';
import { VerMuestraModal } from '../components';

export default function LaboratorioMuestrasPage() {
  const [muestras] = useState(MUESTRAS_DATA);
  const [muestraVer, setMuestraVer] = useState(null);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Evaluación de Calidad — Muestras de Café</h1>
        <p className="text-surface-500 mt-1">
          Recepción, pesaje, determinación de humedad y trazabilidad de muestras de pergamino seco
        </p>
      </div>

      {/* Tabla Principal */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-surface-50 text-surface-600 border-b border-surface-200">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Código de Lote</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Peso</th>
                <th className="py-3 px-4">Humedad</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200">
              {muestras.map((item, index) => (
                <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-surface-500 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-surface-900 bg-surface-100 px-2.5 py-1 rounded">
                      {item.codigoLote}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-surface-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-surface-400" />
                      {item.fecha}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-surface-900">
                    <span className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-surface-400" />
                      {item.peso}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-primary-700">
                    <span className="flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-primary-500" />
                      {item.humedad}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setMuestraVer(item)}
                      title="Ver detalle de la muestra"
                      aria-label="Ver detalle de la muestra"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs ml-auto cursor-pointer"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Ver Muestra */}
      <VerMuestraModal
        isOpen={!!muestraVer}
        onClose={() => setMuestraVer(null)}
        muestra={muestraVer}
      />
    </div>
  );
}
