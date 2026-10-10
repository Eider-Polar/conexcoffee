import { MUESTRAS_LABORATORIO } from '../data/laboratorioData';

export default function MuestrasLaboratorioTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-surface-50 text-surface-600 border-b border-surface-200">
          <tr>
            <th className="py-3 px-4">Código</th>
            <th className="py-3 px-4">Finca / Caficultor</th>
            <th className="py-3 px-4">Variedad</th>
            <th className="py-3 px-4">Humedad</th>
            <th className="py-3 px-4">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-200">
          {MUESTRAS_LABORATORIO.map((m) => (
            <tr key={m.id} className="hover:bg-surface-50 transition-colors">
              <td className="py-3 px-4 font-mono font-medium text-surface-900">{m.id}</td>
              <td className="py-3 px-4">
                <div className="font-medium text-surface-900">{m.finca}</div>
                <div className="text-xs text-surface-500">{m.caficultor}</div>
              </td>
              <td className="py-3 px-4 text-surface-700">{m.variedad}</td>
              <td className="py-3 px-4 font-semibold text-surface-800">{m.humedad}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  m.estado === 'Aprobado'
                    ? 'bg-green-100 text-green-800'
                    : m.estado === 'En Análisis'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-surface-100 text-surface-700'
                }`}>
                  {m.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
