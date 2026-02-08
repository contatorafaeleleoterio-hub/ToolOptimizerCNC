import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';

const SLIDER_CONFIG = [
  { key: 'vc' as const, label: 'Vc', fullLabel: 'CUTTING SPEED', unit: 'M/MIN', color: 'primary',
    rgb: '0,217,255', desc: 'Controls tangential speed at tool edge. Higher values improve finish but increase heat.',
    min: 1, max: 1200, step: 1 },
  { key: 'fz' as const, label: 'fz', fullLabel: 'FEED PER TOOTH', unit: 'MM/TOOTH', color: 'secondary',
    rgb: '57,255,20', desc: 'Chip thickness per flute. Impacts tool life and chip evacuation.',
    min: 0.01, max: 1, step: 0.01 },
  { key: 'ae' as const, label: 'ae', fullLabel: 'RADIAL ENGAGEMENT', unit: 'MM', color: 'accent-purple',
    rgb: '168,85,247', desc: 'Width of cut perpendicular to tool axis. Affects lateral pressure and deflection.',
    min: 0.1, max: 50, step: 0.1 },
  { key: 'ap' as const, label: 'ap', fullLabel: 'AXIAL DEPTH', unit: 'MM', color: 'accent-orange',
    rgb: '249,115,22', desc: 'Depth of cut along tool axis. Primary driver for material removal rate.',
    min: 0.1, max: 50, step: 0.1 },
] as const;

export function FineTunePanel() {
  const parametros = useMachiningStore((s) => s.parametros);
  const setParametros = useMachiningStore((s) => s.setParametros);
  const materialId = useMachiningStore((s) => s.materialId);
  const resultado = useMachiningStore((s) => s.resultado);

  const material = MATERIAIS.find((m) => m.id === materialId);

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass h-full flex flex-col">
      <h2 className="text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2 text-gray-300">
        <span className="material-symbols-outlined text-lg">tune</span> Fine Tune
      </h2>

      <div className="flex-1 flex flex-col justify-between gap-6 px-1">
        {SLIDER_CONFIG.map(({ key, label, fullLabel, unit, color, rgb, desc, min, max, step }) => {
          const val = parametros[key];
          const pct = ((val - min) / (max - min)) * 100;
          const display = key === 'fz' ? val.toFixed(2) : key === 'ae' || key === 'ap' ? val.toFixed(1) : val.toFixed(0);

          return (
            <div key={key} className="flex flex-col gap-2 group relative overflow-hidden">
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-baseline gap-2">
                  <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
                  <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">{fullLabel}</span>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold font-mono text-${color}`}
                    style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}>{display}</div>
                  <div className="text-[9px] text-gray-500 font-mono tracking-wider">{unit}</div>
                </div>
              </div>
              <div className="relative h-1.5 w-full bg-black/40 rounded-full flex items-center">
                <div className={`absolute left-0 h-full bg-${color} rounded-full`}
                  style={{ width: `${pct}%`, boxShadow: `0 0 10px rgba(${rgb},0.6)` }} />
                <input
                  type="range"
                  min={min} max={max} step={step}
                  value={val}
                  onChange={(e) => setParametros({ [key]: Number(e.target.value) })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                />
                <div className={`absolute w-4 h-4 bg-background-dark border-2 border-${color} rounded-full cursor-ew-resize z-0 flex items-center justify-center -translate-x-1/2 pointer-events-none`}
                  style={{ left: `${pct}%`, boxShadow: `0 0 15px rgba(${rgb},0.8)` }}>
                  <div className={`w-1.5 h-1.5 bg-${color} rounded-full`} />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 leading-tight mt-1 opacity-70">{desc}</p>
              <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-${color}/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          );
        })}
      </div>

      {/* MRR summary */}
      <div className="mt-8 pt-5 border-t border-white/5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Material Removal</span>
          {resultado && <span className="material-symbols-outlined text-xs text-secondary animate-pulse">trending_up</span>}
        </div>
        <div className="bg-black/30 p-4 rounded-xl flex items-center justify-between border border-white/5 shadow-inner-glow">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-600 text-lg">delete_sweep</span>
            <span className="text-xs text-gray-400">MRR</span>
          </div>
          <span className="font-mono text-lg font-bold text-white">
            {resultado ? resultado.mrr.toFixed(1) : '—'} <span className="text-xs text-gray-600">cm³/min</span>
          </span>
        </div>
        {material && (
          <p className="text-[10px] text-gray-600 mt-2">{material.nome} — {material.dureza}</p>
        )}
      </div>
    </div>
  );
}
