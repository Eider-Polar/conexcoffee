// ============================================
// Data Mock — features/tecnico
// ============================================

export const TECNICO_STATS = [
  { title: 'Fincas Asignadas', value: '32', trend: '+2 nuevas', trendUp: true },
  { title: 'Visitas Realizadas', value: '64', trend: '+15% mes', trendUp: true },
  { title: 'Auditorías BPA Aprobadas', value: '92%', trend: '+4%', trendUp: true },
  { title: 'Alertas en Campo', value: '1', trend: 'Bajo control', trendUp: false },
];

export const PROXIMAS_VISITAS_TECNICAS = [
  { id: 'VIS-301', finca: 'Finca El Mirador', caficultor: 'Hernán Morales', municipio: 'Pitalito, Huila', fecha: 'Mañana, 08:30 AM', motivo: 'Inspección de secado y humedad' },
  { id: 'VIS-302', finca: 'Cafetal Santa Helena', caficultor: 'Rosa Beltrán', municipio: 'Garzón, Huila', fecha: '2 Oct, 10:00 AM', motivo: 'Monitoreo de trazabilidad y BPAs' },
  { id: 'VIS-303', finca: 'La Cabaña Coffee', caficultor: 'Fabián Torres', municipio: 'San Agustín, Huila', fecha: '4 Oct, 02:00 PM', motivo: 'Toma de muestra para laboratorio' },
];
