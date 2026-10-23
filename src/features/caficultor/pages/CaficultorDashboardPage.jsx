import { useNavigate } from 'react-router-dom';
import {
  Coffee,
  Leaf,
  FileText,
  ShoppingCart,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import {
  useFincas,
  useLotes,
  usePreofertas,
  useOfertas,
} from '../hooks/useCaficultorData';

export default function CaficultorDashboardPage() {
  const navigate = useNavigate();

  // Las métricas se derivan de los datos del servidor (caché compartida
  // con las demás pantallas, así que se mantienen sincronizadas).
  const fincas = useFincas().data ?? [];
  const lotes = useLotes().data ?? [];
  const preofertas = usePreofertas().data ?? [];
  const ofertas = useOfertas().data ?? [];

  const totalFincas = fincas.length;
  const totalLotes = lotes.length;
  const totalPreofertas = preofertas.length;
  const preofertasRealizadas = preofertas.filter(
    (p) => p.estado === 'Aprobada'
  ).length;
  const totalOfertas = ofertas.length;
  const ofertasRealizadas = ofertas.filter(
    (o) => o.estado === 'Publicada'
  ).length;

  const pasos = [
    {
      paso: 'Paso 1',
      titulo: 'Ingresa la información de tu finca',
      icono: Coffee,
      items: [
        { etiqueta: 'Finca', valor: totalFincas },
        { etiqueta: 'Avance', valor: '100%' },
      ],
      porcentaje: 100,
      colorFondoIcono: 'bg-amber-100 text-[#AD2E01]',
      colorBarra: 'bg-[#AD2E01]',
      ruta: '/caficultor/fincas',
    },
    {
      paso: 'Paso 2',
      titulo: 'Ingresa la información del lote de tu finca',
      icono: Leaf,
      items: [
        { etiqueta: 'Lotes', valor: totalLotes },
        { etiqueta: 'Avance', valor: '75%' },
      ],
      porcentaje: 75,
      colorFondoIcono: 'bg-emerald-100 text-emerald-800',
      colorBarra: 'bg-emerald-700',
      ruta: '/caficultor/lotes',
    },
    {
      paso: 'Paso 3',
      titulo: 'Realiza la preoferta de café',
      icono: FileText,
      items: [
        { etiqueta: 'Preoferta', valor: totalPreofertas },
        { etiqueta: 'Realiza', valor: preofertasRealizadas },
      ],
      porcentaje: null,
      colorFondoIcono: 'bg-amber-50 text-amber-900 border border-amber-200',
      colorBarra: 'bg-amber-800',
      ruta: '/caficultor/pre-ofertas',
    },
    {
      paso: 'Paso 4',
      titulo: 'Revisa el estado de la oferta',
      icono: ShoppingCart,
      items: [
        { etiqueta: 'Oferta', valor: totalOfertas },
        { etiqueta: 'Realiza', valor: ofertasRealizadas },
      ],
      porcentaje: null,
      colorFondoIcono: 'bg-stone-100 text-stone-800 border border-stone-200',
      colorBarra: 'bg-stone-800',
      ruta: '/caficultor/ofertas',
    },
    {
      paso: 'Paso 5',
      titulo: 'Actualiza tu perfil',
      icono: UserCheck,
      items: [
        { etiqueta: 'Avance', valor: '90%' },
      ],
      porcentaje: 90,
      colorFondoIcono: 'bg-amber-100 text-[#AD2E01]',
      colorBarra: 'bg-[#AD2E01]',
      ruta: '/profile',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Título de Bienvenida — Sin banner negro ni textos adicionales */}
      <div className="py-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          ¡Hola Caficultor, te damos la bienvenida!
        </h1>
      </div>

      {/* Grid de las 5 Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pasos.map((item) => {
          const Icono = item.icono;
          return (
            <div
              key={item.paso}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-stone-300 transition-colors"
            >
              <div>
                {/* Cabecera del Paso */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#AD2E01] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/50">
                    {item.paso}
                  </span>
                </div>

                {/* Loguito / Icono Centrado */}
                <div className="py-6 flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl ${item.colorFondoIcono} flex items-center justify-center shadow-xs mb-3`}
                  >
                    <Icono className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 tracking-tight min-h-[44px] flex items-center justify-center">
                    {item.titulo}
                  </h3>
                </div>

                {/* Métricas Solicitadas */}
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 mb-6 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    {item.items.map((it) => (
                      <span key={it.etiqueta} className="font-semibold text-stone-600">
                        {it.etiqueta}:{' '}
                        <strong className="text-stone-900 font-bold">
                          {it.valor}
                        </strong>
                      </span>
                    ))}
                  </div>
                  {item.porcentaje !== null && (
                    <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${item.colorBarra}`}
                        style={{ width: `${item.porcentaje}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Botón de Continuar */}
              <button
                type="button"
                onClick={() => navigate(item.ruta)}
                className="w-full py-2.5 px-4 bg-[#AD2E01] hover:bg-[#8D2501] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
