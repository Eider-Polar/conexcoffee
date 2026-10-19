// ============================================
// Data Central — features/caficultor
// ============================================

export const COLOMBIA_GEOGRAFIA = {
  Huila: {
    municipios: ['Pitalito', 'San Agustín', 'Acevedo', 'Garzón', 'Gigante', 'La Plata', 'Timaná'],
    veredas: ['El Mirador', 'La Cabaña', 'San Antonio', 'La Palma', 'El Triunfo', 'Bajo Naranjal'],
  },
  Cauca: {
    municipios: ['Popayán', 'Piendamó', 'Santander de Quilichao', 'Timbío', 'Caldono', 'Morales', 'Inzá'],
    veredas: ['La Rejoya', 'San Rafael', 'El Rodeo', 'La Meseta', 'Poblazón', 'Rioblanco'],
  },
  Nariño: {
    municipios: ['Pasto', 'La Unión', 'Sandoná', 'Buesaco', 'Consacá', 'Chachagüí', 'La Florida'],
    veredas: ['La Victoria', 'El Placer', 'San Francisco', 'El Vergel', 'Altamira'],
  },
  Tolima: {
    municipios: ['Planadas', 'Chaparral', 'Ibagué', 'Líbano', 'Fresno', 'Ataco', 'Roncesvalles'],
    veredas: ['Bilbao', 'Gaitania', 'La Marina', 'El Diamante', 'Santa Rosa'],
  },
  Antioquia: {
    municipios: ['Jericó', 'Andes', 'Fredonia', 'Ciudad Bolívar', 'Santa Bárbara', 'Urrao'],
    veredas: ['La Soledad', 'San Bartolo', 'Quebrada Arriba', 'La Cascada'],
  },
  Caldas: {
    municipios: ['Chinchiná', 'Manizales', 'Palestina', 'Villamaría', 'Anserma'],
    veredas: ['El Trébol', 'Bajo Español', 'Guayabal', 'La Floresta'],
  },
  Quindío: {
    municipios: ['Calarcá', 'Armenia', 'Circasia', 'Montenegro', 'Salento', 'Pijao'],
    veredas: ['La Virginia', 'Boquía', 'La Bella', 'San Rafael'],
  },
  Risaralda: {
    municipios: ['Santa Rosa de Cabal', 'Belén de Umbría', 'Pereira', 'Marsella', 'Santuario'],
    veredas: ['El Guayabo', 'La Linda', 'La Cristalina', 'San Andrés'],
  },
  Santander: {
    municipios: ['San Gil', 'Socorro', 'Curití', 'Páramo', 'Piedecuesta'],
    veredas: ['El Carmen', 'San José', 'La Laja', 'El Palmar'],
  },
};

export const VARIEDADES_POR_ESPECIE = {
  Arábica: [
    'Castillo',
    'Caturra',
    'Colombia',
    'Borbón Rosado',
    'Geisha',
    'Típica (Typica)',
    'Tabi',
    'Maragogipe',
    'Pacamara',
    'Cenicafé 1',
    'San Bernardo',
    'Bourbon Rojo',
    'Bourbon Amarillo',
  ],
  Robusta: [
    'Conilón',
    'Robusta Tropical',
    'Kouillou',
    'Robusta Selección Colombia',
  ],
};

export const TIPOS_SECADO = [
  'Mecánico dinámico',
  'Mecánico estático',
  'Mecánico por deshumidificación',
  'Solar',
];

export const PROCESOS_COSECHA = [
  'Honey amarillo',
  'Honey con fermentación',
  'Honey negro',
  'Honey rojo',
  'Lavado con fermentación',
  'Lavado tradicional',
  'Lavado Wet Hulled',
  'Natural con fermentación',
  'Natural',
];

