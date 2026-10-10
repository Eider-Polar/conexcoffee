// ============================================
// Data Mock — features/caficultor
// ============================================

export const CAFICULTOR_STATS = [
  { title: 'Lotes Activos', value: '8', iconName: 'Leaf', trend: '+2', trendUp: true },
  { title: 'Ingresos del Mes', value: '$12,300', iconName: 'DollarSign', trend: '+22.5%', trendUp: true },
  { title: 'Producción (kg)', value: '2,450', iconName: 'BarChart3', trend: '+180', trendUp: true },
  { title: 'Calidad Promedio', value: '86 pts', iconName: 'Sun', trend: '+2', trendUp: true },
];

export const MIS_LOTES_DATA = [
  { id: 'LOT-201', finca: 'Finca La Esperanza', variedad: 'Castillo Pergamino Seco', sacos: 45, pesoKg: 1800, humedad: '11.2%', puntaje: '86.5', estado: 'Listo para Exportación' },
  { id: 'LOT-202', finca: 'Altos del Café', variedad: 'Geisha Pergamino Seco', sacos: 15, pesoKg: 600, humedad: '10.9%', puntaje: '88.0', estado: 'En Laboratorio' },
  { id: 'LOT-203', finca: 'El Paraíso', variedad: 'Bourbon Rosado', sacos: 20, pesoKg: 800, humedad: '11.4%', puntaje: '87.0', estado: 'En Secado' },
];
