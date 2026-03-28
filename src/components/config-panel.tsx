import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import { FieldGroup } from './ui-helpers';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { usePlausible } from '@/hooks/use-plausible';
import { CollapsibleSection } from './collapsible-section';
import { FineTunePanel } from './fine-tune-panel';
import { StyledSlider } from './styled-slider';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

const ROW_STYLE = { background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' };

/**
 * Free numeric input row: label on the left, number input on the right.
 * Shows inline validation error when value is outside [min, max].
 * On blur, resets display to the last valid store value if input is invalid.
 */
function NumberInputRow({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState(String(value));

  const parsed = Number(raw);
  const invalid = raw.trim() === '' || isNaN(parsed) || parsed < min || parsed > max;

  return (
    <div className="flex flex-col gap-1 rounded-md px-3 py-2" style={ROW_STYLE}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-base font-semibold text-white/85 leading-none">{label}</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            const n = Number(e.target.value);
            if (!isNaN(n) && n >= min && n <= max) onChange(n);
          }}
          onBlur={() => {
            // Reset display to last valid store value if current raw is invalid
            if (invalid) setRaw(String(value));
          }}
          aria-label={label}
          className={`bg-black/50 border rounded px-2 py-1 text-base text-white font-mono focus:outline-none w-[100px] ${
            invalid
              ? 'border-red-500 text-red-400 focus:border-red-400'
              : 'border-white/15 focus:border-primary'
          }`}
        />
      </div>
      {invalid && (
        <span className="text-xs text-red-400 px-1">
          Válido: {min}–{max} {unit}
        </span>
      )}
    </div>
  );
}

export function ConfigPanel() {
  const {
    materialId, ferramenta, tipoOperacao, parametros,
    setMaterial, setFerramenta, setTipoOperacao,
    simular, reset,
    savedTools, loadSavedTool, addSavedTool,
    safetyFactor, setSafetyFactor,
  } = useMachiningStore();

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
  const summarySeguranca = `SF ${safetyFactor.toFixed(2)}`;

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
              <select value={materialId} onChange={(e) => {
                const id = Number(e.target.value);
                setMaterial(id);
                const mat = MATERIAIS.find((m) => m.id === id);
                if (mat) track('Material_Selecionado', { material: mat.nome });
              }}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-3 pr-10 text-base text-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none transition-all hover:border-white/20 select-chevron">
                {MATERIAIS.map((m) => (
                  <option key={m.id} value={m.id}>{m.nome}{m.status === 'estimado' ? ' ⚠' : ''}</option>
                ))}
              </select>
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
              <div className="grid grid-cols-3 gap-2">
                {Object.values(TipoUsinagem).map((t) => (
                  <button key={t} onClick={() => setTipoOperacao(t)}
                    className={`py-2 rounded border text-base transition-colors ${tipoOperacao === t
                      ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                      : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                    {OPERACAO_LABELS[t]}
                  </button>
                ))}
              </div>
            </FieldGroup>
            {/* Objetivo Usinagem — será adicionado na Fase 5 */}
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
              <div className="grid grid-cols-3 gap-2">
                {FERRAMENTAS_PADRAO.map((f) => (
                  <button key={f.tipo} onClick={() => setFerramenta({ tipo: f.tipo, numeroArestas: f.zPadrao })}
                    className={`py-2 rounded border text-base transition-colors ${ferramenta.tipo === f.tipo
                      ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                      : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                    {f.descricao.split(' ')[0]}
                  </button>
                ))}
              </div>
            </FieldGroup>

            {/* 2. Diameter — free input (0.1–200 mm) */}
            <NumberInputRow
              label="Diâmetro (mm)"
              value={ferramenta.diametro}
              min={0.1}
              max={200}
              step={0.1}
              unit="mm"
              onChange={(v) => setFerramenta({ diametro: v })}
            />

            {/* 3. Corner radius — free input (toroidal only, 0.05–50 mm) */}
            {ferramenta.tipo === 'toroidal' && (
              <NumberInputRow
                label="Raio da Ponta (mm)"
                value={ferramenta.raioQuina ?? 1.0}
                min={0.05}
                max={50}
                step={0.05}
                unit="mm"
                onChange={(v) => setFerramenta({ raioQuina: v })}
              />
            )}

            {/* 4. Arestas — 4 fixed buttons [2, 3, 4, 6] */}
            <div className="flex items-center justify-between gap-3 rounded-md px-3 py-2" style={ROW_STYLE}>
              <span className="text-base font-semibold text-white/85 leading-none">Arestas (Z)</span>
              <div className="flex gap-1">
                {[2, 3, 4, 6].map((z) => (
                  <button
                    key={z}
                    onClick={() => setFerramenta({ numeroArestas: z })}
                    className={`w-10 py-1 rounded border text-sm font-mono transition-colors ${
                      ferramenta.numeroArestas === z
                        ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Altura de Fixação — free input (5–300 mm) */}
            <NumberInputRow
              label="Altura Fixação (mm)"
              value={ferramenta.balanco}
              min={5}
              max={300}
              step={1}
              unit="mm"
              onChange={(v) => setFerramenta({ balanco: v })}
            />
          </div>
        </CollapsibleSection>

        {/* Seção 3: Ajuste Fino (movido do FineTunePanel) */}
        <CollapsibleSection
          title="Ajuste Fino"
          summary={summaryAjuste}
        >
          <FineTunePanel embedded />
        </CollapsibleSection>

        {/* Seção 4: Segurança — Safety Factor slider */}
        <CollapsibleSection
          title="Segurança"
          summary={summarySeguranca}
          defaultOpen={false}
        >
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <StyledSlider
                  value={safetyFactor}
                  min={0.50}
                  max={1.00}
                  step={0.05}
                  color="primary"
                  label="Fator de Segurança"
                  onChange={(v) => setSafetyFactor(v)}
                />
              </div>
              <span className="text-base font-mono text-primary w-10 text-right">
                {safetyFactor.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-600 px-8">
              <span>← Conservador</span>
              <span>Agressivo →</span>
            </div>
            <p className="text-xs text-gray-500 px-1">
              Aplicado à Potência e Torque. 0.80 recomendado para operação segura.
            </p>
          </div>
        </CollapsibleSection>

      </div>
    </div>
  );
}
