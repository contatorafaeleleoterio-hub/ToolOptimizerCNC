import { useMachiningStore } from '@/store';
import type { ResultadoUsinagem } from '@/types/index';
import { Gauge } from './gauge';
import { FormulaCard, Fraction } from './formula-card';
import { ToolSummaryViewer } from './tool-summary-viewer';
import { fmt, SafetyBadge, MetricCell, BigNumber, ProgressCard, WarningsSection } from './shared-result-parts';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { useResetFeedback } from '@/hooks/use-reset-feedback';

const EMPTY_RESULTADO: ResultadoUsinagem = {
  rpm: 0,
  avanco: 0,
  potenciaCorte: 0,
  potenciaMotor: 0,
  torque: 0,
  mrr: 0,
  vcReal: 0,
  fzEfetivo: 0,
  forcaCorte: 0,
  seguranca: { nivel: 'verde', avisos: [], razaoLD: 0, ctf: 1 },
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
  const setManualRPMPercent = useMachiningStore((s) => s.setManualRPMPercent);
  const setManualFeedPercent = useMachiningStore((s) => s.setManualFeedPercent);

  const { triggerPulse, safetyLevel } = useSimulationAnimation();
  const { isResetting } = useResetFeedback();

  const resultado = storeResultado ?? EMPTY_RESULTADO;

  const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
  const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
  const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);
  const powerPct = Math.min((potenciaMotor / limites.maxPotencia) * 100, 100);

  const pulseClass = triggerPulse && safetyLevel === 'verde'
    ? 'animate-[subtlePulse_0.9s_ease-in-out]' // 0.6s → 0.9s (+50%)
    : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
    ? 'animate-[subtlePulse_0.45s_ease-in-out_2]' // 0.3s → 0.45s (+50%)
    : '';

  const resetFeedbackClass = isResetting ? 'animate-[fadeOut_0.4s_ease-out]' : '';
  const showResetMessage = storeResultado === null;

  return (
    <div className="flex flex-col gap-3">
      <ToolSummaryViewer />

      {/* Reset feedback message */}
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

      <div className={pulseClass}>
        <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />
      </div>

      {/* Overview cards */}
      <div className={`bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass transition-all duration-300 ${pulseClass} ${resetFeedbackClass}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-gray-400">analytics</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-widest">Parâmetros Calculados</h3>
            <p className="text-xs text-gray-500 font-mono mt-0.5">Resumo da Operação</p>
          </div>
        </div>
        <div className="bg-black/40 rounded-xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-4 divide-x divide-white/5">
            <MetricCell label="Rotação" value={fmt(rpm)} unit="RPM" unitColor="text-primary" />
            <MetricCell label="Avanço" value={fmt(avanco)} unit="mm/min" unitColor="text-secondary" />
            <MetricCell label="Potência" value={potenciaMotor.toFixed(2)} unit="kW" unitColor="text-accent-orange" />
            <MetricCell label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" unitColor="text-primary" />
          </div>
        </div>
      </div>

      {/* Big numbers: RPM + Feed (bidirectional sliders) */}
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

      {/* Gauge */}
      <Gauge value={avanco} maxValue={limites.maxAvanco} label="Eficiência de Avanço" />

      {/* Progress bars */}
      <div className="grid grid-cols-3 gap-3">
        <ProgressCard label="Potência Est." value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct}
          barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" />
        <ProgressCard label="MRR" value={mrr.toFixed(1)} unit="cm³/min" pct={Math.min(mrr / 100 * 100, 100)}
          barColor="bg-accent-purple" barShadow="rgba(168,85,247,0.5)" />
        <ProgressCard label="Vel. Superficial" value={vcReal.toFixed(0)} unit="m/min" pct={Math.min(vcReal / 500 * 100, 100)}
          barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" />
      </div>

      {/* Educational Formula Cards */}
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

      <WarningsSection avisos={seguranca.avisos} />
    </div>
  );
}
