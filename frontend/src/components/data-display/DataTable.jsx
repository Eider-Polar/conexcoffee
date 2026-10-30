import { EmptyState } from '@/components/feedback';

// ============================================
// DataTable — Tabla de datos reutilizable
// ============================================
// Tabla con columnas configurables, estados vacíos y estilos.
//
// Uso:
//   <DataTable
//     columns={[
//       { key: 'name', label: 'Nombre' },
//       { key: 'email', label: 'Email' },
//       { key: 'role', label: 'Rol', render: (row) => <Badge>{row.role}</Badge> },
//     ]}
//     data={users}
//   />
// ============================================

export default function DataTable({
  columns = [],
  data = [],
  emptyTitle = 'No hay datos',
  emptyDescription = 'No se encontraron resultados.',
  className = '',
}) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={`bg-white rounded-xl border border-surface-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-surface-50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-sm text-surface-700"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
