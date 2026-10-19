import { useState } from 'react';
import { Card } from '@/components/ui';
import { FlaskConical, Eye, UserPlus, Calendar } from 'lucide-react';
import { ANALISIS_FISICOS_DATA, CATADORES_DATA } from '../data/laboratorioData';
import {
  ActualizarAnalisisModal,
  VerAnalisisModal,
  AsignarCatadorModal,
} from '../components';

export default function LaboratorioAnalisisFisicoPage() {
  const [analisisList, setAnalisisList] = useState(ANALISIS_FISICOS_DATA);
  const [analisisEditar, setAnalisisEditar] = useState(null);
  const [analisisVer, setAnalisisVer] = useState(null);
  const [analisisAsignar, setAnalisisAsignar] = useState(null);

  const handleUpdate = (actualizado) => {
    setAnalisisList((prev) =>
      prev.map((a) => (a.id === actualizado.id ? actualizado : a))
    );
  };

  const handleAsignar = (item, catadorNombre) => {
    setAnalisisList((prev) =>
      prev.map((a) =>
        a.id === item.id ? { ...a, catadorAsignado: catadorNombre, estado: 'Catador Asignado' } : a
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Evaluación de Calidad — Análisis Físico</h1>
        <p className="text-surface-500 mt-1">
          Control gravimétrico, porcentaje de humedad, factor de rendimiento y recuento de defectos
        </p>
      </div>

      {/* Tabla Principal */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-surface-50 text-surface-600 border-b border-surface-200">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Fecha de Registro</th>
                <th className="py-3 px-4">Peso Muestra Analizada</th>
                <th className="py-3 px-4">Responsable</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200">
              {analisisList.map((item, index) => (
                <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-surface-500 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-surface-900 bg-surface-100 px-2 py-0.5 rounded">
                      {item.codigo}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-surface-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-surface-400" />
                      {item.fechaRegistro}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-surface-900">
                    {item.pesoMuestra}
                  </td>
                  <td className="py-3.5 px-4 text-surface-800 font-medium">
                    {item.responsable}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Botón 1: Realizar análisis físico */}
                      <button
                        type="button"
                        onClick={() => setAnalisisEditar(item)}
                        title="Realizar análisis físico"
                        aria-label="Realizar análisis físico"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <FlaskConical className="w-5 h-5 text-primary-600" />
                      </button>

                      {/* Botón 2: Ver análisis físico */}
                      <button
                        type="button"
                        onClick={() => setAnalisisVer(item)}
                        title="Ver análisis físico"
                        aria-label="Ver análisis físico"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-5 h-5 text-surface-600" />
                      </button>

                      {/* Botón 3: Asignar un catador */}
                      <button
                        type="button"
                        onClick={() => setAnalisisAsignar(item)}
                        title="Asignar un catador"
                        aria-label="Asignar un catador"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:border-primary-400 transition-colors shadow-2xs cursor-pointer"
                      >
                        <UserPlus className="w-5 h-5" />
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
      <ActualizarAnalisisModal
        isOpen={!!analisisEditar}
        onClose={() => setAnalisisEditar(null)}
        analisis={analisisEditar}
        onSave={handleUpdate}
      />

      <VerAnalisisModal
        isOpen={!!analisisVer}
        onClose={() => setAnalisisVer(null)}
        analisis={analisisVer}
      />

      <AsignarCatadorModal
        isOpen={!!analisisAsignar}
        onClose={() => setAnalisisAsignar(null)}
        analisis={analisisAsignar}
        catadores={CATADORES_DATA}
        onAsignar={handleAsignar}
      />
    </div>
  );
}
