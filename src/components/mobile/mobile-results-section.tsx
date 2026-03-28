import { useMachiningStore } from '@/store';
import { useHistoryStore } from '@/store';
import { TipoUsinagem } from '@/types/index';
import { Gauge } from '../gauge';
import { FormulaCard, Fraction } from '../formula-card';
import { ToolSummaryViewer } from '../tool-summary-viewer';
import { fmt, SafetyBadge, MetricCell, BigNumber, ProgressCard, WarningsSection } from '../shared-result-parts';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';

// MRR benchmarks by operation type (cm³/min) — same as desktop
const MRR_BENCHMARKS: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 50,
  [TipoUsinagem.SEMI_ACABAMENTO]: 20,
  [TipoUsinagem.ACABAMENTO]: 5,
};

export function MobileResultsSection() {
  const storeResultado = useMachiningStore((s) => s.resultado);
  const limites = useMachiningStore((s) => s.limitesMaquina);
  const parametros = useMachiningStore((s) => s.parametros);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const safetyFactor = useMachiningStore((s) => s.safetyFactor);
  const baseRPM = useMachiningStore((s) => s.baseRPM);
  const baseFeed = useMachiningStore((s) => s.baseFeed);
  const manualOverrides = useMachiningStore((s) => s.manualOverrides);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
  const setManualRPMPercent = useMachiningStore((s) => s.setManualRPMPercent);
  const setManualFeedPercent = useMachiningStore((s) => s.setManualFeedPercent);

  const historyEntries = useHistoryStore((s) => s.entries);
  const toggleFavorite = useHistoryStore((s) => s.toggleFavorite);

  const { triggerPulse, safetyLevel } = useSimulationAnimation();

  const latestEntry = historyEntries[0];
  const isFavorited = latestEntry?.favorited ?? false;

  return (
    <section className="flex flex-col gap-4 px-4">
      <ToolSummaryViewer />

      {!storeResultado && (
        <>
          {/* Empty state — first time, no history yet */}
          {!latestEntry && (
            <div className="bg-surface-dark/70 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-3xl text-gray-600">precision_manufacturing</span>
                <p className="text-gray-400 text-sm font-medium">Configure os parâmetros e clique em Simular</p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { n: '1', icon: 'settings', label: 'Configure material e ferramenta', color: 'text-primary' },
                  { n: '2', icon: 'tune', label: 'Defina os parâmetros de corte', color: 'text-accent-orange' },
                  { n: '3', icon: 'play_arrow', label: 'Clique em Simular', color: 'text-secondary' },
                ].map(({ n, icon, label, color }) => (
                  <div key={n} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${color} border-current/30 bg-current/5`}>
                      <span className="text-xs font-bold font-mono">{n}</span>
                    </div>
                    <span className="material-symbols-outlined text-base text-gray-500">{icon}</span>
                    <span className="text-xs text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reset warning — shown when resultado is null after a previous simulation */}
          {latestEntry && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 animate-[fadeInUp_0.4s_ease-out]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-yellow-400 animate-pulse">refresh</span>
            <div>
              <p className="text-sm font-semibold text-yellow-300">Parâmetros Alterados</p>
              <p className="text-xs text-yellow-400/80 mt-0.5">Clique em "SIMULAR" para recalcular</p>
            </div>
          </div>
        </div>
      )}
        </>
      )}

      {storeResultado && (() => {
        const resultado = storeResultado;
        const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
        const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
        const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);
        const powerPct = Math.min((potenciaMotor / limites.maxPotencia) * 100, 100);
        const torquePct = Math.min((resultado.torque / limites.maxTorque) * 100, 100);
        const mrrBenchmark = MRR_BENCHMARKS[tipoOperacao] ?? MRR_BENCHMARKS[TipoUsinagem.DESBASTE];
        const mrrPct = mrrBenchmark > 0 ? (mrr / mrrBenchmark) * 100 : 0;

        const pulseClass = triggerPulse && safetyLevel === 'verde'
          ? 'animate-[subtlePulse_0.9s_ease-in-out]'
          : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
          ? 'animate-[subtlePulse_0.45s_ease-in-out_2]'
          : '';

        return (
          <div className="flex flex-col gap-4 animate-[fadeInUp_0.35s_ease-out]">
            {/* Safety badge + Favorite button */}
            <div className="flex items-center justify-between gap-3">
              <div className={`flex-1 ${pulseClass}`}>
                <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />
              </div>
              {latestEntry && (
                <button
                  aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar simulação'}
                  onClick={() => toggleFavorite(latestEntry.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 active:bg-white/10 transition-all active:scale-95 shrink-0"
                >
                  <span
                    className="material-symbols-outlined text-lg transition-all"
                    style={{
                      fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                      color: isFavorited ? '#facc15' : undefined,
                      filter: isFavorited ? 'drop-shadow(0 0 6px rgba(250,204,21,0.5))' : undefined,
                    }}
                  >star</span>
                  <span className={`text-xs font-semibold ${isFavorited ? 'text-yellow-400' : 'text-gray-500'}`}>
                    {isFavorited ? 'Favoritado' : 'Favoritar'}
                  </span>
                </button>
              )}
            </div>

            {/* Overview metrics 2x2 */}
            <div className="bg-surface-dark/70 backdrop-blur-sm border border-white/5 rounded-2xl p-4 shadow-glass">
              <div className="grid grid-cols-2 divide-x divide-y divide-white/5">
                <MetricCell label="Rotação" value={fmt(rpm)} unit="RPM" unitColor="text-primary" />
                <MetricCell label="Avanço" value={fmt(avanco)} unit="mm/min" unitColor="text-secondary" />
                <MetricCell label="Potência" value={potenciaMotor.toFixed(2)} unit="kW" unitColor="text-accent-orange" />
                <MetricCell label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" unitColor="text-primary" />
              </div>
            </div>

            {/* Big numbers with BidirectionalSlider (same as desktop) */}
            <BigNumber label="Rotação (RPM)" value={fmt(rpm)} unit="RPM" pct={rpmPct}
              color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
              useBidirectionalSlider
              baseValue={baseRPM}
              currentPercent={manualOverrides.rpmPercent ?? 0}
              onPercentChange={setManualRPMPercent} />
            <BigNumber label="Avanço (mm/min)" value={fmt(avanco)} unit="mm/min" pct={feedPct}
              color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
              useBidirectionalSlider
              baseValue={baseFeed}
              currentPercent={manualOverrides.feedPercent ?? 0}
              onPercentChange={setManualFeedPercent} />

            {/* 3 Gauges — horizontal scroll with snap (same 3 as desktop) */}
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-thin">
              <div className="snap-center shrink-0 w-[calc(100%-2rem)]">
                <Gauge value={avanco} maxValue={limites.maxAvanco} label="Eficiência de Avanço" palette="avanco" />
              </div>
              <div className="snap-center shrink-0 w-[calc(100%-2rem)]">
                <Gauge value={mrrPct} maxValue={100} label="Produtividade MRR" palette="mrr"
                  badge={`${mrr.toFixed(1)} cm³/min`} />
              </div>
              <div className="snap-center shrink-0 w-[calc(100%-2rem)]">
                <Gauge value={resultado.healthScore} maxValue={100} label="Saúde da Ferramenta" palette="health"
                  badge={resultado.healthScore === 0 ? 'BLOQUEADO' : undefined} />
              </div>
            </div>

            {/* Secondary metrics — 4 cards (matching desktop: Potência, Vc Real, Torque, MRR) */}
            <div className="grid grid-cols-2 gap-3">
              <ProgressCard label="Potência Est." value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct}
                barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" />
              <ProgressCard label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" pct={Math.min(vcReal / 500 * 100, 100)}
                barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" />
              <ProgressCard label="Torque" value={resultado.torque.toFixed(2)} unit="Nm" pct={torquePct}
                barColor="bg-purple-500" barShadow="rgba(168,85,247,0.5)" />
              <ProgressCard label="MRR" value={mrr.toFixed(1)} unit="cm³/min" pct={Math.min(mrrPct, 100)}
                barColor="bg-emerald-500" barShadow="rgba(16,185,129,0.5)" />
            </div>

            <WarningsSection avisos={seguranca.avisos} />

            {/* Educational Formula Cards (same 5 as desktop) */}
            <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-sm">school</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Entenda os Cálculos</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Toque para expandir</p>
                </div>
              </div>
              <div className="space-y-2">
                <FormulaCard
                  title="RPM (Rotação)"
                  icon="speed"
                  resultValue={fmt(rpm)}
                  resultUnit="RPM"
                  formula={<>N = <Fraction num="Vc × 1000" den="π × D" /></>}
                  substitution={<>N = <Fraction num={<>{parametros.vc} × 1000</>} den={<>3.14159 × {ferramenta.diametro}</>} /> = <span className="text-white font-bold">{fmt(rpm)}</span></>}
                  variables={[
                    { symbol: 'Vc', value: `${parametros.vc} m/min`, description: 'velocidade de corte' },
                    { symbol: 'D', value: `${ferramenta.diametro} mm`, description: 'diâmetro da ferramenta' },
                  ]}
                  contextBar={{ value: rpm, min: 0, max: limites.maxRPM, label: `${fmt(rpm)} / ${limites.maxRPM.toLocaleString('pt-BR')} RPM`, color: '#00D9FF' }}
                  tip="Para aumentar RPM: aumente Vc ou reduza o diâmetro."
                />

                <FormulaCard
                  title="Avanço (mm/min)"
                  icon="moving"
                  resultValue={fmt(avanco)}
                  resultUnit="mm/min"
                  formula={<>F = fz<sub>ef</sub> × Z × N</>}
                  substitution={<>F = {resultado.fzEfetivo.toFixed(3)} × {ferramenta.numeroArestas} × {fmt(rpm)} = <span className="text-white font-bold">{fmt(avanco)}</span></>}
                  variables={[
                    { symbol: 'fz_ef', value: `${resultado.fzEfetivo.toFixed(3)} mm`, description: resultado.seguranca.ctf > 1 ? `fz × CTF (${resultado.seguranca.ctf.toFixed(2)})` : 'fz efetivo' },
                    { symbol: 'Z', value: `${ferramenta.numeroArestas}`, description: 'número de arestas' },
                    { symbol: 'N', value: `${fmt(rpm)} RPM`, description: 'rotação' },
                  ]}
                  contextBar={{ value: avanco, min: 0, max: limites.maxAvanco, label: `${fmt(avanco)} / ${limites.maxAvanco.toLocaleString('pt-BR')} mm/min`, color: '#39FF14' }}
                  tip={resultado.seguranca.ctf > 1
                    ? `CTF ativo (${resultado.seguranca.ctf.toFixed(2)}) — ae < 50% de D, fz compensado.`
                    : 'Mais arestas = mais avanço na mesma fz.'}
                />

                <FormulaCard
                  title="MRR (Taxa Remoção)"
                  icon="speed"
                  resultValue={mrr.toFixed(1)}
                  resultUnit="cm³/min"
                  formula={<>MRR = <Fraction num="ap × ae × F" den="1000" /></>}
                  substitution={<>MRR = <Fraction num={<>{parametros.ap} × {parametros.ae} × {fmt(avanco)}</>} den="1000" /> = <span className="text-white font-bold">{mrr.toFixed(1)}</span></>}
                  variables={[
                    { symbol: 'ap', value: `${parametros.ap} mm`, description: 'profundidade axial' },
                    { symbol: 'ae', value: `${parametros.ae} mm`, description: 'profundidade radial' },
                    { symbol: 'F', value: `${fmt(avanco)} mm/min`, description: 'avanço' },
                  ]}
                  tip="Principal indicador de produtividade."
                />

                <FormulaCard
                  title="Potência (Motor)"
                  icon="bolt"
                  resultValue={potenciaMotor.toFixed(2)}
                  resultUnit="kW"
                  formula={<>P = <Fraction num="MRR × Kc" den={<>60000 × η</>} /> × SF</>}
                  substitution={<>P = <Fraction num={<>{mrr.toFixed(1)} × Kc</>} den={<>60000 × {limites.eficiencia}</>} /> × {safetyFactor} = <span className="text-white font-bold">{potenciaMotor.toFixed(2)}</span></>}
                  variables={[
                    { symbol: 'MRR', value: `${mrr.toFixed(1)} cm³/min`, description: 'taxa de remoção' },
                    { symbol: 'η', value: `${(limites.eficiencia * 100).toFixed(0)}%`, description: 'eficiência da máquina' },
                    { symbol: 'SF', value: `${safetyFactor}`, description: 'fator de segurança' },
                  ]}
                  contextBar={{ value: potenciaMotor, min: 0, max: limites.maxPotencia, label: `${potenciaMotor.toFixed(2)} / ${limites.maxPotencia} kW`, color: '#F97316' }}
                  tip="Material mais duro = mais potência. Reduza ap/ae se próximo do limite."
                />

                <FormulaCard
                  title="Torque"
                  icon="rotate_right"
                  resultValue={resultado.torque.toFixed(2)}
                  resultUnit="Nm"
                  formula={<>T = <Fraction num="P × 9549" den="N" /></>}
                  substitution={<>T = <Fraction num={<>{potenciaMotor.toFixed(2)} × 9549</>} den={fmt(rpm)} /> = <span className="text-white font-bold">{resultado.torque.toFixed(2)}</span></>}
                  variables={[
                    { symbol: 'P', value: `${potenciaMotor.toFixed(2)} kW`, description: 'potência do motor' },
                    { symbol: 'N', value: `${fmt(rpm)} RPM`, description: 'rotação' },
                  ]}
                  contextBar={{ value: resultado.torque, min: 0, max: limites.maxTorque, label: `${resultado.torque.toFixed(2)} / ${limites.maxTorque} Nm`, color: '#A855F7' }}
                  tip="RPM baixo com potência alta = torque alto."
                />
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
