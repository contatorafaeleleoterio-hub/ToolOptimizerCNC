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
    icon: 'text-cyan-400',
    value: 'text-cyan-300',
    border: 'border-cyan-500/20',
    glow: 'shadow-cyan-500/10',
  },
  green: {
    icon: 'text-green-400',
    value: 'text-green-300',
    border: 'border-green-500/20',
    glow: 'shadow-green-500/10',
  },
  yellow: {
    icon: 'text-yellow-400',
    value: 'text-yellow-300',
    border: 'border-yellow-500/20',
    glow: 'shadow-yellow-500/10',
  },
  red: {
    icon: 'text-red-400',
    value: 'text-red-300',
    border: 'border-red-500/20',
    glow: 'shadow-red-500/10',
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
