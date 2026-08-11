import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import type { SavedTool } from '@/types';
import { FieldGroup } from './ui-helpers';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { usePlausible } from '@/hooks/use-plausible';
import { CollapsibleSection } from './collapsible-section';
import { FineTunePanel } from './fine-tune-panel';
import { StyledSlider } from './styled-slider';
import { ToolEditModal } from './modals/tool-edit-modal';
import { BUTTON_PM_TOUCH } from './design-tokens';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

const ROW_STYLE = { background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' };

const ADVANCED_OPEN_KEY = 'tooloptimizer-cnc-config-advanced-open';

function readAdvancedOpenDefault(): boolean {
  try {
    return localStorage.getItem(ADVANCED_OPEN_KEY) === 'true';
  } catch {
    return false;
  }
}

function persistAdvancedOpen(open: boolean) {
  try {
    localStorage.setItem(ADVANCED_OPEN_KEY, String(open));
  } catch {
    // localStorage unavailable (privacy mode) — advanced toggle simply won't persist
  }
}

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
    <div className="flex flex-col gap-1 rounded-lg px-3 py-2" style={ROW_STYLE}>
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
              : 'border-white/10 focus:border-primary'
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

// Diameter categories for grouping saved tools
const DIAMETER_CATEGORIES = [
  { label: '≤ 6mm', min: 0, max: 6 },
  { label: '6 – 12mm', min: 6, max: 12 },
  { label: '12 – 20mm', min: 12, max: 20 },
  { label: '> 20mm', min: 20, max: Infinity },
] as const;

const TIPO_LABEL: Record<SavedTool['tipo'], string> = {
  topo: 'Fresa de topo',
  toroidal: 'Fresa toroidal',
  esferica: 'Fresa esférica',
};

// Arestas (Z) — catálogo fixo de flautas suportadas pelo motor de cálculo.
// O stepper avança/recua dentro deste array — nunca aritmética livre (±1),
// para não permitir valores de Z fora do domínio válido (ex.: 5).
const ARESTA_OPTIONS = [2, 3, 4, 6] as const;

function stepArestas(current: number, direction: 1 | -1): number {
  const idx = ARESTA_OPTIONS.indexOf(current as (typeof ARESTA_OPTIONS)[number]);
  const safeIdx = idx === -1 ? 0 : idx;
  const nextIdx = Math.min(ARESTA_OPTIONS.length - 1, Math.max(0, safeIdx + direction));
  return ARESTA_OPTIONS[nextIdx];
}

// SVG symbol for diameter (circle with diagonal line)
function DiameterSymbol() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4.5" stroke="#475569" strokeWidth="1.3" />
      <line x1="1.5" y1="10.5" x2="10.5" y2="1.5" stroke="#475569" strokeWidth="1.3" />
    </svg>
  );
}

interface SavedToolsListProps {
  savedTools: SavedTool[];
  activeDiametro: number;
  onLoad: (id: string) => void;
  onEdit: (tool: SavedTool) => void;
  onRemove: (id: string) => void;
}

