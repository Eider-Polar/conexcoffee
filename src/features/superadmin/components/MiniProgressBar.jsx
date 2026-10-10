// Barra de progreso compacta para los indicadores del dashboard
export default function MiniProgressBar({ value, total, color }) {
  const pct = Math.min(Math.round((value / total) * 100), 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
        <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold text-surface-700 w-10 text-right">{pct}%</span>
    </div>
  );
}