export const INITIAL_CAFICULTOR_FINCAS = [
  {
    id: 1,
    nombre: 'Finca La Esperanza',
    pais: 'Colombia',
    departamento: 'Huila',
    municipio: 'Pitalito',
    vereda: 'El Mirador',
    latitud: '1.8554',
    longitud: '-76.0356',
    asociacion: 'ASOPROCAFE Huila',
    logoUrl: '',
    unidadArea: 'Hectáreas (ha)',
    areaCafe: 4.5,
    areaOtrosCultivos: 1.2,
    areaConservacion: 1.8,
    altura: 1820,
    lotesCount: 2,
  },
  {
    id: 2,
    nombre: 'Finca Los Nogales',
    pais: 'Colombia',
    departamento: 'Cauca',
    municipio: 'Popayán',
    vereda: 'La Rejoya',
    latitud: '2.4419',
    longitud: '-76.6063',
    asociacion: 'Cooperativa del Cauca',
    logoUrl: '',
    unidadArea: 'Hectáreas (ha)',
    areaCafe: 3.2,
    areaOtrosCultivos: 0.8,
    areaConservacion: 1.0,
    altura: 1750,
    lotesCount: 1,
  },
];

export const INITIAL_CAFICULTOR_LOTES = [
  {
    id: 1,
    nombreLote: 'Lote El Roble',
    fincaId: 1,
    fincaNombre: 'Finca La Esperanza',
    especie: 'Arábica',
    variedad: 'Geisha',
    numeroArboles: 3500,
    distanciaArboles: 1.2,
    distanciaSurcos: 1.8,
    fertilizacionesAno: 3,
    estado: 'En Producción',
  },
  {
    id: 2,
    nombreLote: 'Lote Las Acacias',
    fincaId: 1,
    fincaNombre: 'Finca La Esperanza',
    especie: 'Arábica',
    variedad: 'Borbón Rosado',
    numeroArboles: 4200,
    distanciaArboles: 1.1,
    distanciaSurcos: 1.6,
    fertilizacionesAno: 2,
    estado: 'Listo para Cosecha',
  },
  {
    id: 3,
    nombreLote: 'Lote El Manantial',
    fincaId: 2,
    fincaNombre: 'Finca Los Nogales',
    especie: 'Arábica',
    variedad: 'Castillo',
    numeroArboles: 5000,
    distanciaArboles: 1.0,
    distanciaSurcos: 1.5,
    fertilizacionesAno: 3,
    estado: 'En Crecimiento',
  },
];

export const INITIAL_CAFICULTOR_PREOFERTAS = [
  {
    id: 1,
    codigo: 'PRE-2026-001',
    loteId: 1,
    loteNombre: 'Lote El Roble',
    especie: 'Arábica',
    variedad: 'Geisha',
    cantidadKg: 1200,
    fechaProduccion: '2026-03-10',
    tipoSecado: 'Solar',
    sombrio: 'Sí',
    tipoFermentacion: 'Fermentación anaeróbica en cereza 48 horas con levaduras nativas',
    procesoCosecha: 'Honey amarillo',
    precioEstimadoCop: 34000,
    precioEstimadoUsd: 4.1,
    descripcion: 'Micro-lote de Geisha cultivado a 1,820 msnm con notas florales a jazmín, miel y durazno.',
    estado: 'En Evaluación',
  },
  {
    id: 2,
    codigo: 'PRE-2026-002',
    loteId: 2,
    loteNombre: 'Lote Las Acacias',
    especie: 'Arábica',
    variedad: 'Borbón Rosado',
    cantidadKg: 850,
    fechaProduccion: '2026-02-28',
    tipoSecado: 'Mecánico por deshumidificación',
    sombrio: 'Sí',
    tipoFermentacion: 'Lavado con fermentación prolongada 36 horas',
    procesoCosecha: 'Lavado con fermentación',
    precioEstimadoCop: 28500,
    precioEstimadoUsd: 3.45,
    descripcion: 'Borbón Rosado de acidez cítrica compleja y dulzura residual de panela y frutos rojos.',
    estado: 'Aprobada',
  },
];

export const INITIAL_CAFICULTOR_OFERTAS = [
  {
    id: 1,
    codigo: 'OFE-2026-001',
    cantidadKg: 850,
    variedad: 'Borbón Rosado',
    especie: 'Arábica',
    estado: 'Publicada',
    fincaNombre: 'Finca La Esperanza',
    puntajeSca: 87.5,
    precioSacoCop: 1420000,
    fechaPublicacion: '2026-03-01',
  },
];

// Alias para compatibilidad
export const MIS_LOTES_DATA = INITIAL_CAFICULTOR_LOTES;

