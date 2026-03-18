/**
 * MiniChart — horizontal bar chart for admin usage stats and analytics
 * Reusable in Phase 5 (usage) and Phase 6 (Cloudflare analytics)
 */

import type { UsageSummary } from '../types/admin-types';

interface MiniChartProps {
  data: UsageSummary[];
  color?: string; // CSS color string (default: cyan neon)
  emptyMessage?: string;
}

const OP_LABELS: Record<string, string> = {
  desbaste: 'Desbaste',
  semi: 'Semi-acabamento',
  acabamento: 'Acabamento',
};

export function formatLabel(label: string): string {
  return OP_LABELS[label] ?? label;
}

export function MiniChart({
  data,
  color = '#00D9FF',
  emptyMessage = 'Sem dados',
}: MiniChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-16">
        <p className="text-sm text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.count));

  return (
    <div className="space-y-2">
      {data.map((item) => {
        const pct = maxValue > 0 ? (item.count / maxValue) * 100 : 0;
        return (
          <div key={item.label} className="flex items-center gap-3">
            {/* Label */}
            <span
              className="text-xs text-gray-400 truncate text-right shrink-0"
              style={{ width: 140 }}
              title={formatLabel(item.label)}
            >
              {formatLabel(item.label)}
            </span>

            {/* Bar track */}
            <div className="relative flex-1 h-5 rounded overflow-hidden bg-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.65 }}
                aria-label={`${formatLabel(item.label)}: ${item.count}`}
              />
            </div>

            {/* Count */}
            <span
              className="text-xs font-mono font-semibold shrink-0 tabular-nums"
              style={{ color, minWidth: 28, textAlign: 'right' }}
            >
              {item.count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
