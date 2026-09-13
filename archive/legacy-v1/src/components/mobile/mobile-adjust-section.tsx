import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { MobileIndicatorsBlock } from './mobile-indicators-block';
import { MobileFineTuneSection } from './mobile-fine-tune-section';

export function MobileAdjustSection() {
  const { triggerPulse, safetyLevel } = useSimulationAnimation();

  const pulseClass = triggerPulse && safetyLevel === 'verde'
    ? 'animate-[subtlePulse_0.9s_ease-in-out]'
    : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
    ? 'animate-[subtlePulse_0.45s_ease-in-out_2]'
    : '';

  return (
    <div className="flex flex-col min-h-full">
      {/* ─── Mini-Gauges: sticky at top of this tab ─── */}
      <div
        className={`sticky top-0 z-10 bg-[rgba(10,14,20,0.97)] backdrop-blur-xl border-b border-white/10 px-4 py-3 flex flex-col gap-3 ${pulseClass}`}
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="material-symbols-outlined text-primary text-sm">speed</span>
          <span className="text-[9px] uppercase tracking-widest text-white/40 font-semibold">Indicadores em Tempo Real</span>
        </div>

        <MobileIndicatorsBlock />
      </div>

      {/* ─── Fine-Tune sliders ─── */}
      <div className="flex-1 overflow-y-auto pb-32">
        <MobileFineTuneSection />
      </div>
    </div>
  );
}
