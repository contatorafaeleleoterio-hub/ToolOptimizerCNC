import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import type { SavedTool } from '@/types';
import { SectionTitle, FieldGroup, NumInput } from '../ui-helpers';
import { ToolEditModal } from '@/components/modals/tool-edit-modal';
import { StyledSlider } from '@/components/styled-slider';
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
          invalid && focused ? 'border-red-500 text-red-400' : 'border-white/12'
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

const ARESTAS_OPTIONS = [2, 3, 4, 6] as const;

const MOBILE_BTN_ACTIVE = 'bg-primary text-black font-bold border-primary shadow-neon-cyan';
const MOBILE_BTN_IDLE = 'bg-black/40 text-gray-400 active:bg-white/10 border-white/12';

/** Collapsible accordion section with a summary line when closed */
function AccordionSection({
  color,
  label,
  summary,
  defaultOpen = false,
  children,
}: {
  color: string;
  label: string;
  summary: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-[rgba(30,38,50,0.95)] backdrop-blur-sm rounded-xl border border-white/12">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          haptics.impactLight();
        }}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 gap-3 text-left min-h-[56px]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <SectionTitle color={color} label={label} />
          {!open && (
            <span className="text-[10px] text-gray-500 font-mono truncate ml-1">{summary}</span>
          )}
        </div>
        <span
          className="material-symbols-outlined text-gray-500 shrink-0 transition-transform duration-300"
          style={{ fontSize: '18px', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 animate-[fadeInUp_0.2s_ease-out]">
          {children}
        </div>
      )}
    </div>
  );
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
                        : 'bg-black/20 border-white/8'
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
    materialId, ferramenta, tipoOperacao, parametros, safetyFactor,
    setMaterial, setFerramenta, setTipoOperacao, setParametros,
    setSafetyFactor,
    savedTools, loadSavedTool, addSavedTool, removeSavedTool, updateSavedTool,
  } = useMachiningStore();

  const [showSavedBadge, setShowSavedBadge] = useState(false);
  const [editingTool, setEditingTool] = useState<SavedTool | null>(null);

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

  // Summary strings for collapsed headers
  const summaryBase = `${material?.nome ?? '—'} | ${OPERACAO_LABELS[tipoOperacao]}`;
  const summaryTool = `${FERRAMENTAS_PADRAO.find((f) => f.tipo === ferramenta.tipo)?.descricao.split(' ')[0] ?? ferramenta.tipo} D${ferramenta.diametro} ${ferramenta.numeroArestas}Z`;
  const summaryParams = `ap ${parametros.ap} | ae ${parametros.ae} | fz ${parametros.fz}`;
  const summarySafety = `${Math.round(safetyFactor * 100)}%`;

  return (
    <section className="flex flex-col gap-3 px-4">
      {/* Material + Operation */}
      <AccordionSection color="bg-primary" label="Configuração Base" summary={summaryBase} defaultOpen>
        <div className="space-y-4 mt-1">
          <FieldGroup label="Material da Peça">
            <select value={materialId} 
              onChange={(e) => {
                setMaterial(Number(e.target.value));
                haptics.impactMedium();
              }}
              className="w-full min-h-[48px] bg-black/40 border border-white/12 rounded-lg py-3 pl-3 pr-10 text-sm text-gray-200 focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron">
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
      </AccordionSection>

      {/* Tool section */}
      <AccordionSection color="bg-secondary" label="Ferramenta" summary={summaryTool}>
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
              className="mt-2 w-full flex items-center justify-center gap-1.5 min-h-[48px] rounded-lg bg-white/5 border border-white/12 active:bg-white/10 transition-colors text-xs text-gray-400"
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

          <MobileNumberInput
            label="Diâmetro (mm)"
            value={ferramenta.diametro}
            min={0.1} max={200} step={0.1} unit="mm"
            onChange={(v) => setFerramenta({ diametro: v })}
          />

          {ferramenta.tipo === 'toroidal' && (
            <MobileNumberInput
              label="Raio da Ponta (mm)"
              value={ferramenta.raioQuina ?? 1.0}
              min={0.05} max={50} step={0.05} unit="mm"
              onChange={(v) => setFerramenta({ raioQuina: v })}
            />
          )}

          <FieldGroup label="Arestas (Z)">
            <div className="grid grid-cols-4 gap-2">
              {ARESTAS_OPTIONS.map((z) => (
                <button key={z} 
                  onClick={() => {
                    setFerramenta({ numeroArestas: z });
                    haptics.impactLight();
                  }}
                  className={`min-h-[48px] py-2 rounded-lg border text-xs font-mono transition-colors ${ferramenta.numeroArestas === z ? MOBILE_BTN_ACTIVE : MOBILE_BTN_IDLE}`}>
                  {z}Z
                </button>
              ))}
            </div>
          </FieldGroup>

          <MobileNumberInput
            label="Altura de Fixação (mm)"
            value={ferramenta.balanco}
            min={5} max={300} step={1} unit="mm"
            onChange={(v) => setFerramenta({ balanco: v })}
          />
        </div>
      </AccordionSection>

      {/* Cutting parameters */}
      <AccordionSection color="bg-accent-orange" label="Parâmetros de Corte" summary={summaryParams}>
        <div className="grid grid-cols-2 gap-3 mt-1">
          <NumInput label="ap (mm)" value={parametros.ap} onChange={(v) => setParametros({ ap: v })} min={0.1} max={50} step={0.1} />
          <NumInput label="ae (mm)" value={parametros.ae} onChange={(v) => setParametros({ ae: v })} min={0.1} max={50} step={0.1} />
          <NumInput label="fz (mm)" value={parametros.fz} onChange={(v) => setParametros({ fz: v })} min={0.01} max={1} step={0.01} />
          <NumInput label="Vc (m/min)" value={parametros.vc} onChange={(v) => setParametros({ vc: v })} min={1} max={1200} step={1} />
        </div>
      </AccordionSection>

      {/* Fator de Correção */}
      <AccordionSection color="bg-seg-verde" label="Fator de Correção" summary={summarySafety}>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => {
              setSafetyFactor(Math.round(Math.max(0.50, safetyFactor - 0.05) * 100) / 100);
              haptics.impactLight();
            }}
            className="w-12 h-12 flex items-center justify-center rounded-md bg-black/40 border border-white/10 text-gray-400 text-base font-bold shrink-0"
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
            className="w-12 h-12 flex items-center justify-center rounded-md bg-black/40 border border-white/10 text-gray-400 text-base font-bold shrink-0"
            aria-label="Aumentar fator de correção"
          >+</button>
          <span className="text-sm font-mono text-white w-12 text-right shrink-0">
            {Math.round(safetyFactor * 100)}%
          </span>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">50% = conservador · 100% = agressivo</p>
      </AccordionSection>
    </section>
  );
}
