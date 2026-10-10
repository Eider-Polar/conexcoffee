import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { Coffee, Edit3, Eye, Award } from 'lucide-react';
import { ANALISIS_SENSORIALES_DATA } from '../data/laboratorioData';
import { ModificarSensorialModal, VerSensorialModal } from '../components';

export default function LaboratorioAnalisisSensorialPage() {
  const [sensorialList, setSensorialList] = useState(ANALISIS_SENSORIALES_DATA);
  const [sensorialEditar, setSensorialEditar] = useState(null);
  const [sensorialVer, setSensorialVer] = useState(null);

  const handleUpdate = (actualizado) => {
    setSensorialList((prev) =>
      prev.map((s) => (s.id === actualizado.id ? actualizado : s))
    );
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Evaluación de Calidad — Análisis Sensorial</h1>
        <p className="text-surface-500 mt-1">
          Calificación de tazas bajo protocolo SCA, evaluación de fragancia, sabor, balance y asignación de puntajes
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
                <th className="py-3 px-4">Catador</th>
                <th className="py-3 px-4 text-center">Fragancia</th>
                <th className="py-3 px-4 text-center">Sabor</th>
                <th className="py-3 px-4 text-center">Balance</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200">
              {sensorialList.map((item, index) => (
                <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-surface-500 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-surface-900 bg-surface-100 px-2.5 py-1 rounded">
                      {item.codigoLote}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-surface-900 flex items-center gap-1.5">
                      <Coffee className="w-4 h-4 text-primary-600" />
                      {item.catador}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-surface-100 font-semibold text-surface-900 rounded">
                      {item.fragancia} pts
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-surface-100 font-semibold text-surface-900 rounded">
                      {item.sabor} pts
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-surface-100 font-semibold text-surface-900 rounded">
                      {item.balance} pts
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Botón 1: Modificar perfil sensorial */}
                      <button
                        type="button"
                        onClick={() => setSensorialEditar(item)}
                        title="Modificar perfil sensorial"
                        aria-label="Modificar perfil sensorial"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Edit3 className="w-5 h-5 text-primary-600" />
                      </button>

                      {/* Botón 2: Ver */}
                      <button
                        type="button"
                        onClick={() => setSensorialVer(item)}
                        title="Ver ficha sensorial"
                        aria-label="Ver ficha sensorial"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-5 h-5 text-surface-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modales */}
      <ModificarSensorialModal
        isOpen={!!sensorialEditar}
        onClose={() => setSensorialEditar(null)}
        sensorial={sensorialEditar}
        onSave={handleUpdate}
      />

      <VerSensorialModal
        isOpen={!!sensorialVer}
        onClose={() => setSensorialVer(null)}
        sensorial={sensorialVer}
      />
    </div>
  );
}
