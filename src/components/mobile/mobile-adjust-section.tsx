import { useMachiningStore } from '@/store';
import { TipoUsinagem } from '@/types';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { MiniResultBar } from './mobile-mini-result-bar';
import { MobileFineTuneSection } from './mobile-fine-tune-section';

const MRR_BENCHMARKS: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 50,
  [TipoUsinagem.SEMI_ACABAMENTO]: 20,
  [TipoUsinagem.ACABAMENTO]: 5,
};

export function MobileAdjustSection() {
  const resultado = useMachiningStore((s) => s.resultado);
  const limites = useMachiningStore((s) => s.limitesMaquina);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
  const { gaugeAnimating, triggerPulse, safetyLevel } = useSimulationAnimation();

  const mrrBenchmark = MRR_BENCHMARKS[tipoOperacao] ?? 20;
  const mrrPct = resultado ? (resultado.mrr / mrrBenchmark) * 100 : 0;

  const pulseClass = triggerPulse && safetyLevel === 'verde'
    ? 'animate-[subtlePulse_0.9s_ease-in-out]'
    : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
    ? 'animate-[subtlePulse_0.45s_ease-in-out_2]'
    : '';

  return (
    <div className="flex flex-col min-h-full">
      {/* ─── Mini-Gauges: sticky at top of this tab ─── */}
      <div
        className={`sticky top-0 z-10 bg-[rgba(10,14,20,0.97)] backdrop-blur-xl border-b border-white/8 px-4 py-3 flex flex-col gap-2.5 ${pulseClass}`}
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="material-symbols-outlined text-primary text-sm">speed</span>
          <span className="text-[9px] uppercase tracking-widest text-white/40 font-semibold">Indicadores em Tempo Real</span>
        </div>

        {resultado ? (
          <>
            <MiniResultBar
              label="Avanço"
              value={resultado.avanco}
              maxValue={limites.maxAvanco}
              unit="mm/min"
              animating={gaugeAnimating}
            />
            <MiniResultBar
              label="MRR"
              value={mrrPct}
              maxValue={100}
              unit="%"
              badge={`${resultado.mrr.toFixed(1)} cm³/min`}
              animating={gaugeAnimating}
            />
            <MiniResultBar
              label="Saúde Ferramenta"
              value={resultado.healthScore}
              maxValue={100}
              unit="%"
              badge={resultado.healthScore === 0 ? 'BLOQUEADO' : undefined}
              animating={gaugeAnimating}
            />
          </>
        ) : (
          // Empty state — no simulation yet
          <div className="flex flex-col gap-2">
            {['Avanço', 'MRR', 'Saúde Ferramenta'].map((label) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between px-0.5">
                  <span className="text-[9px] uppercase tracking-widest text-white/20 font-semibold">{label}</span>
                  <span className="font-mono text-xs text-white/20">—</span>
                </div>
                <div className="flex gap-[2px] items-end h-[14px]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex-1 h-[8px] rounded-[1px] bg-white/5" />
                  ))}
                </div>
                <div className="h-[2px] bg-white/5 rounded-full" />
              </div>
            ))}
            <p className="text-[10px] text-white/30 text-center mt-1">
              Simule para ativar o feedback em tempo real
            </p>
          </div>
        )}
      </div>

      {/* ─── Fine-Tune sliders ─── */}
      <div className="flex-1 overflow-y-auto">
        <MobileFineTuneSection />
      </div>
    </div>
  );
}
