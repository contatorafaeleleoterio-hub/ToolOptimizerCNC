import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import type { SavedTool } from '@/types';
import { SectionTitle, FieldGroup } from '../ui-helpers';
import { ToolEditModal } from '@/components/modals/tool-edit-modal';
import { StyledSlider } from '@/components/styled-slider';
import { CollapsibleSection } from '@/components/collapsible-section';
import { BUTTON_PM_TOUCH } from '@/components/design-tokens';
import { haptics } from '@/utils/haptics';

/**
 * Mobile-friendly number input with raw/blur pattern.
 * Allows user to freely erase and retype values; validates on blur.
 */
function MobileNumberInput({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string;
  onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState(String(value));
  const [focused, setFocused] = useState(false);

  const parsed = Number(raw);
  const invalid = raw.trim() === '' || isNaN(parsed) || parsed < min || parsed > max;
  const displayValue = focused ? raw : String(value);

  return (
    <FieldGroup label={label}>
      <input
        type="number"
        inputMode="decimal"
        min={min} max={max} step={step}
        value={displayValue}
        onChange={(e) => {
          setRaw(e.target.value);
          const n = Number(e.target.value);
          if (!isNaN(n) && n >= min && n <= max) onChange(n);
        }}
        onFocus={() => { setFocused(true); setRaw(String(value)); }}
        onBlur={() => { setFocused(false); if (invalid) setRaw(String(value)); }}
        aria-label={label}
        className={`w-full min-h-[48px] bg-black/40 border rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none ${
          invalid && focused ? 'border-red-500 text-red-400' : 'border-white/10'
        }`}
      />
      {invalid && focused && (
        <span className="text-xs text-red-400 mt-1 block px-1">Válido: {min}–{max} {unit}</span>
      )}
    </FieldGroup>
  );
}

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
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

const MOBILE_BTN_ACTIVE = 'bg-primary text-black font-bold border-primary shadow-neon-cyan';
const MOBILE_BTN_IDLE = 'bg-black/40 text-gray-400 active:bg-white/10 border-white/10';

const ADVANCED_OPEN_KEY = 'tooloptimizer-cnc-mobile-config-advanced-open';

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

const MOBILE_DIAMETER_CATEGORIES = [
  { label: '≤ 6mm', min: 0, max: 6 },
  { label: '6 – 12mm', min: 6, max: 12 },
  { label: '12 – 20mm', min: 12, max: 20 },
  { label: '> 20mm', min: 20, max: Infinity },
] as const;

const MOBILE_TIPO_LABEL: Record<SavedTool['tipo'], string> = {
  topo: 'Fresa de topo',
  toroidal: 'Fresa toroidal',
  esferica: 'Fresa esférica',
};

interface MobileSavedToolsListProps {
  savedTools: SavedTool[];
  activeDiametro: number;
  onLoad: (id: string) => void;
  onEdit: (tool: SavedTool) => void;
  onRemove: (id: string) => void;
}

function MobileSavedToolsList({ savedTools, activeDiametro, onLoad, onEdit, onRemove }: MobileSavedToolsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {MOBILE_DIAMETER_CATEGORIES.map((cat) => {
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
                    className={`flex items-center justify-between px-2 py-2 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-black/20 border-white/10'
                    }`}
                  >
                    <button
                      className="flex-1 flex items-center gap-1.5 text-left min-h-[48px] min-w-0"
                      onClick={() => {
                        onLoad(tool.id);
                        haptics.impactMedium();
                      }}
                      aria-label={`Carregar ${tool.nome}`}
                    >
                      <span className={`font-mono text-xs truncate ${isActive ? 'text-primary' : 'text-gray-300'}`}>
                        Ø{tool.diametro}mm
                      </span>
                      <span className="text-gray-600 text-xs">|</span>
                      <span className="text-gray-500 text-xs">H {tool.balanco}</span>
                      <span className="text-gray-600 text-xs">|</span>
                      <span className="text-gray-500 text-xs truncate">{MOBILE_TIPO_LABEL[tool.tipo]}</span>
                    </button>
                    <div className="flex items-center gap-1 ml-1">
                      <button
                        aria-label={`Editar ${tool.nome}`}
                        onClick={() => {
                          onEdit(tool);
                          haptics.impactLight();
                        }}
                        className="p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-500 active:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                      </button>
                      <button
                        aria-label={`Remover ${tool.nome}`}
                        onClick={() => {
                          onRemove(tool.id);
                          haptics.notification();
                        }}
                        className="p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-500 active:text-red-400 transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
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

export function MobileConfigSection() {
  const {
    materialId, ferramenta, tipoOperacao, safetyFactor,
    setMaterial, setFerramenta, setTipoOperacao,
    setSafetyFactor,
    savedTools, loadSavedTool, addSavedTool, removeSavedTool, updateSavedTool,
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
    haptics.notification();
    setShowSavedBadge(true);
    setTimeout(() => setShowSavedBadge(false), 2000);
  };

  const material = MATERIAIS.find((m) => m.id === materialId);
  const vcRange = material?.vcRanges[tipoOperacao];

  const summaryAdvanced = `SF ${Math.round(safetyFactor * 100)}%`;

  return (
    <section className="flex flex-col gap-3 px-4">
      {/* Material + Operation — always visible (5 essential inputs, no accordion) */}
      <div className="bg-[rgba(30,38,50,0.95)] backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <SectionTitle color="bg-primary" label="Configuração Base" />
        <div className="space-y-4 mt-1">
          <FieldGroup label="Material da Peça">
            <select value={materialId}
              onChange={(e) => {
                setMaterial(Number(e.target.value));
                haptics.impactMedium();
              }}
              className="w-full min-h-[48px] bg-black/40 border border-white/10 rounded-lg py-3 pl-3 pr-10 text-sm text-gray-200 focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron">
              {MATERIAIS.map((m) => (
                <option key={m.id} value={m.id}>{m.nome}{m.status === 'estimado' ? ' ⚠' : ''}</option>
              ))}
            </select>
            {material && (
              <div className="flex justify-between mt-1 px-1">
                <span className="text-[10px] text-gray-500">{material.dureza}</span>
                {vcRange && <span className="text-[10px] text-primary/70">Vc: {vcRange[0]}-{vcRange[1]} m/min</span>}
              </div>
            )}
            {material?.status === 'estimado' && (
              <span className="text-[10px] text-seg-amarelo mt-1 block">Dados estimados</span>
            )}
          </FieldGroup>
          <FieldGroup label="Tipo de Usinagem">
            <div className="grid grid-cols-3 gap-2">
              {Object.values(TipoUsinagem).map((t) => (
                <label key={t} className="cursor-pointer group">
                  <input type="radio" name="mobile_tipo_usinagem" className="peer sr-only" checked={tipoOperacao === t}
                    onChange={() => {
                      setTipoOperacao(t);
                      haptics.impactMedium();
                    }} />
                  <div className="min-h-[48px] flex items-center justify-center rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-center text-xs font-medium">
                    {OPERACAO_LABELS[t]}
                  </div>
                </label>
              ))}
            </div>
          </FieldGroup>
        </div>
      </div>

      {/* Tool section — always visible (5 essential inputs, no accordion) */}
      <div className="bg-[rgba(30,38,50,0.95)] backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <SectionTitle color="bg-secondary" label="Ferramenta" />
        <div className="space-y-4 mt-1">
          {/* Saved Tools — cards list with edit/delete per item */}
          <div className="mb-1">
            {savedTools.length > 0 ? (
              <MobileSavedToolsList
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
              className="mt-2 w-full flex items-center justify-center gap-1.5 min-h-[48px] rounded-lg bg-white/5 border border-white/10 active:bg-white/10 transition-colors text-xs text-gray-400"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              Salvar ferramenta atual
            </button>
            {showSavedBadge && (
              <span className="text-xs font-semibold mt-1 block animate-[fadeInUp_0.3s_ease]" style={{ color: '#2ecc71' }}>
                ✓ Ferramenta salva
              </span>
            )}
            <div className="border-b border-white/5 mt-3" />
          </div>

          {editingTool && (
            <ToolEditModal
              tool={editingTool}
              onSave={(updates) => { updateSavedTool(editingTool.id, updates); setEditingTool(null); }}
              onClose={() => setEditingTool(null)}
            />
          )}

          <FieldGroup label="Tipo">
            <div className="grid grid-cols-3 gap-2">
              {FERRAMENTAS_PADRAO.map((f) => (
                <button key={f.tipo}
                  onClick={() => {
                    setFerramenta({ tipo: f.tipo, numeroArestas: f.zPadrao });
                    haptics.impactLight();
                  }}
                  className={`min-h-[48px] py-2 rounded-lg border text-xs transition-colors ${ferramenta.tipo === f.tipo ? MOBILE_BTN_ACTIVE : MOBILE_BTN_IDLE}`}>
                  {f.descricao.split(' ')[0]}
                </button>
              ))}
            </div>
          </FieldGroup>

          <div className="grid grid-cols-[1fr_auto] gap-3">
            <MobileNumberInput
              label="Diâmetro (mm)"
              value={ferramenta.diametro}
              min={0.1} max={200} step={0.1} unit="mm"
              onChange={(v) => setFerramenta({ diametro: v })}
            />
            <FieldGroup label="Arestas (Z)">
              <div className="flex items-center justify-center gap-1.5 min-h-[48px]">
                <button
                  onClick={() => {
                    setFerramenta({ numeroArestas: stepArestas(ferramenta.numeroArestas, -1) });
                    haptics.impactLight();
                  }}
                  disabled={ferramenta.numeroArestas === ARESTA_OPTIONS[0]}
                  aria-label="Diminuir número de arestas"
                  className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 text-white font-bold active:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
                >−</button>
                <span className="w-8 text-center font-mono text-sm font-bold text-white" aria-label="Número de arestas atual">
                  {ferramenta.numeroArestas}
                </span>
                <button
                  onClick={() => {
                    setFerramenta({ numeroArestas: stepArestas(ferramenta.numeroArestas, 1) });
                    haptics.impactLight();
                  }}
                  disabled={ferramenta.numeroArestas === ARESTA_OPTIONS[ARESTA_OPTIONS.length - 1]}
                  aria-label="Aumentar número de arestas"
                  className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 text-white font-bold active:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
                >+</button>
              </div>
            </FieldGroup>
          </div>

          <MobileNumberInput
            label="Altura de Fixação (mm)"
            value={ferramenta.balanco}
            min={5} max={300} step={1} unit="mm"
            onChange={(v) => setFerramenta({ balanco: v })}
          />
        </div>
      </div>

      {/* Ajuste avançado — Raio da Ponta (toroidal) + Fator de Correção */}
      <CollapsibleSection
        title="⚙ Ajuste avançado"
        summary={summaryAdvanced}
        defaultOpen={advancedDefaultOpen}
        onToggle={(open) => {
          persistAdvancedOpen(open);
          haptics.impactLight();
        }}
      >
        <div className="flex flex-col gap-3 pt-1">
          {ferramenta.tipo === 'toroidal' && (
            <MobileNumberInput
              label="Raio da Ponta (mm)"
              value={ferramenta.raioQuina ?? 1.0}
              min={0.05} max={50} step={0.05} unit="mm"
              onChange={(v) => setFerramenta({ raioQuina: v })}
            />
          )}

          <div className="space-y-2 pt-1 border-t border-white/5">
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setSafetyFactor(Math.round(Math.max(0.50, safetyFactor - 0.05) * 100) / 100);
                  haptics.impactLight();
                }}
                className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-md bg-black/40 border border-white/10 text-gray-400 text-base font-bold`}
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
                  onChange={(v) => {
                    setSafetyFactor(v);
                    haptics.impactLight();
                  }}
                />
              </div>
              <button
                onClick={() => {
                  setSafetyFactor(Math.round(Math.min(1.00, safetyFactor + 0.05) * 100) / 100);
                  haptics.impactLight();
                }}
                className={`${BUTTON_PM_TOUCH} shrink-0 flex items-center justify-center rounded-md bg-black/40 border border-white/10 text-gray-400 text-base font-bold`}
                aria-label="Aumentar fator de correção"
              >+</button>
              <span className="text-sm font-mono text-white w-12 text-right shrink-0">
                {Math.round(safetyFactor * 100)}%
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">50% = conservador · 100% = agressivo</p>
          </div>
        </div>
      </CollapsibleSection>
    </section>
  );
}
