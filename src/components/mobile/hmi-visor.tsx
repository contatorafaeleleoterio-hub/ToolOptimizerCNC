import { useMachiningStore } from '@/store';
import { fmt, SEG_COLORS, SEG_ICONS, SEG_LABELS, SEG_BG } from '../shared-result-parts';
import { haptics } from '@/utils/haptics';
import { BidirectionalSlider } from '../bidirectional-slider';

export function HmiVisor() {
  const resultado = useMachiningStore((s) => s.resultado);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const baseRPM = useMachiningStore((s) => s.baseRPM);
  const baseFeed = useMachiningStore((s) => s.baseFeed);
  const manualOverrides = useMachiningStore((s) => s.manualOverrides);
  const setManualRPMPercent = useMachiningStore((s) => s.setManualRPMPercent);
  const setManualFeedPercent = useMachiningStore((s) => s.setManualFeedPercent);

  if (!resultado) return null;

  const { rpm, avanco, vcReal, mrr, seguranca } = resultado;
  const { nivel } = seguranca;

  const handleRpmChange = (p: number) => {
    setManualRPMPercent(p);
    haptics.impactLight();
  };

  const handleFeedChange = (p: number) => {
    setManualFeedPercent(p);
    haptics.impactLight();
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* ─── Status Bar (Industrial) ─── */}
      <div className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 shadow-lg ${SEG_BG[nivel]}`}>
        <div className="flex items-center gap-3">
          <span className={`material-symbols-outlined text-3xl ${SEG_COLORS[nivel]}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {SEG_ICONS[nivel]}
          </span>
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tighter leading-none ${SEG_COLORS[nivel]}`}>
              {SEG_LABELS[nivel]}
            </span>
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-0.5">
              Status do Processo
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white font-mono text-sm font-bold">Ø{ferramenta.diametro} mm</div>
          <div className="text-white/30 text-[9px] uppercase font-bold tracking-tighter">Ferramenta Atual</div>
        </div>
      </div>

      {/* ─── Main Readouts (High Contrast) ─── */}
      <div className="grid grid-cols-1 gap-4">
        {/* RPM Card */}
        <div className="bg-[#0A0D10] border-l-4 border-primary rounded-r-2xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-active:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-primary">speed</span>
          </div>
          
          <div className="relative z-10">
            <div className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-1">Rotação</div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-mono font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,217,255,0.3)]">
                {fmt(rpm)}
              </span>
              <span className="text-xl font-bold text-white/30 font-mono">RPM</span>
            </div>
            
            <div className="mt-6">
              <BidirectionalSlider
                baseValue={baseRPM}
                currentPercent={manualOverrides.rpmPercent ?? 0}
                onChange={handleRpmChange}
                color="primary"
                label="RPM Override"
                unit="RPM"
                compact
              />
            </div>
          </div>
        </div>

        {/* FEED Card */}
        <div className="bg-[#0A0D10] border-l-4 border-secondary rounded-r-2xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-active:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-secondary">moving</span>
          </div>

          <div className="relative z-10">
            <div className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-1">Avanço</div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-mono font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                {fmt(avanco)}
              </span>
              <span className="text-xl font-bold text-white/30 font-mono">mm/min</span>
            </div>

            <div className="mt-6">
              <BidirectionalSlider
                baseValue={baseFeed}
                currentPercent={manualOverrides.feedPercent ?? 0}
                onChange={handleFeedChange}
                color="secondary"
                label="Feed Override"
                unit="mm/min"
                compact
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Secondary Data (2 Columns) ─── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center">
          <span className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Vel. Corte</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-mono font-bold text-white">{vcReal.toFixed(0)}</span>
            <span className="text-[10px] text-white/40 font-mono">m/min</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center">
          <span className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Taxa Remoção</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-mono font-bold text-white">{mrr.toFixed(1)}</span>
            <span className="text-[10px] text-white/40 font-mono">cm³/min</span>
          </div>
        </div>
      </div>

      {/* ─── Action Hint ─── */}
      <div className="flex items-center justify-center gap-2 py-4 opacity-40">
        <span className="material-symbols-outlined text-sm">touch_app</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Toque nos sliders para ajustar em tempo real</span>
      </div>
    </div>
  );
}
