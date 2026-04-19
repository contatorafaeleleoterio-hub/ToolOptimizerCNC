import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { useHistoryStore } from '@/store';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { TipoUsinagem } from '@/types/index';
import type { Ferramenta, SavedTool } from '@/types/index';
import { FormulaCard, Fraction } from '../formula-card';
import { ToolEditModal } from '../modals/tool-edit-modal';
import { getMaterialById } from '@/data';
import {
  fmt,
  SEG_COLORS, SEG_ICONS, SEG_LABELS, SEG_BG,
  BigNumber, WarningsSection,
} from '../shared-result-parts';
import { haptics } from '@/utils/haptics';
import { HmiVisor } from './hmi-visor';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

/** Compact tool spec string: "Toroidal Ø6 R1.0 H25 F4" */
function formatToolSpec(f: Ferramenta): string {
  const tipo = f.tipo === 'toroidal' ? 'Toroidal' : f.tipo === 'esferica' ? 'Esférica' : 'Topo Reto';
  const raio = f.tipo === 'toroidal' ? ` R${f.raioQuina ?? 1.0}` : f.tipo === 'esferica' ? ` R${f.diametro / 2}` : '';
  return `${tipo} Ø${f.diametro}${raio} H${f.balanco} F${f.numeroArestas}`;
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
  const materialId = useMachiningStore((s) => s.materialId);
  const setManualRPMPercent = useMachiningStore((s) => s.setManualRPMPercent);
  const setManualFeedPercent = useMachiningStore((s) => s.setManualFeedPercent);
  const savedTools = useMachiningStore((s) => s.savedTools);
  const updateSavedTool = useMachiningStore((s) => s.updateSavedTool);

  const historyEntries = useHistoryStore((s) => s.entries);
  const toggleFavorite = useHistoryStore((s) => s.toggleFavorite);

  const { isRevealing } = useSimulationAnimation();
  const flash = (delayMs: number) =>
    isRevealing ? { animation: `jackpotFlash 550ms ease-out ${delayMs}ms both` } : undefined;

  const [editingTool, setEditingTool] = useState<SavedTool | null>(null);
  const [viewMode, setViewMode] = useState<'educational' | 'hmi'>('hmi');

  const toggleViewMode = () => {
    const next = viewMode === 'educational' ? 'hmi' : 'educational';
    setViewMode(next);
    haptics.impactMedium();
  };

  const latestEntry = historyEntries[0];
  const isFavorited = latestEntry?.favorited ?? false;

  const material = getMaterialById(materialId);
  const materialNome = material?.nome ?? '—';
  const timestamp = latestEntry ? formatTimestamp(latestEntry.timestamp) : formatTimestamp(Date.now());

  // Derived values when resultado is available
  const resultado = storeResultado;
  const nivel = resultado?.seguranca.nivel ?? 'verde';
  const avisos = resultado?.seguranca.avisos ?? [];
  const razaoLD = resultado?.seguranca.razaoLD ?? 0;
  const ctf = resultado?.seguranca.ctf ?? 1;
  const ldColor = getLdColor(razaoLD);



  // LCD alert line
  const lcdAlertLine = (() => {
    if (!resultado) return { text: 'AGUARDANDO SIMULAÇÃO — CONFIGURE E CLIQUE EM SIMULAR', color: 'rgba(255,255,255,0.25)', icon: 'hourglass_empty' };
    if (nivel === 'bloqueado') return { text: 'L/D > 6 — OPERAÇÃO BLOQUEADA', color: '#e74c3c', icon: 'block' };
    if (nivel === 'vermelho') return { text: avisos[0] ?? 'PARÂMETROS CRÍTICOS DETECTADOS', color: '#e74c3c', icon: 'emergency_home' };
    if (nivel === 'amarelo') return { text: avisos[0] ?? 'ATENÇÃO: RISCO DE VIBRAÇÃO', color: '#f39c12', icon: 'warning' };
    return { text: '✓ PARÂMETROS SEGUROS', color: '#2ecc71', icon: 'check_circle' };
  })();

  const lcdInfoText = resultado
    ? `L/D: ${razaoLD.toFixed(1)} · CTF: ${ctf.toFixed(2)} · POT: ${Math.round(resultado.powerHeadroom)}%`
    : null;

  // Find matching saved tool for edit button
  const matchingSavedTool = savedTools.find(
    (t) => t.tipo === ferramenta.tipo && t.diametro === ferramenta.diametro
  ) ?? null;

  return (
    <section className="flex flex-col gap-3 px-4 pb-32">

      {/* ═══ ZONA 1 — Console Header Bar ═══ */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0f1419] border border-white/10 rounded-lg">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="font-mono text-[10px] text-white/35 shrink-0">{timestamp}</span>
          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
          <span className="text-[11px] font-semibold text-white truncate">{materialNome}</span>
          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
          <span className="text-[10px] font-semibold text-white/60 bg-white/8 px-1.5 py-0.5 rounded uppercase shrink-0">
            {OPERACAO_LABELS[tipoOperacao]}
          </span>
        </div>

        {/* View Mode Toggle */}
        <button
          onClick={toggleViewMode}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider transition-all active:scale-95 ${
            viewMode === 'hmi' 
              ? 'bg-primary/20 border-primary/40 text-primary' 
              : 'bg-white/5 border-white/10 text-white/40'
          }`}
        >
          <span className="material-symbols-outlined text-xs">
            {viewMode === 'hmi' ? 'precision_manufacturing' : 'school'}
          </span>
          {viewMode === 'hmi' ? 'HMI' : 'EDUC.'}
        </button>

        {/* Safety badge inline */}
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wide shrink-0 ${SEG_BG[nivel]}`}>
          <span
            className={`material-symbols-outlined text-sm ${SEG_COLORS[nivel]}`}
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            {SEG_ICONS[nivel]}
          </span>
          <span className={SEG_COLORS[nivel]}>{SEG_LABELS[nivel]}</span>
        </div>
        {/* Favorite button */}
        {storeResultado !== null && latestEntry && (
          <button
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar simulação'}
            onClick={() => toggleFavorite(latestEntry.id)}
            className="p-1 rounded-md bg-black/30 border border-white/10 active:bg-white/5 transition-all active:scale-95 shrink-0"
          >
            <span
              className="material-symbols-outlined text-base transition-all"
              style={{
                fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                color: isFavorited ? '#facc15' : 'rgba(255,255,255,0.4)',
                filter: isFavorited ? 'drop-shadow(0 0 6px rgba(250,204,21,0.5))' : undefined,
              }}
            >star</span>
          </button>
        )}
      </div>

      {/* ═══ ZONA 2 — LCD Display (compact, 2 lines) ═══ */}
      <div className="bg-[#05070a] border border-[rgba(0,229,255,0.12)] rounded-lg px-3 py-2 flex flex-col gap-1">
        <div
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide"
          style={{ color: lcdAlertLine.color }}
        >
          <span className="material-symbols-outlined text-sm shrink-0" style={{ color: lcdAlertLine.color }}>
            {lcdAlertLine.icon}
          </span>
          <span className="truncate">{lcdAlertLine.text}</span>
        </div>
        {lcdInfoText && (
          <div className="font-mono text-[10px] uppercase tracking-wide text-white/25 border-t border-white/5 pt-1">
            {lcdInfoText}
          </div>
        )}
      </div>

      {/* ═══ ZONA 3 — Tool Row ═══ */}
      <div
        data-testid="tool-summary"
        className="flex items-center gap-2 px-3 py-2 bg-[rgba(30,35,45,0.6)] border border-white/5 rounded-lg"
      >
        <span className="material-symbols-outlined text-primary text-lg shrink-0">precision_manufacturing</span>
        <span className="text-[9px] text-white/40 uppercase tracking-widest shrink-0">Ferramenta:</span>
        <span className="font-mono text-sm font-bold text-white truncate flex-1">{formatToolSpec(ferramenta)}</span>
        <button
          aria-label="Editar ferramenta"
          onClick={() => matchingSavedTool && setEditingTool(matchingSavedTool)}
          className="p-1 rounded-md bg-white/5 border border-white/10 active:bg-white/10 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-sm text-white/50">edit</span>
        </button>
      </div>

      {/* Empty state — first time, no history */}
      {!storeResultado && !latestEntry && (
        <div className="bg-[rgba(30,38,50,0.95)] backdrop-blur-sm border border-white/12 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="material-symbols-outlined text-3xl text-gray-400">precision_manufacturing</span>
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
      {!storeResultado && latestEntry && (
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

      {/* ═══ ZONAS 4-8 — só com resultado ═══ */}
      {resultado && (() => {
        if (viewMode === 'hmi') {
          return <HmiVisor />;
        }

        const { rpm, avanco, potenciaMotor, mrr, vcReal } = resultado;
        const rpmPct = Math.min((rpm / limites.maxRPM) * 100, 100);
        const feedPct = Math.min((avanco / limites.maxAvanco) * 100, 100);

        return (
          <div className="flex flex-col gap-3 animate-[fadeInUp_0.35s_ease-out]">

            {/* ═══ ZONA 4 — RPM + Avanço ═══ */}
            <div style={flash(0)}>
              <BigNumber label="Rotação (RPM)" value={fmt(rpm)} unit="RPM" pct={rpmPct}
                color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
                numericValue={rpm} animateOnReveal
                useBidirectionalSlider
                baseValue={baseRPM}
                currentPercent={manualOverrides.rpmPercent ?? 0}
                onPercentChange={setManualRPMPercent} />
            </div>
            <div style={flash(50)}>
              <BigNumber label="Avanço (mm/min)" value={fmt(avanco)} unit="mm/min" pct={feedPct}
                color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
                numericValue={avanco} animateOnReveal
                useBidirectionalSlider
                baseValue={baseFeed}
                currentPercent={manualOverrides.feedPercent ?? 0}
                onPercentChange={setManualFeedPercent} />
            </div>

            {/* ═══ ZONA 5 — Input Params (2×2) ═══ */}
            <div className="grid grid-cols-2 gap-1.5">
              {([
                { label: 'Vc (Vel. Corte)', value: parametros.vc.toFixed(2), unit: 'm/min' },
                { label: 'fz (Av. Dente)',  value: parametros.fz.toFixed(3), unit: 'mm'    },
                { label: 'ap (Prof. Axial)', value: parametros.ap.toFixed(2), unit: 'mm'   },
                { label: 'ae (Eng. Radial)', value: parametros.ae.toFixed(2), unit: 'mm'   },
              ] as const).map(({ label, value, unit }) => (
                <div key={label}
                  className="bg-[rgba(30,35,45,0.6)] border border-white/5 rounded-lg px-2 py-1.5 flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 uppercase tracking-wide leading-none">{label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-base font-bold text-white leading-tight">{value}</span>
                    <span className="text-[9px] text-white/30">{unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ═══ ZONA 6 — Dados Calculados (2×2 + L/D + CTF) ═══ */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Potência Est. */}
              <div className="bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] text-white/35 uppercase tracking-wide">Potência Est.</span>
                <span className="font-mono text-xs font-bold text-white/85">
                  {potenciaMotor.toFixed(2)}<span className="text-[9px] opacity-40 ml-0.5">kW</span>
                </span>
              </div>
              {/* Torque */}
              <div className="bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] text-white/35 uppercase tracking-wide">Torque</span>
                <span className="font-mono text-xs font-bold text-white/85">
                  {resultado.torque.toFixed(2)}<span className="text-[9px] opacity-40 ml-0.5">Nm</span>
                </span>
              </div>
              {/* Vc Real */}
              <div className="bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] text-white/35 uppercase tracking-wide">Vc Real</span>
                <span className="font-mono text-xs font-bold text-white/85">
                  {vcReal.toFixed(0)}<span className="text-[9px] opacity-40 ml-0.5">m/min</span>
                </span>
              </div>
              {/* MRR */}
              <div className="bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] text-white/35 uppercase tracking-wide">MRR</span>
                <span className="font-mono text-xs font-bold text-white/85">
                  {mrr.toFixed(1)}<span className="text-[9px] opacity-40 ml-0.5">cm³</span>
                </span>
              </div>
              {/* L/D — color coded */}
              <div className="bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wide" style={{ color: ldColor + '99' }}>L/D</span>
                <span className="font-mono text-xs font-bold" style={{ color: ldColor }}>
                  {razaoLD > 6 ? 'BLOQ.' : razaoLD.toFixed(1)}
                </span>
              </div>
              {/* CTF */}
              <div className="bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] text-white/35 uppercase tracking-wide">CTF</span>
                <span className="font-mono text-xs font-bold text-primary">{ctf.toFixed(2)}</span>
              </div>
            </div>

            <WarningsSection avisos={avisos} />

            {/* ═══ ZONA 8 — Fórmulas Educacionais (colapsáveis) ═══ */}
            <div className="bg-[rgba(30,38,50,0.95)] backdrop-blur-xl border border-white/12 rounded-2xl p-4 shadow-glass">
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

      {/* ToolEditModal — triggered from Tool Row edit button */}
      {editingTool && (
        <ToolEditModal
          tool={editingTool}
          onSave={(updates) => { updateSavedTool(editingTool.id, updates); setEditingTool(null); }}
          onClose={() => setEditingTool(null)}
        />
      )}
    </section>
  );
}
