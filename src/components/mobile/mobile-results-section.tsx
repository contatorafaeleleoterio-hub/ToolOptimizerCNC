import { useMachiningStore } from '@/store';
import { Gauge } from '../gauge';
import { ToolSummaryViewer } from '../tool-summary-viewer';
import { fmt, SafetyBadge, MetricCell, BigNumber, ProgressCard, WarningsSection } from '../shared-result-parts';

export function MobileResultsSection() {
  const resultado = useMachiningStore((s) => s.resultado);
  const limites = useMachiningStore((s) => s.limitesMaquina);
  const setManualRPM = useMachiningStore((s) => s.setManualRPM);
  const setManualFeed = useMachiningStore((s) => s.setManualFeed);

  return (
    <section className="flex flex-col gap-4 px-4">
      <ToolSummaryViewer />

      {!resultado && (
        <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-600 mb-3 block">precision_manufacturing</span>
          <p className="text-gray-500 text-sm">Configure os parâmetros e clique <span className="text-primary font-bold">Simular</span></p>
        </div>
      )}

      {resultado && (() => {
        const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
        const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
        const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);
        const powerPct = Math.min((potenciaMotor / limites.maxPotencia) * 100, 100);

        return (
          <>
            <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />

            {/* Overview metrics 2x2 */}
            <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 shadow-glass">
              <div className="grid grid-cols-2 divide-x divide-y divide-white/5">
                <MetricCell label="Rotação" value={fmt(rpm)} unit="RPM" unitColor="text-primary" />
                <MetricCell label="Avanço" value={fmt(avanco)} unit="mm/min" unitColor="text-secondary" />
                <MetricCell label="Potência" value={potenciaMotor.toFixed(2)} unit="kW" unitColor="text-accent-orange" />
                <MetricCell label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" unitColor="text-primary" />
              </div>
            </div>

            {/* Big numbers (stacked on mobile) */}
            <BigNumber label="Rotação (RPM)" value={fmt(rpm)} unit="RPM" pct={rpmPct}
              color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
              isEditable currentValue={Math.round(rpm)}
              onValueChange={(v) => setManualRPM(v)} min={100} max={limites.maxRPM} step={10} />
            <BigNumber label="Avanço (mm/min)" value={fmt(avanco)} unit="mm/min" pct={feedPct}
              color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
              isEditable currentValue={Math.round(avanco)}
              onValueChange={(v) => setManualFeed(v)} min={10} max={limites.maxAvanco} step={10} />

            {/* Gauge */}
            <div className="flex justify-center">
              <Gauge value={avanco} maxValue={limites.maxAvanco} label="Eficiência de Avanço" />
            </div>

            {/* Progress bars (stacked) */}
            <div className="flex flex-col gap-3">
              <ProgressCard label="Potência Est." value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct}
                barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" />
              <ProgressCard label="MRR" value={mrr.toFixed(1)} unit="cm³/min" pct={Math.min(mrr / 100 * 100, 100)}
                barColor="bg-accent-purple" barShadow="rgba(168,85,247,0.5)" />
              <ProgressCard label="Vel. Superficial" value={vcReal.toFixed(0)} unit="m/min" pct={Math.min(vcReal / 500 * 100, 100)}
                barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" />
            </div>

            <WarningsSection avisos={seguranca.avisos} />
          </>
        );
      })()}
    </section>
  );
}
