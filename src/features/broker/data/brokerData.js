// ============================================
// Data Mock — features/broker
// ============================================

export const BROKER_STATS = [
  { title: 'Negociaciones Activas', value: '23', trend: '+4', trendUp: true },
  { title: 'Comisiones del Mes', value: '$8,750', trend: '+15.2%', trendUp: true },
  { title: 'Clientes Conectados', value: '42', trend: '+6', trendUp: true },
  { title: 'Ofertas en Espera', value: '7', trend: '-2', trendUp: true },
];

export const NEGOCIACIONES_RECIENTES = [
  { id: 'NEG-801', comprador: 'Nordic Roasters Ltd', caficultor: 'Finca La Esperanza', lote: 'Geisha Lavado (250 sacos)', monto: '$38,500', comision: '$1,925', estado: 'En Revisión de Contrato' },
  { id: 'NEG-802', comprador: 'Tokyo Special Coffee Co', caficultor: 'Villa Hermosa', lote: 'Bourbon Rosado (180 sacos)', monto: '$27,000', comision: '$1,350', estado: 'Firmado' },
  { id: 'NEG-803', comprador: 'Berlin Green Imports', caficultor: 'Altos del Café', lote: 'Castillo Pergamino (400 sacos)', monto: '$48,000', comision: '$2,400', estado: 'En Negociación' },
];
