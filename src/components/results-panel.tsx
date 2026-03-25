import { useMachiningStore } from '@/store';
import { useHistoryStore } from '@/store';
import { TipoUsinagem } from '@/types/index';
import type { ResultadoUsinagem } from '@/types/index';
import { Gauge } from './gauge';
import { FormulaCard, Fraction } from './formula-card';
import { ToolSummaryViewer } from './tool-summary-viewer';
import { fmt, SafetyBadge, BigNumber, ProgressCard, WarningsSection } from './shared-result-parts';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';

// MRR benchmarks by operation type (cm³/min) — based on Sandvik/Kennametal reference values
const MRR_BENCHMARKS: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 50,
  [TipoUsinagem.SEMI_ACABAMENTO]: 20,
  [TipoUsinagem.ACABAMENTO]: 5,
};

const EMPTY_RESULTADO: ResultadoUsinagem = {
  rpm: 0,
  avanco: 0,
  potenciaCorte: 0,
  potenciaMotor: 0,
  torque: 0,
  mrr: 0,
  vcReal: 0,
  fzEfetivo: 0,
  seguranca: { nivel: 'verde', avisos: [], razaoLD: 0, ctf: 1 },
  powerHeadroom: 100,
  healthScore: 0,
};

export function ResultsPanel() {
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
  const resultado = storeResultado ?? EMPTY_RESULTADO;

  // The most recent history entry — created by simular() just before resultado was set
  const latestEntry = historyEntries[0];
  const isFavorited = latestEntry?.favorited ?? false;

  const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
  const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
  const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);
  const powerPct = Math.min((potenciaMotor / limites.maxPotencia) * 100, 100);
  const mrrBenchmark = MRR_BENCHMARKS[tipoOperacao] ?? MRR_BENCHMARKS[TipoUsinagem.DESBASTE];
  const mrrPct = mrrBenchmark > 0 ? (mrr / mrrBenchmark) * 100 : 0;

  const pulseClass = triggerPulse && safetyLevel === 'verde'
    ? 'animate-[subtlePulse_0.9s_ease-in-out]' // 0.6s → 0.9s (+50%)
    : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
    ? 'animate-[subtlePulse_0.45s_ease-in-out_2]' // 0.3s → 0.45s (+50%)
    : '';

  const torquePct = Math.min((resultado.torque / limites.maxTorque) * 100, 100);
  const showResetMessage = storeResultado === null;

  return (
    <div className="flex flex-col gap-3">
      <ToolSummaryViewer />

      {/* ═══ ZONA 1 — Valores Principais (SafetyBadge + RPM + Avanço) ═══ */}
      <div className="flex items-center justify-between gap-3">
        <div className={`flex-1 ${pulseClass}`}>
          <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />
        </div>
        {storeResultado !== null && latestEntry && (
          <button
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar simulação'}
            onClick={() => toggleFavorite(latestEntry.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 hover:bg-white/5 transition-all active:scale-95 shrink-0"
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

      <div className="grid grid-cols-2 gap-3">
        <BigNumber label="Rotação (RPM)" value={fmt(rpm)} unit="RPM" pct={rpmPct}
          color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
          useBidirectionalSlider
          baseValue={baseRPM}
          currentPercent={manualOverrides.rpmPercent ?? 0}
          onPercentChange={setManualRPMPercent}
          rgb="0,217,255" />
        <BigNumber label="Avanço (mm/min)" value={fmt(avanco)} unit="mm/min" pct={feedPct}
          color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
          useBidirectionalSlider
          baseValue={baseFeed}
          currentPercent={manualOverrides.feedPercent ?? 0}
          onPercentChange={setManualFeedPercent}
          rgb="57,255,20" />
      </div>

      {/* ═══ ZONA 2 — Métricas Secundárias (4 colunas) ═══ */}
      <div className="grid grid-cols-4 gap-2">
        <ProgressCard label="Potência Est." value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct}
          barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" compact />
        <ProgressCard label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" pct={Math.min(vcReal / 500 * 100, 100)}
          barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" compact />
        <ProgressCard label="Torque" value={resultado.torque.toFixed(2)} unit="Nm" pct={torquePct}
          barColor="bg-purple-500" barShadow="rgba(168,85,247,0.5)" compact />
        <ProgressCard label="MRR" value={mrr.toFixed(1)} unit="cm³/min" pct={Math.min(mrrPct, 100)}
          barColor="bg-emerald-500" barShadow="rgba(16,185,129,0.5)" compact />
      </div>

      {/* ═══ ZONA 3 — Indicadores de Saúde (Gauges) ═══ */}
      <div className="grid grid-cols-3 gap-3">
        <Gauge
          value={avanco}
          maxValue={limites.maxAvanco}
          label="Eficiência de Avanço"
          palette="avanco"
        />
        <Gauge
          value={mrrPct}
          maxValue={100}
          label="Produtividade MRR"
          palette="mrr"
          badge={storeResultado ? `${mrr.toFixed(1)} cm³/min` : undefined}
        />
        <Gauge
          value={resultado.healthScore}
          maxValue={100}
          label="Saúde da Ferramenta"
          palette="health"
          badge={storeResultado ? (resultado.healthScore === 0 ? 'BLOQUEADO' : undefined) : undefined}
        />
      </div>

      {/* ═══ ZONA 4 — Alertas e Avisos (zona dedicada) ═══ */}
      {showResetMessage && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 animate-[fadeInUp_0.4s_ease-out]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-yellow-400 animate-pulse">refresh</span>
            <div>
              <p className="text-base font-semibold text-yellow-300">Parâmetros Alterados</p>
              <p className="text-sm text-yellow-400/80 mt-0.5">Clique em "SIMULAR" para recalcular os resultados</p>
            </div>
          </div>
        </div>
      )}

      <WarningsSection avisos={seguranca.avisos} />

      {/* ═══ ZONA 5 — Fórmulas Educacionais (recolhidas) ═══ */}
      <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-glass">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="material-symbols-outlined text-primary">school</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-widest">Entenda os Cálculos</h3>
            <p className="text-xs text-gray-500 mt-0.5">Clique para expandir e ver como cada valor é calculado</p>
          </div>
        </div>
        <div className="space-y-2">
          {/* RPM */}
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
            tip="Para aumentar RPM: aumente Vc ou reduza o diâmetro. Vc maior → RPM maior."
          />

          {/* Feed Rate */}
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
              ? `CTF ativo (${resultado.seguranca.ctf.toFixed(2)}) — ae < 50% de D, fz compensado para manter espessura do cavaco.`
              : 'Mais arestas = mais avanço na mesma fz. Aumente Z para maior produtividade.'}
          />

          {/* MRR */}
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
            tip="Principal indicador de produtividade. Aumente ap ou ae para maior volume removido."
          />

          {/* Power */}
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
            tip="Material mais duro (Kc alto) = mais potência necessária. Reduza ap/ae se próximo do limite."
          />

          {/* Torque */}
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
            tip="RPM baixo com potência alta = torque alto. Cuidado com ferramentas de diâmetro pequeno."
          />
        </div>
      </div>
    </div>
  );
}