function SavedToolsList({ savedTools, activeDiametro, onLoad, onEdit, onRemove }: SavedToolsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {DIAMETER_CATEGORIES.map((cat) => {
        const tools = savedTools
          .filter((t) => t.diametro > cat.min && t.diametro <= (cat.max === Infinity ? Infinity : cat.max))
          .sort((a, b) => a.diametro - b.diametro);
        if (tools.length === 0) return null;
        return (
          <div key={cat.label}>
            <span className="text-[10px] uppercase tracking-widest text-gray-600 px-1">{cat.label}</span>
            <div className="flex flex-col gap-0.5 mt-0.5">
              {tools.map((tool) => {
                const isActive = tool.diametro === activeDiametro;
                return (
                  <div
                    key={tool.id}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-black/20 border-white/10 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <button
                      className="flex-1 flex items-center gap-1.5 text-left min-w-0"
                      onClick={() => onLoad(tool.id)}
                      aria-label={`Carregar ${tool.nome}`}
                    >
                      <DiameterSymbol />
                      <span className={`font-mono text-xs truncate ${isActive ? 'text-primary' : 'text-gray-300'}`}>
                        {tool.diametro}mm
                      </span>
                      <span className="text-gray-600 text-xs">|</span>
                      <span className="text-gray-500 text-xs">R {tool.raioQuina ?? 0}</span>
                      <span className="text-gray-600 text-xs">|</span>
                      <span className="text-gray-500 text-xs">H {tool.balanco}</span>
                      {tool.anguloHelice != null && (
                        <>
                          <span className="text-gray-600 text-xs">|</span>
                          <span className="text-gray-500 text-xs">Hél. {tool.anguloHelice}°</span>
                        </>
                      )}
                      <span className="text-gray-600 text-xs">|</span>
                      <span className="text-gray-500 text-xs truncate">{TIPO_LABEL[tool.tipo]}</span>
                    </button>
                    <div className="flex items-center gap-0.5 ml-1">
                      <button
                        aria-label={`Editar ${tool.nome}`}
                        onClick={() => onEdit(tool)}
                        className="p-0.5 text-gray-500 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>edit</span>
                      </button>
                      <button
                        aria-label={`Remover ${tool.nome}`}
                        onClick={() => onRemove(tool.id)}
                        className="p-0.5 text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ConfigPanel() {
  const {
    materialId, ferramenta, tipoOperacao, parametros,
    setMaterial, setFerramenta, setTipoOperacao,
    simular, reset,
    savedTools, loadSavedTool, addSavedTool, removeSavedTool, updateSavedTool,
    safetyFactor, setSafetyFactor,
  } = useMachiningStore();

  const [showSavedBadge, setShowSavedBadge] = useState(false);
  const [editingTool, setEditingTool] = useState<SavedTool | null>(null);
  const [advancedDefaultOpen] = useState(readAdvancedOpenDefault);

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

  const { isUpdated, runSimulation } = useSimulationAnimation();
  const { track } = usePlausible();

  const material = MATERIAIS.find((m) => m.id === materialId);
  const vcRange = material?.vcRanges[tipoOperacao];

  const summaryAvancado = `Vc ${parametros.vc} · SF ${Math.round(safetyFactor * 100)}%`;

  const handleSimulate = () => {
    track('Simulacao_Executada', {
      material: material?.nome ?? 'desconhecido',
      operacao: tipoOperacao,
    });
    runSimulation(simular);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex-1 bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-3 shadow-glass flex flex-col gap-3 overflow-y-auto">

        <span className="text-[11px] uppercase tracking-widest text-gray-600 font-bold">Configuração Base</span>

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

        <FieldGroup label="Operação">
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

        <span className="text-[11px] uppercase tracking-widest text-gray-600 font-bold mt-2">Ferramenta</span>

        <div>
          {savedTools.length > 0 ? (
            <SavedToolsList
              savedTools={savedTools}
              activeDiametro={ferramenta.diametro}
              onLoad={loadSavedTool}
              onEdit={setEditingTool}
              onRemove={removeSavedTool}
            />
          ) : (
            <p className="text-xs text-gray-600 text-center py-2">Nenhuma ferramenta salva</p>
          )}
          <button
            aria-label="Salvar ferramenta"
            onClick={handleSaveTool}
            className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs text-gray-400 hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Salvar ferramenta atual
          </button>
          {showSavedBadge && (
            <span className="text-xs font-semibold mt-1 block animate-[fadeInUp_0.3s_ease]" style={{ color: '#2ecc71' }}>
              ✓ Ferramenta salva
            </span>
          )}
        </div>

        {editingTool && (
          <ToolEditModal
            tool={editingTool}
            onSave={(updates) => { updateSavedTool(editingTool.id, updates); setEditingTool(null); }}
            onClose={() => setEditingTool(null)}
          />
        )}

        <FieldGroup label="Tipo de fresa">
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

        <div className="grid grid-cols-[1fr_140px] gap-3">
          <NumberInputRow
            label="Diâmetro (mm)"
            value={ferramenta.diametro}
            min={0.1}
            max={200}
            step={0.1}
            unit="mm"
            onChange={(v) => setFerramenta({ diametro: v })}
          />
          <div className="flex flex-col gap-1 rounded-lg px-3 py-2" style={ROW_STYLE}>
            <span className="text-base font-semibold text-white/85 leading-none">Z (dentes)</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFerramenta({ numeroArestas: stepArestas(ferramenta.numeroArestas, -1) })}
                disabled={ferramenta.numeroArestas === ARESTA_OPTIONS[0]}
                aria-label="Diminuir número de arestas"
                className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 text-white font-bold hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                −
              </button>
              <span className="flex-1 text-center font-mono text-base font-bold text-white" aria-label="Número de arestas atual">
                {ferramenta.numeroArestas}
              </span>
              <button
                onClick={() => setFerramenta({ numeroArestas: stepArestas(ferramenta.numeroArestas, 1) })}
                disabled={ferramenta.numeroArestas === ARESTA_OPTIONS[ARESTA_OPTIONS.length - 1]}
                aria-label="Aumentar número de arestas"
                className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 text-white font-bold hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <NumberInputRow
          label="Altura Fixação (mm)"
          value={ferramenta.balanco}
          min={5}
          max={300}
          step={1}
          unit="mm"
          onChange={(v) => setFerramenta({ balanco: v })}
        />

        <CollapsibleSection
          title="⚙ Ajuste avançado"
          summary={summaryAvancado}
          defaultOpen={advancedDefaultOpen}
          onToggle={persistAdvancedOpen}
        >
          <div className="flex flex-col gap-3 pt-1">
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

            <div>
              <FineTunePanel embedded />
            </div>

            <div className="space-y-2 pt-1 border-t border-white/5">
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setSafetyFactor(Math.round(Math.max(0.50, safetyFactor - 0.05) * 100) / 100)}
                  className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-lg bg-black/30 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold`}
                  aria-label="Reduzir fator de correção"
                >−</button>
                <div className="flex-1">
                  <StyledSlider
                    value={safetyFactor}
                    min={0.50}
                    max={1.00}
                    step={0.05}
                    color="primary"
                    label="Fator de Correção"
                    onChange={(v) => setSafetyFactor(v)}
                  />
                </div>
                <button
                  onClick={() => setSafetyFactor(Math.round(Math.min(1.00, safetyFactor + 0.05) * 100) / 100)}
                  className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-lg bg-black/30 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold`}
                  aria-label="Aumentar fator de correção"
                >+</button>
                <span className="text-base font-mono text-primary w-12 text-right shrink-0">
                  {Math.round(safetyFactor * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 px-8">
                <span>← Conservador</span>
                <span>Agressivo →</span>
              </div>
              <p className="text-xs text-gray-500 px-1">
                Segurança — aplicado à Potência e Torque. 80% recomendado para operação segura.
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Sticky Simular + Reset footer */}
      <div className="sticky bottom-0 z-10 bg-background-dark/90 backdrop-blur-md pt-2">
        <div className="flex gap-3">
          <button
            onClick={handleSimulate}
            className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base uppercase"
          >
            <span className="flex items-center gap-2">
              {isUpdated ? (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  Atualizado
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                  Simular
                </>
              )}
            </span>
          </button>
          <button onClick={reset}
            className="w-12 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center active:scale-[0.98]">
            <span className="material-symbols-outlined text-xl">restart_alt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
