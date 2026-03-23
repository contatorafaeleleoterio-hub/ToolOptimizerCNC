import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO, DIAMETROS_COMPLETOS, RAIOS_PONTA, ARESTAS_OPTIONS, ALTURAS_FIXACAO } from '@/data';
import { TipoUsinagem } from '@/types';
import type { ObjetivoUsinagem } from '@/types';
import { PinDefaultButton } from './pin-default-button';
import { FieldGroup } from './ui-helpers';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { usePlausible } from '@/hooks/use-plausible';
import { CollapsibleSection } from './collapsible-section';
import { FineTunePanel } from './fine-tune-panel';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

/**
 * Compact inline dropdown row: label on the left, select on the right.
 * Used for Ferramenta fields (Diâmetro, Raio, Arestas, Altura).
 */
function DropdownRow({
  label,
  value,
  options,
  onChange,
  format,
}: {
  label: string;
  value: number;
  options: readonly number[];
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-md px-3 py-2"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}
    >
      <span className="text-base font-semibold text-white/85 leading-none">{label}</span>
      <select
        value={String(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="bg-black/50 border border-white/15 rounded px-2 py-1 text-base text-white font-mono focus:outline-none focus:border-primary cursor-pointer min-w-[90px] appearance-none select-chevron"
      >
        {options.map((opt) => (
          <option key={opt} value={String(opt)}>
            {format ? format(opt) : String(opt)}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ConfigPanel() {
  const {
    materialId, ferramenta, tipoOperacao, parametros,
    setMaterial, setFerramenta, setTipoOperacao,
    simular, reset,
    savedTools, loadSavedTool, addSavedTool,
    objetivoUsinagem, setObjetivoUsinagem,
    userDefaults, pinDefault, unpinDefault,
  } = useMachiningStore();

  const OBJETIVO_LABELS: Record<ObjetivoUsinagem, string> = {
    velocidade: 'Velocidade',
    balanceado: 'Balanceado',
    vida_util:  'Vida Útil',
  };

  const [showSavedBadge, setShowSavedBadge] = useState(false);

  const handleSaveTool = () => {
    const { tipo, diametro, raioQuina, numeroArestas, balanco } = ferramenta;
    const jaExiste = savedTools.some(
      (t) =>
        t.tipo === tipo && t.diametro === diametro &&
        t.numeroArestas === numeroArestas && t.balanco === balanco &&
        (tipo !== 'toroidal' || t.raioQuina === raioQuina)
    );
    if (jaExiste) return;
    addSavedTool({ tipo, diametro, raioQuina, numeroArestas, balanco });
    setShowSavedBadge(true);
    setTimeout(() => setShowSavedBadge(false), 2000);
  };

  const { isCalculating, runSimulation } = useSimulationAnimation();
  const { track } = usePlausible();

  const material = MATERIAIS.find((m) => m.id === materialId);
  const vcRange = material?.vcRanges[tipoOperacao];

  // Dados para os summaries dos accordeons
  const materialNome = material?.nome ?? '—';
  const operacaoLabel = OPERACAO_LABELS[tipoOperacao];
  const ferramentaTipoLabel = ferramenta.tipo === 'toroidal' ? 'Toroidal' : ferramenta.tipo === 'esferica' ? 'Esférica' : 'Topo';
  const summaryBase = `${materialNome} | ${operacaoLabel}`;
  const summaryFerramenta = `${ferramentaTipoLabel} Ø${ferramenta.diametro} | A${ferramenta.numeroArestas}`;
  const summaryAjuste = `Vc ${parametros.vc} | fz ${parametros.fz}`;

  const handleSimulate = () => {
    track('Simulacao_Executada', {
      material: material?.nome ?? 'desconhecido',
      operacao: tipoOperacao,
    });
    runSimulation(simular);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Sticky Simular + Reset bar */}
      <div className="sticky top-0 z-10 bg-background-dark/90 backdrop-blur-md pt-0 pb-2">
        <div className="flex gap-3">
          <button onClick={handleSimulate} disabled={isCalculating}
            className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base uppercase disabled:opacity-70 disabled:cursor-not-allowed">
            {isCalculating ? (
              <>
                <span className="material-symbols-outlined text-lg animate-[spinner_0.9s_linear_infinite]">refresh</span>
                Calculando...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                Simular
              </>
            )}
          </button>
          <button onClick={reset}
            className="w-12 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center active:scale-[0.98]">
            <span className="material-symbols-outlined text-xl">restart_alt</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-2 shadow-glass flex flex-col gap-3">

        {/* Seção 1: Configuração Base */}
        <CollapsibleSection
          title="Configuração Base"
          summary={summaryBase}
        >
          <div className="space-y-3 pt-1">
            <FieldGroup label="Material da Peça">
              <div className="flex items-center gap-2">
                <select value={materialId} onChange={(e) => {
                  const id = Number(e.target.value);
                  setMaterial(id);
                  const mat = MATERIAIS.find((m) => m.id === id);
                  if (mat) track('Material_Selecionado', { material: mat.nome });
                }}
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg py-3 pl-3 pr-10 text-base text-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none transition-all hover:border-white/20 select-chevron">
                  {MATERIAIS.map((m) => (
                    <option key={m.id} value={m.id}>{m.nome}{m.status === 'estimado' ? ' ⚠' : ''}</option>
                  ))}
                </select>
                <PinDefaultButton
                  isPinned={userDefaults.materialId === materialId}
                  onClick={() => userDefaults.materialId === materialId ? unpinDefault('materialId') : pinDefault('materialId', materialId)}
                  label="Fixar material como padrão"
                />
              </div>
              {material && (
                <div className="flex justify-between mt-1 px-1">
                  <span className="text-xs text-gray-600">{material.dureza}</span>
                  {vcRange && <span className="text-2xs text-primary/70">Vc: {vcRange[0]}-{vcRange[1]} m/min</span>}
                </div>
              )}
              {material?.status === 'estimado' && (
                <span className="text-xs text-seg-amarelo mt-1 block">Dados estimados</span>
              )}
            </FieldGroup>
            <FieldGroup label="Tipo de Usinagem">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-3 gap-2 flex-1">
                  {Object.values(TipoUsinagem).map((t) => (
                    <button key={t} onClick={() => setTipoOperacao(t)}
                      className={`py-2 rounded border text-base transition-colors ${tipoOperacao === t
                        ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                      {OPERACAO_LABELS[t]}
                    </button>
                  ))}
                </div>
                <PinDefaultButton
                  isPinned={userDefaults.tipoOperacao === tipoOperacao}
                  onClick={() => userDefaults.tipoOperacao === tipoOperacao ? unpinDefault('tipoOperacao') : pinDefault('tipoOperacao', tipoOperacao)}
                  label="Fixar operação como padrão"
                />
              </div>
            </FieldGroup>
            <FieldGroup label="Objetivo de Usinagem">
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(OBJETIVO_LABELS) as ObjetivoUsinagem[]).map((obj) => (
                  <button
                    key={obj}
                    onClick={() => setObjetivoUsinagem(obj)}
                    aria-label={OBJETIVO_LABELS[obj]}
                    className={`py-2 rounded border text-base transition-colors ${objetivoUsinagem === obj
                      ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                      : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}
                  >
                    {OBJETIVO_LABELS[obj]}
                  </button>
                ))}
              </div>
            </FieldGroup>
          </div>
        </CollapsibleSection>

        {/* Seção 2: Ferramenta */}
        <CollapsibleSection
          title="Ferramenta"
          summary={summaryFerramenta}
        >
          <div className="space-y-3 pt-1">
            {/* Saved Tools — Manual Save + Dropdown */}
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <select
                  aria-label="Ferramenta Salva"
                  value=""
                  onChange={(e) => { if (e.target.value) loadSavedTool(e.target.value); }}
                  disabled={savedTools.length === 0}
                  className="flex-1 bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary cursor-pointer appearance-none select-chevron disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savedTools.length === 0 ? (
                    <option value="">Nenhuma ferramenta salva</option>
                  ) : (
                    <>
                      <option value="">Selecionar ferramenta salva...</option>
                      {savedTools.map((tool) => (
                        <option key={tool.id} value={tool.id}>{tool.nome}</option>
                      ))}
                    </>
                  )}
                </select>
                <button
                  aria-label="Salvar ferramenta"
                  onClick={handleSaveTool}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  title="Salvar configuração atual"
                >
                  <span className="material-symbols-outlined text-sm text-white/70">save</span>
                </button>
              </div>
              {showSavedBadge && (
                <span className="text-xs font-semibold mt-1 block animate-[fadeInUp_0.3s_ease]" style={{ color: '#2ecc71' }}>
                  ✓ Ferramenta salva
                </span>
              )}
              <div className="border-b border-white/5 mt-3" />
            </div>

            {/* 1. Tool type */}
            <FieldGroup label="Tipo">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-3 gap-2 flex-1">
                  {FERRAMENTAS_PADRAO.map((f) => (
                    <button key={f.tipo} onClick={() => setFerramenta({ tipo: f.tipo, numeroArestas: f.zPadrao })}
                      className={`py-2 rounded border text-base transition-colors ${ferramenta.tipo === f.tipo
                        ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                      {f.descricao.split(' ')[0]}
                    </button>
                  ))}
                </div>
                <PinDefaultButton
                  isPinned={userDefaults.ferramentaTipo === ferramenta.tipo}
                  onClick={() => userDefaults.ferramentaTipo === ferramenta.tipo ? unpinDefault('ferramentaTipo') : pinDefault('ferramentaTipo', ferramenta.tipo)}
                  label="Fixar tipo de ferramenta como padrão"
                />
              </div>
            </FieldGroup>

            {/* 2. Diameter — DropdownRow + pin */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <DropdownRow
                  label="Diâmetro (mm)"
                  value={ferramenta.diametro}
                  options={DIAMETROS_COMPLETOS}
                  onChange={(v) => setFerramenta({ diametro: v })}
                  format={(v) => `${v} mm`}
                />
              </div>
              <PinDefaultButton
                isPinned={userDefaults.diametro === ferramenta.diametro}
                onClick={() => userDefaults.diametro === ferramenta.diametro ? unpinDefault('diametro') : pinDefault('diametro', ferramenta.diametro)}
                label="Fixar diâmetro como padrão"
              />
            </div>

            {/* 3. Corner radius — DropdownRow + pin (toroidal only) */}
            {ferramenta.tipo === 'toroidal' && (
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <DropdownRow
                    label="Raio da Ponta"
                    value={ferramenta.raioQuina ?? 1.0}
                    options={RAIOS_PONTA}
                    onChange={(v) => setFerramenta({ raioQuina: v })}
                    format={(v) => `${v} mm`}
                  />
                </div>
                <PinDefaultButton
                  isPinned={userDefaults.raioQuina === (ferramenta.raioQuina ?? 1.0)}
                  onClick={() => userDefaults.raioQuina === (ferramenta.raioQuina ?? 1.0) ? unpinDefault('raioQuina') : pinDefault('raioQuina', ferramenta.raioQuina ?? 1.0)}
                  label="Fixar raio da ponta como padrão"
                />
              </div>
            )}

            {/* 4. Arestas — DropdownRow + pin */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <DropdownRow
                  label="Arestas (Z)"
                  value={ferramenta.numeroArestas}
                  options={ARESTAS_OPTIONS}
                  onChange={(v) => setFerramenta({ numeroArestas: v })}
                  format={(v) => `${v} arestas`}
                />
              </div>
              <PinDefaultButton
                isPinned={userDefaults.numeroArestas === ferramenta.numeroArestas}
                onClick={() => userDefaults.numeroArestas === ferramenta.numeroArestas ? unpinDefault('numeroArestas') : pinDefault('numeroArestas', ferramenta.numeroArestas)}
                label="Fixar arestas como padrão"
              />
            </div>

            {/* 5. Altura de Fixação — DropdownRow + pin */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <DropdownRow
                  label="Altura Fixação (mm)"
                  value={ferramenta.balanco}
                  options={ALTURAS_FIXACAO}
                  onChange={(v) => setFerramenta({ balanco: v })}
                  format={(v) => `${v} mm`}
                />
              </div>
              <PinDefaultButton
                isPinned={userDefaults.balanco === ferramenta.balanco}
                onClick={() => userDefaults.balanco === ferramenta.balanco ? unpinDefault('balanco') : pinDefault('balanco', ferramenta.balanco)}
                label="Fixar altura de fixação como padrão"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Seção 3: Ajuste Fino (movido do FineTunePanel) */}
        <CollapsibleSection
          title="Ajuste Fino"
          summary={summaryAjuste}
        >
          <FineTunePanel embedded />
        </CollapsibleSection>

      </div>
    </div>
  );
}
