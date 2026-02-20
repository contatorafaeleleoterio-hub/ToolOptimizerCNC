/** Shared sub-components used by both desktop ResultsPanel and MobilePage */
import type { StatusSeguranca } from '@/types';
import { BidirectionalSlider } from './bidirectional-slider';

export function fmt(n: number): string { return Math.round(n).toLocaleString('pt-BR'); }

export const SEG_COLORS: Record<StatusSeguranca['nivel'], string> = {
  verde: 'text-seg-verde', amarelo: 'text-seg-amarelo',
  vermelho: 'text-seg-vermelho', bloqueado: 'text-gray-500',
};
export const SEG_ICONS: Record<StatusSeguranca['nivel'], string> = {
  verde: 'check_circle', amarelo: 'warning', vermelho: 'error', bloqueado: 'block',
};
export const SEG_LABELS: Record<StatusSeguranca['nivel'], string> = {
  verde: 'SEGURO', amarelo: 'ALERTA', vermelho: 'CRÍTICO', bloqueado: 'BLOQUEADO',
};

export const SEG_BG: Record<StatusSeguranca['nivel'], string> = {
  verde: 'bg-seg-verde/10 border-seg-verde/30',
  amarelo: 'bg-seg-amarelo/10 border-seg-amarelo/30',
  vermelho: 'bg-seg-vermelho/10 border-seg-vermelho/30',
  bloqueado: 'bg-gray-500/10 border-gray-500/30',
};

export function MetricCell({ label, value, unit, unitColor }: {
  label: string; value: string; unit: string; unitColor: string;
}) {
  return (
    <div className="p-4 flex flex-col gap-1">
      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white font-mono transition-all duration-500">{value}</span>
        <span className={`text-[10px] ${unitColor} font-bold`}>{unit}</span>
      </div>
    </div>
  );
}

export interface BigNumberProps {
  label: string; value: string; unit: string; pct: number;
  color: string; glow: string; barGlow: string; icon: string;
  isEditable?: boolean; currentValue?: number;
  onValueChange?: (v: number) => void; min?: number; max?: number; step?: number;
  // Bidirectional slider props
  useBidirectionalSlider?: boolean;
  baseValue?: number; // Calculated value (center = 0%)
  currentPercent?: number; // Current adjustment percentage (-150 to +150)
  onPercentChange?: (percent: number) => void;
  rgb?: string; // RGB values for slider color
}

export function BigNumber({ label, value, unit, pct, color, glow, barGlow, icon,
  useBidirectionalSlider, baseValue, currentPercent = 0, onPercentChange, rgb }: BigNumberProps) {
  return (
    <div className="relative bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass flex flex-col justify-center group overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
        <span className={`material-symbols-outlined text-3xl text-${color}`}>{icon}</span>
      </div>
      <h3 className={`text-xs uppercase tracking-[0.25em] text-${color} font-bold mb-2 relative z-10`}
        style={{ filter: `drop-shadow(0 0 8px ${glow})` }}>{label}</h3>

      {/* Big number display */}
      <div className="flex items-center gap-2 z-10 relative mb-2">
        <span className="text-5xl font-mono font-bold text-white tracking-tighter"
          style={{ filter: `drop-shadow(0 0 20px ${glow})` }}>{value}</span>
      </div>

      <span className="text-lg text-gray-400 font-medium font-mono uppercase tracking-widest z-10">{unit}</span>

      {/* Bidirectional slider OR simple progress bar */}
      {useBidirectionalSlider && onPercentChange && baseValue !== undefined && rgb ? (
        <div className="mt-4 w-full z-10">
          <BidirectionalSlider
            baseValue={baseValue}
            currentPercent={currentPercent}
            onChange={onPercentChange}
            color={color}
            rgb={rgb}
            label={label}
            unit={unit}
          />
        </div>
      ) : (
        <div className="mt-4 w-full max-w-sm bg-black/40 h-1.5 rounded-full overflow-hidden relative z-10">
          <div className={`h-full bg-${color} rounded-full relative`}
            style={{ width: `${pct}%`, boxShadow: `0 0 15px ${barGlow}` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-white rounded-full shadow-[0_0_5px_white]" />
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressCard({ label, value, unit, pct, barColor, barShadow }: {
  label: string; value: string; unit: string; pct: number; barColor: string; barShadow: string;
}) {
  return (
    <div className="bg-surface-dark backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:bg-white/5 transition-colors group relative overflow-hidden">
      <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{label}</div>
      <div className="text-3xl font-mono text-white tracking-tight">
        {value} <span className="text-sm text-gray-500 font-sans font-normal">{unit}</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
        <div className={`h-full ${barColor}`} style={{ width: `${pct}%`, boxShadow: `0 0 10px ${barShadow}` }} />
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-[2px] ${barColor}/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </div>
  );
}

export function SafetyBadge({ nivel, avisosCount }: { nivel: StatusSeguranca['nivel']; avisosCount: number }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${SEG_BG[nivel]}`}>
      <span className={`material-symbols-outlined ${SEG_COLORS[nivel]}`}>{SEG_ICONS[nivel]}</span>
      <span className={`text-xs font-bold uppercase tracking-widest ${SEG_COLORS[nivel]}`}>{SEG_LABELS[nivel]}</span>
      {avisosCount > 0 && (
        <span className="text-[10px] text-gray-400 ml-2">({avisosCount} aviso{avisosCount > 1 ? 's' : ''})</span>
      )}
    </div>
  );
}

export function WarningsSection({ avisos }: { avisos: string[] }) {
  if (avisos.length === 0) return null;
  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass">
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-seg-amarelo text-sm">warning</span> Avisos
      </h4>
      <ul className="space-y-2">
        {avisos.map((a, i) => (
          <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
            <span className="text-seg-amarelo mt-0.5">•</span>{a}
          </li>
        ))}
      </ul>
    </div>
  );
}
