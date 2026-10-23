import { CheckCircle2, AlertTriangle, Activity, Clock } from 'lucide-react';

const STATUS_MAP = {
  success: { icon: CheckCircle2, color: 'text-brand-terracota', bg: 'bg-brand-tint' },
  warning: { icon: AlertTriangle, color: 'text-brand-orange', bg: 'bg-brand-tint-soft' },
  info:    { icon: Activity,      color: 'text-surface-500', bg: 'bg-surface-100' },
};

// Fila de actividad reciente del dashboard SuperAdmin
export default function ActivityItem({ item }) {
  const { icon: Icon, color, bg } = STATUS_MAP[item.status] ?? STATUS_MAP.info;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-surface-100 last:border-0">
      <div className={`p-2 rounded-xl ${bg} shrink-0`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-surface-700 leading-snug">{item.message}</p>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="h-3 w-3 text-surface-400" />
          <span className="text-xs text-surface-400">{item.time}</span>
        </div>
      </div>
    </div>
  );
}
