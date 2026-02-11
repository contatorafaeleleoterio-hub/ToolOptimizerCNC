import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';
import { SectionTitle } from '../ui-helpers';

const SLIDER_CONFIG = [
  { key: 'vc' as const, label: 'Vc', fullLabel: 'Velocidade Corte', unit: 'm/min', color: 'primary',
    rgb: '0,217,255', min: 1, max: 1200, step: 1 },
  { key: 'fz' as const, label: 'fz', fullLabel: 'Avanço/Dente', unit: 'mm', color: 'secondary',
    rgb: '57,255,20', min: 0.01, max: 1, step: 0.01 },
  { key: 'ae' as const, label: 'ae', fullLabel: 'Eng. Radial', unit: 'mm', color: 'accent-purple',
    rgb: '168,85,247', min: 0.1, max: 50, step: 0.1 },
  { key: 'ap' as const, label: 'ap', fullLabel: 'Prof. Axial', unit: 'mm', color: 'accent-orange',
    rgb: '249,115,22', min: 0.1, max: 50, step: 0.1 },
] as const;

const BTN_CLS = 'w-10 h-10 rounded-lg bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 transition-all text-sm font-bold flex items-center justify-center';

export function MobileFineTuneSection() {
  const parametros = useMachiningStore((s) => s.parametros);
  const setParametros = useMachiningStore((s) => s.setParametros);
  const materialId = useMachiningStore((s) => s.materialId);
  const resultado = useMachiningStore((s) => s.resultado);
  const material = MATERIAIS.find((m) => m.id === materialId);

  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <SectionTitle color="bg-primary" label="Fine Tune" />
        <div className="flex flex-col gap-5">
          {SLIDER_CONFIG.map(({ key, label, fullLabel, unit, color, rgb, min, max, step }) => {
            const val = parametros[key];
            const pct = ((val - min) / (max - min)) * 100;
            const display = key === 'fz' ? val.toFixed(2) : key === 'ae' || key === 'ap' ? val.toFixed(1) : val.toFixed(0);

            return (
              <div key={key} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{fullLabel}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <input type="number" value={display} step={step} min={min} max={max}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (!isNaN(n) && n >= min && n <= max) setParametros({ [key]: n });
                      }}
                      className={`w-16 bg-transparent border-none text-right font-mono text-lg font-bold text-${color} outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      style={{ filter: `drop-shadow(0 0 6px rgba(${rgb},0.4))` }}
                      aria-label={`${label} value`} />
                    <span className="text-[9px] text-gray-500 font-mono">{unit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className={BTN_CLS} aria-label={`Decrease ${label}`}
                    onClick={() => setParametros({ [key]: Math.max(min, +(val - step).toFixed(4)) })}>−</button>
                  <div className="relative h-2 flex-1 bg-black/40 rounded-full flex items-center">
                    <div className={`absolute left-0 h-full bg-${color} rounded-full`}
                      style={{ width: `${pct}%`, boxShadow: `0 0 8px rgba(${rgb},0.6)` }} />
                    <input type="range" min={min} max={max} step={step} value={val}
                      onChange={(e) => setParametros({ [key]: Number(e.target.value) })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                      aria-label={`${label} slider`} />
                    <div className={`absolute w-5 h-5 bg-background-dark border-2 border-${color} rounded-full z-0 -translate-x-1/2 pointer-events-none`}
                      style={{ left: `${pct}%`, boxShadow: `0 0 12px rgba(${rgb},0.8)` }}>
                      <div className={`absolute inset-1 bg-${color} rounded-full`} />
                    </div>
                  </div>
                  <button className={BTN_CLS} aria-label={`Increase ${label}`}
                    onClick={() => setParametros({ [key]: Math.min(max, +(val + step).toFixed(4)) })}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MRR summary */}
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Material Removal</span>
          {resultado && <span className="material-symbols-outlined text-xs text-secondary animate-pulse">trending_up</span>}
        </div>
        <div className="bg-black/30 p-4 rounded-xl flex items-center justify-between border border-white/5">
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
    </section>
  );
}
