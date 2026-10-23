import { useNegociaciones } from '../hooks/useBrokerData';
import { QueryState } from '@/components/feedback';

export default function NegociacionesTable() {
  const query = useNegociaciones();
  const negociaciones = query.data ?? [];

  if (query.isLoading || query.isError) {
    return <QueryState query={query} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-surface-50 text-surface-600 border-b border-surface-200">
          <tr>
            <th className="py-3 px-4">Ref</th>
            <th className="py-3 px-4">Comprador</th>
            <th className="py-3 px-4">Caficultor / Lote</th>
            <th className="py-3 px-4">Valor Total</th>
            <th className="py-3 px-4">Comisión Broker</th>
            <th className="py-3 px-4">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-200">
          {negociaciones.map((neg) => (
            <tr key={neg.id} className="hover:bg-surface-50 transition-colors">
              <td className="py-3 px-4 font-mono font-medium text-surface-900">{neg.id}</td>
              <td className="py-3 px-4 font-medium text-surface-900">{neg.comprador}</td>
              <td className="py-3 px-4">
                <div className="text-surface-900">{neg.caficultor}</div>
                <div className="text-xs text-surface-500">{neg.lote}</div>
              </td>
              <td className="py-3 px-4 font-semibold text-surface-900">{neg.monto}</td>
              <td className="py-3 px-4 font-semibold text-primary-700">{neg.comision}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  neg.estado === 'Firmado'
                    ? 'bg-green-100 text-green-800'
                    : neg.estado === 'En Revisión de Contrato'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-primary-50 text-primary-700'
                }`}>
                  {neg.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
