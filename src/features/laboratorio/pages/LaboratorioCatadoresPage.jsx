import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { Search, UserPlus, Eye, Edit2, Phone, Award } from 'lucide-react';
import { QueryState } from '@/components/feedback';
import {
  useCatadores,
  useCrearCatador,
  useActualizarCatador,
} from '../hooks/useLaboratorioData';
import {
  RegistrarCatadorModal,
  EditarCatadorModal,
  VerCatadorModal,
  ConsultarCatadorModal,
} from '../components';

export default function LaboratorioCatadoresPage() {
  const query = useCatadores();
  const catadores = query.data ?? [];
  const crearCatador = useCrearCatador();
  const actualizarCatador = useActualizarCatador();

  const [showRegistrar, setShowRegistrar] = useState(false);
  const [showConsultar, setShowConsultar] = useState(false);
  const [catadorVer, setCatadorVer] = useState(null);
  const [catadorEditar, setCatadorEditar] = useState(null);

  const handleAddCatador = (nuevo) => {
    crearCatador.mutate(nuevo);
  };

  const handleUpdateCatador = (actualizado) => {
    actualizarCatador.mutate(actualizado);
  };

  if (query.isLoading || query.isError) {
    return <QueryState query={query} />;
  }

  return (
    <div className="space-y-6">
      {/* Encabezado y Botones Superiores */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Catadores Registrados</h1>
          <p className="text-surface-500 mt-1">
            Gestión de catadores certificados Q-Grader asignados a sesiones de laboratorio
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowConsultar(true)}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Consultar
          </Button>

          <Button
            variant="primary"
            onClick={() => setShowRegistrar(true)}
            className="flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Registrar
          </Button>
        </div>
      </div>

      {/* Tabla Principal */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-surface-50 text-surface-600 border-b border-surface-200">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Número de Identificación</th>
                <th className="py-3 px-4">Nombres</th>
                <th className="py-3 px-4">Apellidos</th>
                <th className="py-3 px-4">Teléfonos</th>
                <th className="py-3 px-4 text-right">Acciones Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200">
              {catadores.map((c, index) => (
                <tr key={c.id} className="hover:bg-surface-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-surface-500 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-surface-900">
                    {c.identificacion}
                  </td>
                  <td className="py-3 px-4 font-semibold text-surface-900">
                    {c.nombres}
                  </td>
                  <td className="py-3 px-4 font-semibold text-surface-900">
                    {c.apellidos}
                  </td>
                  <td className="py-3 px-4 text-surface-700">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-surface-400" />
                      {c.telefono}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setCatadorEditar(c)}
                        title="Editar Catador"
                        aria-label="Editar Catador"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCatadorVer(c)}
                        title="Ver Ficha Completa"
                        aria-label="Ver Ficha Completa"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50/50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-5 h-5" />
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
      <RegistrarCatadorModal
        isOpen={showRegistrar}
        onClose={() => setShowRegistrar(false)}
        onSave={handleAddCatador}
      />

      <ConsultarCatadorModal
        isOpen={showConsultar}
        onClose={() => setShowConsultar(false)}
        catadores={catadores}
        onSelectCatador={(c) => setCatadorVer(c)}
      />

      <EditarCatadorModal
        isOpen={!!catadorEditar}
        onClose={() => setCatadorEditar(null)}
        catador={catadorEditar}
        onSave={handleUpdateCatador}
      />

      <VerCatadorModal
        isOpen={!!catadorVer}
        onClose={() => setCatadorVer(null)}
        catador={catadorVer}
      />
    </div>
  );
}
