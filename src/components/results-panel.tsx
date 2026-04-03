import { useState, useEffect } from 'react';
import { useMachiningStore } from '@/store';
import { useHistoryStore } from '@/store';
import { TipoUsinagem } from '@/types/index';
import type { ResultadoUsinagem } from '@/types/index';
import { MATERIAIS } from '@/data';
import { HalfMoonGauge } from './half-moon-gauge';
import { FormulaCard, Fraction } from './formula-card';
import { fmt, SafetyBadge, BigNumber, ProgressCard, WarningsSection } from './shared-result-parts';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { TickerDisplay } from './ticker-display';
import { OnboardingDots } from './onboarding/onboarding-dots';
import { useOnboardingStore, ONBOARDING_MESSAGES, NORMAL_MESSAGES } from '@/hooks/use-onboarding';

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

const TIPO_LABEL: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-acabamento',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
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
  const materialId = useMachiningStore((s) => s.materialId);
  const setManualRPMPercent = useMachiningStore((s) => s.setManualRPMPercent);
  const setManualFeedPercent = useMachiningStore((s) => s.setManualFeedPercent);

  const historyEntries = useHistoryStore((s) => s.entries);
  const toggleFavorite = useHistoryStore((s) => s.toggleFavorite);

  const { completed: onboardingCompleted, currentStep } = useOnboardingStore();

  const [calcTimestamp, setCalcTimestamp] = useState('');
  useEffect(() => {
    if (storeResultado !== null) {
      setCalcTimestamp(
        new Date().toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        })
      );
    }
  }, [storeResultado]);

  const { triggerPulse, safetyLevel } = useSimulationAnimation();
  const resultado = storeResultado ?? EMPTY_RESULTADO;

  // The most recent history entry
  const latestEntry = historyEntries[0];
  const isFavorited = latestEntry?.favorited ?? false;

  const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
  const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
  const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);
  const powerPct = Math.min((potenciaMotor / limites.maxPotencia) * 100, 100);
  const mrrBenchmark = MRR_BENCHMARKS[tipoOperacao] ?? MRR_BENCHMARKS[TipoUsinagem.DESBASTE];
  const mrrPct = mrrBenchmark > 0 ? (mrr / mrrBenchmark) * 100 : 0;
  const torquePct = Math.min((resultado.torque / limites.maxTorque) * 100, 100);

  const isAhaMoment = !onboardingCompleted && storeResultado !== null;
  const pulseClass = (triggerPulse && safetyLevel === 'verde') || isAhaMoment
    ? 'animate-[subtlePulse_0.9s_ease-in-out]'
    : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
    ? 'animate-[subtlePulse_0.45s_ease-in-out_2]'
    : '';

  const ahaMomentClass = isAhaMoment ? 'animate-[aha-pulse_1.5s_ease-in-out]' : '';

  const material = MATERIAIS.find((m) => m.id === materialId);
  const ferramentaLabel = [
    ferramenta.tipo.charAt(0).toUpperCase() + ferramenta.tipo.slice(1),
    `Ø${ferramenta.diametro}`,
    ferramenta.raioQuina != null ? `R${ferramenta.raioQuina}` : null,
    `H${ferramenta.balanco}`,
    `F${ferramenta.numeroArestas}`,
  ].filter(Boolean).join(' ');

  const tickerMessages = !onboardingCompleted 
    ? ONBOARDING_MESSAGES[currentStep] 
    : [...NORMAL_MESSAGES, ...(seguranca.avisos.length > 0 ? seguranca.avisos : [])];

  return (
    <div className="flex flex-col h-full bg-surface-dark border border-white/5 rounded-2xl overflow-hidden shadow-glass relative">
      <TickerDisplay messages={tickerMessages} highlight={!onboardingCompleted} />
      
      {storeResultado === null ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-500 p-8">
          <span className="material-symbols-outlined text-5xl opacity-30">precision_manufacturing</span>
          <p className="text-sm text-center leading-relaxed">
            Configure os parâmetros e clique em{' '}
            <strong className="text-cyan-400 uppercase">Calcular Parâmetros</strong> para ver os resultados
          </p>
          <OnboardingDots />
        </div>
      ) : (
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto animate-[fadeInUp_0.4s_ease-out]">
          {/* ══ CABEÇALHO ══ */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] rounded-xl border border-white/8">
            <span className="text-xs text-gray-400 font-mono truncate">
              {calcTimestamp} · {material?.nome ?? 'Material'} · {TIPO_LABEL[tipoOperacao]}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <div className={pulseClass}>
                <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />
              </div>
              {latestEntry && (
                <button
                  aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar simulação'}
                  onClick={() => toggleFavorite(latestEntry.id)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/30 border border-white/10 hover:bg-white/5 transition-all active:scale-95 shrink-0"
                >
                  <span
                    className="material-symbols-outlined text-base transition-all"
                    style={{
                      fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                      color: isFavorited ? '#facc15' : undefined,
                      filter: isFavorited ? 'drop-shadow(0 0 6px rgba(250,204,21,0.5))' : undefined,
                    }}
                  >star</span>
                </button>
              )}
            </div>
          </div>

          {/* ══ LINHA 1 — Ferramenta (full-width) ══ */}
          <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-3">
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-0.5">Ferramenta</div>
            <div className="font-mono text-xl text-white">{ferramentaLabel}</div>
          </div>

          {/* ══ LINHA 2 — RPM + Avanço (2 caixas grandes) ══ */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`${ahaMomentClass} transition-all duration-700`}>
              <BigNumber label="Rotação (RPM)" value={fmt(rpm)} unit="RPM" pct={rpmPct}
                color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
                useBidirectionalSlider baseValue={baseRPM}
                currentPercent={manualOverrides.rpmPercent ?? 0}
                onPercentChange={setManualRPMPercent} />
            </div>
            <div className={`${ahaMomentClass} transition-all duration-700`}>
              <BigNumber label="Avanço (mm/min)" value={fmt(avanco)} unit="mm/min" pct={feedPct}
                color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
                useBidirectionalSlider baseValue={baseFeed}
                currentPercent={manualOverrides.feedPercent ?? 0}
                onPercentChange={setManualFeedPercent} />
            </div>
          </div>

          {/* ══ LINHA 3 — Parâmetros de entrada (4 caixas iguais) ══ */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Vc', unit: 'm/min', val: parametros.vc.toFixed(0) },
              { label: 'fz', unit: 'mm/z', val: parametros.fz.toFixed(3) },
              { label: 'ap', unit: 'mm', val: parametros.ap.toFixed(2) },
              { label: 'ae', unit: 'mm', val: parametros.ae.toFixed(1) },
            ].map((item) => (
              <div key={item.label} className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2">
                <div className="text-[10px] text-white/50 font-bold mb-0.5">{item.label}</div>
                <div className="font-mono text-base text-white/90">
                  {item.val} <span className="text-[10px] text-white/40">{item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ══ LINHA 4 — Indicadores (Fat. Correção + 3 Gauges) ══ */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2 flex flex-col justify-center">
              <div className="text-[10px] text-white/50 font-bold mb-1 uppercase tracking-wider">Fator Corr.</div>
              <div className="font-mono text-base text-white/90">{Math.round(safetyFactor * 100)}%</div>
            </div>
            <HalfMoonGauge value={avanco} maxValue={limites.maxAvanco} label="Efic. Avanço" palette="avanco" size="sm" />
            <HalfMoonGauge value={mrrPct} maxValue={100} label="Prod. MRR" palette="mrr" size="sm" />
            <HalfMoonGauge value={resultado.healthScore} maxValue={100} label="Saúde Ferram." palette="health" size="sm" />
          </div>

          <OnboardingDots />

          {/* ══ LINHA 5 — Dados secundários (5 colunas) ══ */}
          <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr 1fr 0.6fr 0.6fr' }}>
            <ProgressCard label="Potência" value={potenciaMotor.toFixed(2)} unit="kW" pct={powerPct} barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" compact />
            <ProgressCard label="Torque" value={resultado.torque.toFixed(2)} unit="Nm" pct={torquePct} barColor="bg-purple-500" barShadow="rgba(168,85,247,0.5)" compact />
            <ProgressCard label="Vc Real" value={vcReal.toFixed(0)} unit="m/min" pct={Math.min(vcReal / 500 * 100, 100)} barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" compact />
            <LdCell razao={seguranca.razaoLD} />
            <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2 flex flex-col justify-center">
              <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest text-[8px]">CTF</div>
              <div className="font-mono text-sm text-white/90">{seguranca.ctf.toFixed(2)}</div>
            </div>
          </div>

          <WarningsSection avisos={seguranca.avisos} />

          {/* ══ Fórmulas Educacionais ══ */}
          <div className="bg-surface-dark border border-white/5 rounded-2xl p-5 mt-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20">
                <span className="material-symbols-outlined text-cyan-400">school</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-widest">Entenda os Cálculos</h3>
                <p className="text-xs text-gray-500 mt-0.5">Como cada valor é calculado</p>
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
                variables={[{ symbol: 'Vc', value: `${parametros.vc} m/min`, description: 'velocidade de corte' }, { symbol: 'D', value: `${ferramenta.diametro} mm`, description: 'diâmetro da ferramenta' }]} 
                tip="Para aumentar RPM: aumente Vc ou reduza o diâmetro. Vc maior → RPM maior."
              />
              <FormulaCard 
                title="Avanço (mm/min)" 
                icon="moving" 
                resultValue={fmt(avanco)} 
                resultUnit="mm/min" 
                formula={<>F = fz<sub>ef</sub> × Z × N</>} 
                substitution={<>F = {resultado.fzEfetivo.toFixed(3)} × {ferramenta.numeroArestas} × {fmt(rpm)} = <span className="text-white font-bold">{fmt(avanco)}</span></>} 
                variables={[{ symbol: 'fz_ef', value: `${resultado.fzEfetivo.toFixed(3)} mm`, description: 'fz efetivo' }, { symbol: 'Z', value: `${ferramenta.numeroArestas}`, description: 'número de arestas' }, { symbol: 'N', value: `${fmt(rpm)} RPM`, description: 'rotação' }]} 
                tip="Avanço depende do fz, número de arestas e RPM. Mais arestas = mais avanço."
              />

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LdCell({ razao }: { razao: number }) {
  const color = razao <= 3 ? '#2ecc71' : razao <= 4 ? '#f39c12' : '#e74c3c';
  const label = razao > 6 ? 'BLOQ.' : razao.toFixed(1);
  return (
    <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2 flex flex-col justify-center">
      <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest text-[8px]">L/D</div>
      <div className="font-mono text-sm font-bold" style={{ color }}>{label}</div>
    </div>
  );
}
