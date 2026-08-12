import { useMachiningStore } from '@/store';
import { TipoUsinagem } from '@/types';
import { MiniResultBar } from './mobile-mini-result-bar';
import { SEG_COLORS } from '../shared-result-parts';

const MRR_BENCHMARKS: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 50,
  [TipoUsinagem.SEMI_ACABAMENTO]: 20,
  [TipoUsinagem.ACABAMENTO]: 5,
};

/**
 * 3 MiniResultBar gauges (Avanço/MRR/Saúde Ferramenta) — single source shared by
 * the Ajustar tab (sticky), the HmiVisor and the Educational view of Resultados.
 * Honest empty state (dashes, no fake zeros) when there is no resultado yet.
 */
export function MobileIndicatorsBlock() {
  const resultado = useMachiningStore((s) => s.resultado);
  const limites = useMachiningStore((s) => s.limitesMaquina);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);

  const mrrBenchmark = MRR_BENCHMARKS[tipoOperacao] ?? 20;
  const mrrPct = resultado ? (resultado.mrr / mrrBenchmark) * 100 : 0;

  if (!resultado) {
    return (
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
    );
  }

  return (
    <>
      <MiniResultBar
        label="Avanço"
        value={resultado.avanco}
        maxValue={limites.maxAvanco}
        unit="mm/min"
      />
      <MiniResultBar
        label="MRR"
        value={mrrPct}
        maxValue={100}
        unit="%"
        badge={`${resultado.mrr.toFixed(1)} cm³/min`}
      />
      <MiniResultBar
        label="Saúde Ferramenta"
        value={resultado.healthScore}
        maxValue={100}
        unit="%"
      />
      {/* Reason line — only when something is off, so it reads as an alarm, not as noise */}
      {resultado.healthLevel !== 'verde' && (
        <span className={`text-[9px] uppercase tracking-widest font-semibold -mt-1 px-0.5 ${SEG_COLORS[resultado.healthLevel]}`}>
          {resultado.healthBadge.replace('\n', ' ')}
        </span>
      )}
    </>
  );
}
