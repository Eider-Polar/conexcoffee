import { MIS_LOTES_DATA } from '../data/caficultorData';

export default function LotesCaficultorTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-surface-50 text-surface-600 border-b border-surface-200">
          <tr>
            <th className="py-3 px-4">Lote</th>
            <th className="py-3 px-4">Finca</th>
            <th className="py-3 px-4">Variedad</th>
            <th className="py-3 px-4">Sacos / Kg</th>
            <th className="py-3 px-4">Humedad</th>
            <th className="py-3 px-4">Calidad SCA</th>
            <th className="py-3 px-4">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-200">
          {MIS_LOTES_DATA.map((lote) => (
            <tr key={lote.id} className="hover:bg-surface-50 transition-colors">
              <td className="py-3 px-4 font-mono font-medium text-surface-900">{lote.id}</td>
              <td className="py-3 px-4 font-medium text-surface-900">{lote.finca}</td>
              <td className="py-3 px-4 text-surface-700">{lote.variedad}</td>
              <td className="py-3 px-4 text-surface-800 font-semibold">{lote.sacos} sacos ({lote.pesoKg} kg)</td>
              <td className="py-3 px-4 text-surface-700">{lote.humedad}</td>
              <td className="py-3 px-4 font-semibold text-primary-700">{lote.puntaje} pts</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  lote.estado === 'Listo para Exportación'
                    ? 'bg-green-100 text-green-800'
                    : lote.estado === 'En Laboratorio'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-surface-100 text-surface-700'
                }`}>
                  {lote.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
