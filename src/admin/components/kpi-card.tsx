/**
 * KpiCard — reusable KPI card for admin dashboard
 * Shows icon, numeric value, label, and optional trend indicator
 */

interface Props {
  icon: string; // material-symbols-outlined name
  value: number | string;
  label: string;
  color: 'cyan' | 'green' | 'yellow' | 'red' | 'gray';
  description?: string;
}

const COLOR_MAP: Record<string, { icon: string; value: string; border: string; glow: string }> = {
  cyan: {
    icon: 'text-primary',
    value: 'text-primary',
    border: 'border-primary/20',
    glow: 'shadow-primary/10',
  },
  green: {
    icon: 'text-seg-verde',
    value: 'text-seg-verde',
    border: 'border-seg-verde/20',
    glow: 'shadow-seg-verde/10',
  },
  yellow: {
    icon: 'text-seg-amarelo',
    value: 'text-seg-amarelo',
    border: 'border-seg-amarelo/20',
    glow: 'shadow-seg-amarelo/10',
  },
  red: {
    icon: 'text-seg-vermelho',
    value: 'text-seg-vermelho',
    border: 'border-seg-vermelho/20',
    glow: 'shadow-seg-vermelho/10',
  },
  gray: {
    icon: 'text-gray-400',
    value: 'text-gray-300',
    border: 'border-white/10',
    glow: 'shadow-black/20',
  },
};

export function KpiCard({ icon, value, label, color, description }: Props) {
  const colors = COLOR_MAP[color] ?? COLOR_MAP.gray;

  return (
    <div
      className={`
        flex flex-col gap-3 p-5 rounded-xl
        bg-white/5 border ${colors.border}
        shadow-lg ${colors.glow}
        transition-all hover:bg-white/8
      `}
    >
      <div className="flex items-start justify-between">
        <span className={`material-symbols-outlined text-2xl ${colors.icon}`}>{icon}</span>
      </div>
      <div>
        <p className={`text-3xl font-bold font-mono ${colors.value}`}>{value}</p>
        <p className="text-sm font-semibold text-gray-300 mt-1">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
