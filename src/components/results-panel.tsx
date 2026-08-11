import React from 'react';
import { useMachiningStore } from '@/store';
import { useHistoryStore } from '@/store';
import { useFavoritesStore } from '@/store';
import { TipoUsinagem } from '@/types/index';
import type { ResultadoUsinagem, Ferramenta } from '@/types/index';
import { FavoriteEditModal } from './modals/favorite-edit-modal';
import { HalfMoonGauge } from './half-moon-gauge';
import { FormulaCard, Fraction } from './formula-card';
import { CollapsibleSection } from './collapsible-section';
import { BigNumber, fmt, SEG_COLORS, SEG_ICONS, SEG_LABELS, SEG_BG } from './shared-result-parts';
import { getMaterialById } from '@/data';
import { getRecommendedParams } from '@/engine/recommendations';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { CARD_INNER } from './design-tokens';

// MRR benchmarks by operation type (cm³/min) — Sandvik/Kennametal reference values
const MRR_BENCHMARKS: Record<TipoUsinagem, number> = {
  [TipoUsinagem.DESBASTE]: 50,
  [TipoUsinagem.SEMI_ACABAMENTO]: 20,
  [TipoUsinagem.ACABAMENTO]: 5,
};

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
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

/** Compact tool spec string: "Toroidal Ø6 R1.0 H25 F4" */
function formatToolSpec(f: Ferramenta): string {
  const tipo = f.tipo === 'toroidal' ? 'Toroidal' : f.tipo === 'esferica' ? 'Esférica' : 'Topo Reto';
  const raio = f.tipo === 'toroidal' ? ` R${f.raioQuina ?? 1.0}` : f.tipo === 'esferica' ? ` R${f.diametro / 2}` : '';
  return `${tipo} Ø${f.diametro}${raio} H${f.balanco} F${f.numeroArestas}`;
}

/** Generate action recommendation line for LCD display */
function getActionText(
  nivel: ResultadoUsinagem['seguranca']['nivel'],
  razaoLD: number,
  ctf: number,
): string {
  if (nivel === 'bloqueado') return 'REDUZIR BALANÇO OU AUMENTAR DIÂMETRO DA FERRAMENTA.';
  if (razaoLD > 4) return 'REDUZIR BALANÇO DA FERRAMENTA. VERIFICAR RELAÇÃO L/D.';
  if (ctf > 1.3) return 'AUMENTAR ae OU REDUZIR fz PARA COMPENSAR CTF ELEVADO.';
  if (nivel === 'vermelho') return 'REDUZIR ap E ae. VERIFICAR PARÂMETROS CRÍTICOS.';
  if (nivel === 'amarelo') return 'REDUZIR AVANÇO POR DENTE (fz). MONITORAR VIBRAÇÃO.';
  return '';
}

/** L/D color based on thresholds */
function getLdColor(razaoLD: number): string {
  if (razaoLD <= 3) return '#2ecc71';
  if (razaoLD <= 4) return '#f39c12';
  return '#e74c3c';
}

