import { useMachiningStore } from '@/store';
import { Gauge } from './gauge';
import type { StatusSeguranca } from '@/types';

const SEG_COLORS: Record<StatusSeguranca['nivel'], string> = {
  verde: 'text-seg-verde', amarelo: 'text-seg-amarelo',
  vermelho: 'text-seg-vermelho', bloqueado: 'text-gray-500',
};
const SEG_ICONS: Record<StatusSeguranca['nivel'], string> = {
  verde: 'check_circle', amarelo: 'warning', vermelho: 'error', bloqueado: 'block',
};
const SEG_LABELS: Record<StatusSeguranca['nivel'], string> = {
  verde: 'SEGURO', amarelo: 'ALERTA', vermelho: 'CRÍTICO', bloqueado: 'BLOQUEADO',
};

const EDIT_BTN = 'w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-bold flex items-center justify-center';

export function ResultsPanel() {
  const resultado = useMachiningStore((s) => s.resultado);
  const limites = useMachiningStore((s) => s.limitesMaquina);
  const setManualRPM = useMachiningStore((s) => s.setManualRPM);
  const setManualFeed = useMachiningStore((s) => s.setManualFeed);

  if (!resultado) {
    return (
      <div className="flex flex-col gap-6 h-full items-center justify-center">
        <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-12 shadow-glass text-center">
          <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">precision_manufacturing</span>
          <p className="text-gray-500 text-sm">Configure os parâmetros e clique <span className="text-primary font-bold">Simular</span></p>
        </div>
      </div>
    );
  }

  const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
  const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
  const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);
  const powerPct = Math.min((potenciaMotor / limites.maxPotencia) * 100, 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Safety badge */}
      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
        seguranca.nivel === 'verde' ? 'bg-seg-verde/10 border-seg-verde/30' :
        seguranca.nivel === 'amarelo' ? 'bg-seg-amarelo/10 border-seg-amarelo/30' :
        seguranca.nivel === 'vermelho' ? 'bg-seg-vermelho/10 border-seg-vermelho/30' :
        'bg-gray-500/10 border-gray-500/30'
      }`}>
        <span className={`material-symbols-outlined ${SEG_COLORS[seguranca.nivel]}`}>{SEG_ICONS[seguranca.nivel]}</span>
        <span className={`text-xs font-bold uppercase tracking-widest ${SEG_COLORS[seguranca.nivel]}`}>{SEG_LABELS[seguranca.nivel]}</span>
        {seguranca.avisos.length > 0 && (
          <span className="text-[10px] text-gray-400 ml-2">({seguranca.avisos.length} aviso{seguranca.avisos.length > 1 ? 's' : ''})</span>
        )}
      </div>

      {/* Overview cards */}
      <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-gray-400">analytics</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Parâmetros Calculados</h3>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5">Resumo da Operação</p>
          </div>
        </div>
        <div className="bg-black/40 rounded-xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-4 divide-x divide-white/5">
            <MetricCell label="Spindle" value={fmt(rpm)} unit="RPM" unitColor="text-primary" />
            <MetricCell label="Feed Rate" value={fmt(avanco)} unit="mm/min" unitColor="text-secondary" />
            <MetricCell label="Power" value={potenciaMotor.toFixed(2)} unit="kW" unitColor="text-accent-orange" />
            <MetricCell label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" unitColor="text-primary" />
          </div>
        </div>
      </div>

      {/* Big numbers: RPM + Feed (editable) */}
      <div className="grid grid-cols-2 gap-4">
        <BigNumber label="Spindle Speed" value={fmt(rpm)} unit="RPM" pct={rpmPct}
          color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
          isEditable currentValue={Math.round(rpm)}
          onValueChange={(v) => setManualRPM(v)} min={100} max={limites.maxRPM} step={10} />
        <BigNumber label="Feed Rate" value={fmt(avanco)} unit="mm/min" pct={feedPct}
          color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
          isEditable currentValue={Math.round(avanco)}
          onValueChange={(v) => setManualFeed(v)} min={10} max={limites.maxAvanco} step={10} />
      </div>

      {/* Gauge */}
      <Gauge value={avanco} maxValue={limites.maxAvanco} label="Feed Efficiency" />

      {/* Progress bars */}
      <div className="grid grid-cols-3 gap-4">
        <ProgressCard label="Power Est." value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct}
          barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" />
        <ProgressCard label="MRR" value={mrr.toFixed(1)} unit="cm³/min" pct={Math.min(mrr / 100 * 100, 100)}
          barColor="bg-accent-purple" barShadow="rgba(168,85,247,0.5)" />
        <ProgressCard label="Surface Speed" value={vcReal.toFixed(0)} unit="m/min" pct={Math.min(vcReal / 500 * 100, 100)}
          barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" />
      </div>

      {/* Warnings */}
      {seguranca.avisos.length > 0 && (
        <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-seg-amarelo text-sm">warning</span> Avisos
          </h4>
          <ul className="space-y-2">
            {seguranca.avisos.map((a, i) => (
              <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                <span className="text-seg-amarelo mt-0.5">•</span>{a}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function fmt(n: number): string { return Math.round(n).toLocaleString('en-US'); }

function MetricCell({ label, value, unit, unitColor }: {
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

interface BigNumberProps {
  label: string; value: string; unit: string; pct: number;
  color: string; glow: string; barGlow: string; icon: string;
  isEditable?: boolean; currentValue?: number;
  onValueChange?: (v: number) => void; min?: number; max?: number; step?: number;
}

function BigNumber({ label, value, unit, pct, color, glow, barGlow, icon,
  isEditable, currentValue, onValueChange, min = 0, max = 99999, step = 10 }: BigNumberProps) {
  return (
    <div className="relative bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass flex flex-col justify-center items-center group overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
        <span className={`material-symbols-outlined text-3xl text-${color}`}>{icon}</span>
      </div>
      <h3 className={`text-xs uppercase tracking-[0.25em] text-${color} font-bold mb-2 relative z-10`}
        style={{ filter: `drop-shadow(0 0 8px ${glow})` }}>{label}</h3>

      <div className="flex items-center gap-2 z-10 relative mb-2">
        {isEditable && onValueChange && (
          <button className={EDIT_BTN} aria-label={`Decrease ${label}`}
            onClick={() => onValueChange(Math.max(min, (currentValue ?? 0) - step))}>−</button>
        )}
        {isEditable && onValueChange ? (
          <input type="number" value={currentValue ?? 0}
            onChange={(e) => { const v = Number(e.target.value); if (!isNaN(v)) onValueChange(Math.max(min, Math.min(max, v))); }}
            className="w-32 bg-transparent text-center text-5xl font-mono font-bold text-white tracking-tighter outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ filter: `drop-shadow(0 0 20px ${glow})` }}
            aria-label={`Edit ${label}`} />
        ) : (
          <span className="text-5xl font-mono font-bold text-white tracking-tighter"
            style={{ filter: `drop-shadow(0 0 20px ${glow})` }}>{value}</span>
        )}
        {isEditable && onValueChange && (
          <button className={EDIT_BTN} aria-label={`Increase ${label}`}
            onClick={() => onValueChange(Math.min(max, (currentValue ?? 0) + step))}>+</button>
        )}
      </div>

      <span className="text-lg text-gray-400 font-medium font-mono uppercase tracking-widest z-10">{unit}</span>
      <div className="mt-4 w-full max-w-sm bg-black/40 h-1.5 rounded-full overflow-hidden relative z-10">
        <div className={`h-full bg-${color} rounded-full relative`}
          style={{ width: `${pct}%`, boxShadow: `0 0 15px ${barGlow}` }}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-white rounded-full shadow-[0_0_5px_white]" />
        </div>
      </div>
    </div>
  );
}

function ProgressCard({ label, value, unit, pct, barColor, barShadow }: {
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
