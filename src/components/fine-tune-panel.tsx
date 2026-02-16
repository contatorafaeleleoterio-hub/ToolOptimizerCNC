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
    min: 0.05, max: 6, step: 0.05 },
] as const;

const BTN_CLS = 'w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-bold flex items-center justify-center';

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
          const display = key === 'fz' || key === 'ap' ? val.toFixed(2) : key === 'ae' ? val.toFixed(1) : val.toFixed(0);

          return (
            <div key={key} className="flex flex-col gap-2 group relative">
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-baseline gap-2">
                  <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
                  <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">{fullLabel}</span>
                </div>
                <div className="text-right">
                  <input type="number" value={display} step={step} min={min} max={max}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (!isNaN(n) && n >= min && n <= max) setParametros({ [key]: n });
                    }}
                    className={`w-20 bg-transparent border-none text-right font-mono text-xl font-bold text-${color} outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}
                    aria-label={`${label} value`} />
                  <div className="text-[9px] text-gray-500 font-mono tracking-wider">{unit}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className={BTN_CLS} aria-label={`Decrease ${label}`}
                  onClick={() => setParametros({ [key]: Math.max(min, +(val - step).toFixed(4)) })}>−</button>
                <div className="relative h-6 flex-1 flex items-center">
                  <input type="range" min={min} max={max} step={step} value={val}
                    onChange={(e) => setParametros({ [key]: Number(e.target.value) })}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgba(${rgb},1) 0%, rgba(${rgb},1) ${pct}%, rgba(0,0,0,0.4) ${pct}%, rgba(0,0,0,0.4) 100%)`,
                      '--thumb-color': `rgba(${rgb},1)`,
                      '--thumb-glow': `0 0 15px rgba(${rgb},0.8)`,
                    } as React.CSSProperties}
                    aria-label={`${label} slider`} />
                </div>
                <button className={BTN_CLS} aria-label={`Increase ${label}`}
                  onClick={() => setParametros({ [key]: Math.min(max, +(val + step).toFixed(4)) })}>+</button>
              </div>

              <p className="text-[10px] text-gray-500 leading-tight mt-1 opacity-70">{desc}</p>
              <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-${color}/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left overflow-clip`} />
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
        {material && <p className="text-[10px] text-gray-600 mt-2">{material.nome} — {material.dureza}</p>}
      </div>
    </div>
  );
}