/** Format timestamp as "DD/MM/YYYY HH:mm" */
function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Manual-override badge: small amber pill shown next to a param label when it diverges from the auto recommendation */
function ManualBadge() {
  return (
    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/35 leading-none">
      manual
    </span>
  );
}

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

  // Favorites store — separate from history
  const favoritesAddFavorite = useFavoritesStore((s) => s.addFavorite);
  const favoritesRemoveFavorite = useFavoritesStore((s) => s.removeFavorite);
  const favoritesIsFavorited = useFavoritesStore((s) => s.isFavorited);
  const favoritesGetByCombo = useFavoritesStore((s) => s.getByCombo);

  const [showEditModal, setShowEditModal] = React.useState(false);

  const { triggerPulse, safetyLevel } = useSimulationAnimation();
  const resultado = storeResultado ?? EMPTY_RESULTADO;

  const flash = (_delayMs: number) => undefined;

  const latestEntry = historyEntries[0];

  // Favorites: compare by combo (materialId + tipoOperacao + ferramenta.tipo)
  const isFavorited = storeResultado !== null
    ? favoritesIsFavorited(materialId, tipoOperacao, ferramenta.tipo)
    : false;

  // Derived from store
  const { rpm, avanco, potenciaMotor, mrr, vcReal, seguranca } = resultado;
  const { nivel, avisos, razaoLD, ctf } = seguranca;

  const mrrBenchmark = MRR_BENCHMARKS[tipoOperacao] ?? MRR_BENCHMARKS[TipoUsinagem.DESBASTE];
  const mrrPct = mrrBenchmark > 0 ? (mrr / mrrBenchmark) * 100 : 0;
  const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
  const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);

  // Gauge pulse animation
  const pulseClass = triggerPulse && safetyLevel === 'verde'
    ? 'animate-[subtlePulse_0.9s_ease-in-out]'
    : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
    ? 'animate-[subtlePulse_0.45s_ease-in-out_2]'
    : '';

  // Material name lookup
  const material = getMaterialById(materialId);
  const materialNome = material?.nome ?? '—';

  // Manual-override detection: current params vs. what the recommendation engine would set
  const recommended = material
    ? getRecommendedParams(material, tipoOperacao, ferramenta.diametro, ferramenta.balanco)
    : null;
  const isManualVc = recommended !== null && Math.abs(parametros.vc - recommended.vc) > 0.05;
  const isManualFz = recommended !== null && Math.abs(parametros.fz - recommended.fz) > 0.0005;
  const isManualAp = recommended !== null && Math.abs(parametros.ap - recommended.ap) > 0.05;
  const isManualAe = recommended !== null && Math.abs(parametros.ae - recommended.ae) > 0.005;

  // LCD display content
  const lcdAlertLine = (() => {
    if (!storeResultado) return null;
    if (nivel === 'bloqueado') return { text: 'L/D > 6 — OPERAÇÃO BLOQUEADA', color: '#e74c3c', icon: 'block' };
    if (nivel === 'vermelho') return { text: avisos[0] ?? 'PARÂMETROS CRÍTICOS DETECTADOS', color: '#e74c3c', icon: 'emergency_home' };
    if (nivel === 'amarelo') return { text: avisos[0] ?? 'ATENÇÃO: RISCO DE VIBRAÇÃO', color: '#f39c12', icon: 'warning' };
    return { text: '✓ PARÂMETROS SEGUROS — SISTEMA OPERANDO NORMALMENTE', color: '#2ecc71', icon: 'check_circle' };
  })();

  const lcdActionText = storeResultado
    ? getActionText(nivel, razaoLD, ctf)
    : null;

  const ldColor = getLdColor(razaoLD);
  const timestamp = latestEntry ? formatTimestamp(latestEntry.timestamp) : null;
  const sfPercent = Math.round(safetyFactor * 100);

  return (
    <div className="flex flex-col gap-2">

      {/* ═══ ZONA 1 — Console Header Bar ═══ */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-background-dark border border-white/10 rounded-lg">
        {/* Meta: timestamp · material · operação */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {timestamp && (
            <>
              <span className="font-mono text-xs text-white/40 shrink-0">{timestamp}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
            </>
          )}
          <span className="text-xs font-semibold text-white truncate">{materialNome}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
          <span className="text-xs font-semibold text-white/70 bg-white/8 px-2 py-0.5 rounded uppercase shrink-0">
            {OPERACAO_LABELS[tipoOperacao]}
          </span>
        </div>
        {/* SF chip — only when safety factor differs from the 0.80 default (hidden state living in the advanced accordion) */}
        {sfPercent !== 80 && (
          <span className="font-mono text-[10px] font-bold px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/25 shrink-0">
            SF {sfPercent}%
          </span>
        )}
        {/* Safety badge inline — jackpotFlash with 600ms delay (AC-9) */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold uppercase tracking-wide shrink-0 ${SEG_BG[nivel]}`}
          style={flash(600)}>
          <span className={`material-symbols-outlined text-sm ${SEG_COLORS[nivel]}`}
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
            {SEG_ICONS[nivel]}
          </span>
          <span className={SEG_COLORS[nivel]}>{SEG_LABELS[nivel]}</span>
          {avisos.length > 0 && (
            <span className="text-xs opacity-70">({avisos.length})</span>
          )}
        </div>
        {/* Favorite button */}
        {storeResultado !== null && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar simulação'}
              onClick={() => {
                if (isFavorited) {
                  const existing = favoritesGetByCombo(materialId, tipoOperacao, ferramenta.tipo);
                  if (existing) favoritesRemoveFavorite(existing.id);
                } else {
                  favoritesAddFavorite({
                    materialId,
                    materialNome: material?.nome ?? '—',
                    tipoOperacao,
                    ferramenta,
                    parametros,
                    resultado: storeResultado,
                    safetyFactor,
                  });
                }
              }}
              className="flex items-center p-1.5 rounded-lg bg-black/30 border border-white/10 hover:bg-white/5 transition-all active:scale-95"
            >
              <span
                className="material-symbols-outlined text-lg transition-all"
                style={{
                  fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                  color: isFavorited ? '#facc15' : 'rgba(255,255,255,0.4)',
                  filter: isFavorited ? 'drop-shadow(0 0 6px rgba(250,204,21,0.5))' : undefined,
                }}
              >star</span>
            </button>
            {isFavorited && (
              <button
                aria-label="Editar favorito"
                onClick={() => setShowEditModal(true)}
                className="flex items-center p-1.5 rounded-lg bg-black/30 border border-white/10 hover:bg-white/5 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-lg text-white/40 hover:text-white/70 transition-colors">edit</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ═══ ZONA 2 — Digital Display LCD ═══ */}
      <div className="bg-[#05070a] border border-primary/[0.12] rounded-lg px-3 py-2 flex flex-col gap-1">
        {storeResultado === null ? (
          <>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-white/40">
              <span className="material-symbols-outlined text-sm text-white/20">hourglass_empty</span>
              <span>AGUARDANDO SIMULAÇÃO — CONFIGURE PARÂMETROS E CLIQUE EM SIMULAR</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-white/20 border-t border-white/5 pt-1">
              <span className="material-symbols-outlined text-sm text-white/15">settings_suggest</span>
              <span>SELECIONE MATERIAL, FERRAMENTA E OPERAÇÃO NO PAINEL ESQUERDO</span>
            </div>
          </>
        ) : (
          <>
            {lcdAlertLine && (
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide"
                style={{ color: lcdAlertLine.color, textShadow: `0 0 5px ${lcdAlertLine.color}4d` }}>
                <span className="material-symbols-outlined text-sm shrink-0"
                  style={{ color: lcdAlertLine.color }}>
                  {lcdAlertLine.icon}
                </span>
                <span className="truncate">{lcdAlertLine.text}</span>
              </div>
            )}
            {lcdActionText && (
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-primary"
                style={{ textShadow: '0 0 5px rgba(0,217,255,0.3)' }}>
                <span className="material-symbols-outlined text-sm shrink-0 text-primary">arrow_forward</span>
                <span className="truncate">AÇÃO: {lcdActionText}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ═══ ZONA 3 — Tool Row ═══ */}
      <div
        data-testid="tool-summary"
        className="flex items-center gap-2 px-3 py-2 bg-[rgba(30,35,45,0.6)] border border-white/5 rounded-lg"
      >
        <span className="material-symbols-outlined text-primary text-xl shrink-0">precision_manufacturing</span>
        <span className="text-xs text-white/40 uppercase tracking-widest shrink-0">Ferramenta:</span>
        <span className="font-mono text-sm font-bold text-white truncate">{formatToolSpec(ferramenta)}</span>
      </div>

      {/* ═══ ZONA 4 — Herói: RPM + Avanço (text-6xl, domina a tela) ═══ */}
      <div className="grid grid-cols-2 gap-2">
        <div style={flash(0)}>
          <BigNumber
            label="Rotação (RPM)" value={storeResultado ? fmt(rpm) : '—'} unit="RPM" pct={rpmPct}
            color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
            numericValue={storeResultado ? rpm : undefined} animateOnReveal
            useBidirectionalSlider={storeResultado !== null}
            baseValue={baseRPM}
            currentPercent={manualOverrides.rpmPercent ?? 0}
            onPercentChange={setManualRPMPercent}
          />
        </div>
        <div style={flash(50)}>
          <BigNumber
            label="Avanço (mm/min)" value={storeResultado ? fmt(avanco) : '—'} unit="mm/min" pct={feedPct}
            color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
            numericValue={storeResultado ? avanco : undefined} animateOnReveal
            useBidirectionalSlider={storeResultado !== null}
            baseValue={baseFeed}
            currentPercent={manualOverrides.feedPercent ?? 0}
            onPercentChange={setManualFeedPercent}
          />
        </div>
      </div>
      {storeResultado === null && (
        <div className="flex items-center justify-center gap-2 -mt-1 font-mono text-xs uppercase tracking-wide text-white/60">
          <span className="material-symbols-outlined text-sm">touch_app</span>
          Configure os parâmetros e clique em Simular
        </div>
      )}

      {storeResultado !== null && (
        <>
          {/* ═══ ZONA 5 — Indicadores: 3 gauges + chips L/D/CTF ═══ */}
          <div className={`grid grid-cols-[repeat(3,1fr)_auto_auto] gap-2 items-stretch ${pulseClass}`}>
            <div style={flash(100)}>
              <HalfMoonGauge
                value={avanco}
                maxValue={limites.maxAvanco}
                label="Eficiência de Avanço"
                animateOnMount
              />
            </div>
            <div style={flash(150)}>
              <HalfMoonGauge
                value={mrrPct}
                maxValue={100}
                label="Produtividade MRR"
                badge={`${mrr.toFixed(1)} cm³/min`}
                animateOnMount
              />
            </div>
            <div style={flash(200)}>
              <HalfMoonGauge
                value={resultado.healthScore}
                maxValue={100}
                label="Saúde da Ferramenta"
                badge={resultado.healthScore === 0 ? 'BLOQUEADO' : undefined}
                animateOnMount
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-0.5 px-3.5 py-2 rounded-xl min-w-[74px]"
              style={{ backgroundColor: `${ldColor}14`, border: `1px solid ${ldColor}40` }}>
              <span className="text-[11px] font-bold uppercase" style={{ color: ldColor }}>L/D</span>
              <span className="font-mono text-lg font-bold" style={{ color: ldColor }}>{razaoLD.toFixed(1)}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-0.5 px-3.5 py-2 rounded-xl min-w-[74px] bg-primary/[0.06] border border-primary/20">
              <span className="text-[11px] font-bold uppercase text-primary">CTF</span>
              <span className="font-mono text-lg font-bold text-primary">{ctf.toFixed(2)}</span>
            </div>
          </div>

          {/* ═══ ZONA 6 — Detalhes e fórmulas (colapsado por padrão) ═══ */}
          <CollapsibleSection
            title="Detalhes e Fórmulas"
            renderHeader={({ isOpen }) => (
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">school</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Detalhes e Fórmulas</span>
                </div>
                <span className="material-symbols-outlined text-gray-500 text-base transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  expand_more
                </span>
              </div>
            )}
          >
            <div className="flex flex-col gap-3">
              {/* Params grid — Vc/fz/ap/ae with manual-override badges */}
              <div className="grid grid-cols-4 gap-2">
                {([
                  { label: 'Vc', value: parametros.vc.toFixed(2), unit: 'm/min', manual: isManualVc },
                  { label: 'fz', value: parametros.fz.toFixed(3), unit: 'mm', manual: isManualFz },
                  { label: 'ap', value: parametros.ap.toFixed(2), unit: 'mm', manual: isManualAp },
                  { label: 'ae', value: parametros.ae.toFixed(2), unit: 'mm', manual: isManualAe },
                ] as const).map(({ label, value, unit, manual }) => (
                  <div key={label} className={CARD_INNER}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-white/40 uppercase tracking-wide">{label}</span>
                      {manual && <ManualBadge />}
                    </div>
                    <div className="font-mono text-[15px] font-bold text-white leading-tight">
                      {value} <span className="text-[10px] opacity-40 font-normal">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formula rows — Potência / Vc Real / MRR (Torque removido — só engine) */}
              <div className="flex flex-col gap-1.5">
                <div className={`flex items-center justify-between ${CARD_INNER} !py-2 text-xs text-white/55`}>
                  <span>Potência Estimada</span>
                  <span className="font-mono text-white">{potenciaMotor.toFixed(2)} kW</span>
                </div>
                <div className={`flex items-center justify-between ${CARD_INNER} !py-2 text-xs text-white/55`}>
                  <span>Vc Real</span>
                  <span className="font-mono text-white">{vcReal.toFixed(0)} m/min</span>
                </div>
                <div className={`flex items-center justify-between ${CARD_INNER} !py-2 text-xs text-white/55`}>
                  <span>MRR</span>
                  <span className="font-mono text-white">{mrr.toFixed(1)} cm³/min</span>
                </div>
              </div>

              {/* 4 FormulaCards educacionais (RPM, Avanço, MRR, Potência) */}
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
                  tip="Para aumentar RPM: aumente Vc ou reduza o diâmetro. Vc maior → RPM maior."
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
                    ? `CTF ativo (${resultado.seguranca.ctf.toFixed(2)}) — ae < 50% de D, fz compensado para manter espessura do cavaco.`
                    : 'Mais arestas = mais avanço na mesma fz. Aumente Z para maior produtividade.'}
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
                  tip="Principal indicador de produtividade. Aumente ap ou ae para maior volume removido."
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
                  tip="Material mais duro (Kc alto) = mais potência necessária. Reduza ap/ae se próximo do limite."
                />
              </div>
            </div>
          </CollapsibleSection>
        </>
      )}

      {/* Favorite edit modal */}
      {showEditModal && (() => {
        const existing = favoritesGetByCombo(materialId, tipoOperacao, ferramenta.tipo);
        return existing ? (
          <FavoriteEditModal
            favorite={existing}
            onClose={() => setShowEditModal(false)}
          />
        ) : null;
      })()}
    </div>
  );
}
