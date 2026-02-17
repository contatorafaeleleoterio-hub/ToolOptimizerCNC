import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';
import { BidirectionalSlider } from './bidirectional-slider';

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

export function FineTunePanel() {
  const parametros = useMachiningStore((s) => s.parametros);
  const baseParams = useMachiningStore((s) => s.baseParams);
  const manualOverrides = useMachiningStore((s) => s.manualOverrides);
  const setParamPercent = useMachiningStore((s) => s.setParamPercent);
  const materialId = useMachiningStore((s) => s.materialId);
  const resultado = useMachiningStore((s) => s.resultado);
  const material = MATERIAIS.find((m) => m.id === materialId);

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass h-full flex flex-col overflow-y-auto">
      <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-gray-300">
        <span className="material-symbols-outlined text-base">tune</span> Fine Tune
      </h2>

      <div className="flex-1 flex flex-col justify-between gap-3 px-1">
        {SLIDER_CONFIG.map(({ key, label, fullLabel, unit, color, rgb }) => {
          const val = parametros[key];
          const baseVal = baseParams[key];
          const percentKey = `${key}Percent` as keyof typeof manualOverrides;
          const currentPercent = (manualOverrides[percentKey] as number) ?? 0;
          const display = key === 'fz' || key === 'ap' ? val.toFixed(2) : key === 'ae' ? val.toFixed(1) : val.toFixed(0);

          return (
            <div key={key} className="flex flex-col gap-1 group relative">
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-baseline gap-2">
                  <span className={`text-xs font-bold font-mono text-${color}`}>{label}</span>
                  <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase">{fullLabel}</span>
                </div>
                <div className="text-right">
                  <span className={`font-mono text-lg font-bold text-${color}`}
                    style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}>
                    {display}
                  </span>
                  <div className="text-[8px] text-gray-500 font-mono tracking-wider">{unit}</div>
                </div>
              </div>

              <BidirectionalSlider
                baseValue={baseVal}
                currentPercent={currentPercent}
                onChange={(percent) => setParamPercent(key, percent)}
                color={color}
                rgb={rgb}
                label={label}
                unit={unit}
              />

              <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-${color}/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left overflow-clip`} />
            </div>
          );
        })}
      </div>

      {/* MRR summary */}
      <div className="mt-4 pt-3 border-t border-white/5">
        <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between border border-white/5 shadow-inner-glow">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-600 text-sm">delete_sweep</span>
            <span className="text-[10px] text-gray-400">MRR</span>
          </div>
          <span className="font-mono text-base font-bold text-white">
            {resultado ? resultado.mrr.toFixed(1) : '—'} <span className="text-[10px] text-gray-600">cm³/min</span>
          </span>
        </div>
        {material && <p className="text-[9px] text-gray-600 mt-1">{material.nome} — {material.dureza}</p>}
      </div>
    </div>
  );
}
