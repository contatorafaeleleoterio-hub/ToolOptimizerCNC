import React from 'react';
import { useMachiningStore } from '@/store';
import { useHistoryStore } from '@/store';
import { useFavoritesStore } from '@/store';
import { TipoUsinagem } from '@/types/index';
import type { ResultadoUsinagem, Ferramenta } from '@/types/index';
import { FavoriteEditModal } from './modals/favorite-edit-modal';
import { HalfMoonGauge } from './half-moon-gauge';
import { FormulaCard, Fraction } from './formula-card';
import { BidirectionalSlider } from './bidirectional-slider';
import { fmt, SEG_COLORS, SEG_ICONS, SEG_LABELS, SEG_BG } from './shared-result-parts';
import { getMaterialById } from '@/data';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';

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

  const { triggerPulse, safetyLevel, isRevealing } = useSimulationAnimation();
  const resultado = storeResultado ?? EMPTY_RESULTADO;

  // jackpotFlash helper: animation style with per-card delay
  const flash = (delayMs: number) =>
    isRevealing ? { animation: `jackpotFlash 550ms ease-out ${delayMs}ms both` } : undefined;

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

  // Gauge pulse animation
  const pulseClass = triggerPulse && safetyLevel === 'verde'
    ? 'animate-[subtlePulse_0.9s_ease-in-out]'
    : triggerPulse && (safetyLevel === 'vermelho' || safetyLevel === 'bloqueado')
    ? 'animate-[subtlePulse_0.45s_ease-in-out_2]'
    : '';

  // Material name lookup
  const material = getMaterialById(materialId);
  const materialNome = material?.nome ?? '—';

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

  const lcdInfoText = storeResultado
    ? `L/D: ${razaoLD.toFixed(1)} · CTF: ${ctf.toFixed(2)} · POT. DISPONÍVEL: ${Math.round(resultado.powerHeadroom)}%`
    : null;

  const ldColor = getLdColor(razaoLD);
  const timestamp = latestEntry ? formatTimestamp(latestEntry.timestamp) : formatTimestamp(Date.now());

  return (
    <div className="flex flex-col gap-2">

      {/* ═══ ZONA 1 — Console Header Bar ═══ */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0f1419] border border-white/10 rounded-lg">
        {/* Meta: timestamp · material · operação */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="font-mono text-xs text-white/40 shrink-0">{timestamp}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
          <span className="text-xs font-semibold text-white truncate">{materialNome}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
          <span className="text-xs font-semibold text-white/70 bg-white/8 px-2 py-0.5 rounded uppercase shrink-0">
            {OPERACAO_LABELS[tipoOperacao]}
          </span>
        </div>
        {/* Safety badge inline — jackpotFlash with 600ms delay (AC-9) */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold uppercase tracking-wide shrink-0 ${SEG_BG[nivel]}`}
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
      <div className="bg-[#05070a] border border-[rgba(0,229,255,0.12)] rounded-lg px-3 py-2 flex flex-col gap-1">
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
                style={{ textShadow: '0 0 5px rgba(0,229,255,0.3)' }}>
                <span className="material-symbols-outlined text-sm shrink-0 text-primary">arrow_forward</span>
                <span className="truncate">AÇÃO: {lcdActionText}</span>
              </div>
            )}
            {lcdInfoText && (
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-white/30 border-t border-white/5 pt-1">
                <span className="material-symbols-outlined text-sm text-white/20">info</span>
                <span>{lcdInfoText}</span>
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

      {/* ═══ ZONA 4 — RPM + Avanço (compact cards) ═══ */}
      <div className="grid grid-cols-2 gap-2">
        {/* RPM Card — jackpotFlash delay 0ms (AC-8) */}
        <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-xl px-3 pt-3 pb-2 shadow-glass flex flex-col gap-1"
          style={flash(0)}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Rotação (RPM)</span>
            <span className="material-symbols-outlined text-xl text-primary opacity-60">speed</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono font-bold text-primary leading-none"
              style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(0,217,255,0.5))' }}>
              {fmt(rpm)}
            </span>
            <span className="font-mono text-xs text-white/30">rev/min</span>
          </div>
          <BidirectionalSlider
            compact
            baseValue={baseRPM}
            currentPercent={manualOverrides.rpmPercent ?? 0}
            onChange={setManualRPMPercent}
            color="primary"
            label="Rotação (RPM)"
            unit="RPM"
          />
        </div>

        {/* Avanço Card — jackpotFlash delay 50ms (AC-8) */}
        <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-xl px-3 pt-3 pb-2 shadow-glass flex flex-col gap-1"
          style={flash(50)}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Avanço (mm/min)</span>
            <span className="material-symbols-outlined text-xl text-secondary opacity-60">moving</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono font-bold text-secondary leading-none"
              style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.5))' }}>
              {fmt(avanco)}
            </span>
            <span className="font-mono text-xs text-white/30">mm/min</span>
          </div>
          <BidirectionalSlider
            compact
            baseValue={baseFeed}
            currentPercent={manualOverrides.feedPercent ?? 0}
            onChange={setManualFeedPercent}
            color="secondary"
            label="Avanço (mm/min)"
            unit="mm/min"
          />
        </div>
      </div>

      {/* ═══ ZONA 5 — Input Parameters (read-only, 4 cells) ═══ */}
      <div className="grid grid-cols-4 gap-2">
        {([
          { label: 'Vc (Vel. Corte)', value: parametros.vc.toFixed(2), unit: 'm/min' },
          { label: 'fz (Av. Dente)',  value: parametros.fz.toFixed(3), unit: 'mm'    },
          { label: 'ap (Prof. Axial)', value: parametros.ap.toFixed(2), unit: 'mm'   },
          { label: 'ae (Eng. Radial)', value: parametros.ae.toFixed(2), unit: 'mm'   },
        ] as const).map(({ label, value, unit }) => (
          <div key={label}
            className="bg-[rgba(30,35,45,0.6)] border border-white/5 rounded-lg px-2.5 py-2 flex flex-col gap-0.5">
            <span className="text-xs text-white/40 uppercase tracking-wide leading-none">{label}</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg font-bold text-white leading-tight">{value}</span>
              <span className="text-xs text-white/30">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ ZONA 6 — Calculated Data Row (Power · Torque · Vc Real · L/D · CTF) ═══ */}
      <div className="flex items-center px-3 py-1.5 bg-black/30 border border-white/5 rounded-lg">
        {/* Potência Est. */}
        <div className="flex-1 flex items-center justify-between px-1">
          <span className="text-xs text-white/35 uppercase tracking-wide">Potência Est.</span>
          <span className="font-mono text-xs font-bold text-white/85">
            {potenciaMotor.toFixed(2)}<span className="text-xs opacity-40 ml-0.5">kW</span>
          </span>
        </div>
        <div className="w-px h-4 bg-white/8 shrink-0" />
        {/* Torque */}
        <div className="flex-1 flex items-center justify-between px-1">
          <span className="text-xs text-white/35 uppercase tracking-wide">Torque</span>
          <span className="font-mono text-xs font-bold text-white/85">
            {resultado.torque.toFixed(2)}<span className="text-xs opacity-40 ml-0.5">Nm</span>
          </span>
        </div>
        <div className="w-px h-4 bg-white/8 shrink-0" />
        {/* Vc Real */}
        <div className="flex-1 flex items-center justify-between px-1">
          <span className="text-xs text-white/35 uppercase tracking-wide">Vc Real</span>
          <span className="font-mono text-xs font-bold text-white/85">
            {vcReal.toFixed(0)}<span className="text-xs opacity-40 ml-0.5">m/min</span>
          </span>
        </div>
        <div className="w-px h-4 bg-white/8 shrink-0" />
        {/* MRR */}
        <div className="flex-1 flex items-center justify-between px-1">
          <span className="text-xs text-white/35 uppercase tracking-wide">MRR</span>
          <span className="font-mono text-xs font-bold text-white/85">
            {mrr.toFixed(1)}<span className="text-xs opacity-40 ml-0.5">cm³</span>
          </span>
        </div>
        <div className="w-px h-4 bg-white/8 shrink-0" />
        {/* L/D — color coded */}
        <div className="flex-1 flex items-center justify-between px-1">
          <span className="text-xs uppercase tracking-wide" style={{ color: ldColor + '99' }}>L/D</span>
          <span className="font-mono text-xs font-bold" style={{ color: ldColor }}>
            {razaoLD.toFixed(1)}
          </span>
        </div>
        <div className="w-px h-4 bg-white/8 shrink-0" />
        {/* CTF */}
        <div className="flex-1 flex items-center justify-between px-1">
          <span className="text-xs text-white/35 uppercase tracking-wide">CTF</span>
          <span className="font-mono text-xs font-bold text-primary">{ctf.toFixed(2)}</span>
        </div>
      </div>

      {/* ═══ ZONA 7 — HalfMoon Gauges ═══ */}
      <div className={`grid grid-cols-3 gap-2 ${pulseClass}`}>
        <div style={flash(100)}>
          <HalfMoonGauge
            value={avanco}
            maxValue={limites.maxAvanco}
            label="Eficiência de Avanço"
            palette="avanco"
            animateOnMount
          />
        </div>
        <div style={flash(150)}>
          <HalfMoonGauge
            value={mrrPct}
            maxValue={100}
            label="Produtividade MRR"
            palette="mrr"
            badge={storeResultado ? `${mrr.toFixed(1)} cm³/min` : undefined}
            animateOnMount
          />
        </div>
        <div style={flash(200)}>
          <HalfMoonGauge
            value={resultado.healthScore}
            maxValue={100}
            label="Saúde da Ferramenta"
            palette="health"
            badge={storeResultado && resultado.healthScore === 0 ? 'BLOQUEADO' : undefined}
            animateOnMount
          />
        </div>
      </div>

      {/* ═══ ZONA 8 — Fórmulas Educacionais (scrollável) ═══ */}
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
