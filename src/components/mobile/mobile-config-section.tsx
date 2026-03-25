import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import { SectionTitle, FieldGroup, NumInput } from '../ui-helpers';

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

const ARESTAS_OPTIONS = [2, 3, 4, 6] as const;

const MOBILE_BTN_ACTIVE = 'bg-primary text-black font-bold border-primary shadow-neon-cyan';
const MOBILE_BTN_IDLE = 'bg-black/40 text-gray-400 active:bg-white/10 border-white/10';

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
    <div className="bg-card-dark/70 backdrop-blur-sm rounded-xl border border-white/5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 gap-3 text-left"
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

export function MobileConfigSection() {
  const {
    materialId, ferramenta, tipoOperacao, parametros, safetyFactor,
    setMaterial, setFerramenta, setTipoOperacao, setParametros,
    setSafetyFactor,
    savedTools, loadSavedTool, addSavedTool,
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

  const material = MATERIAIS.find((m) => m.id === materialId);
  const vcRange = material?.vcRanges[tipoOperacao];

  // Summary strings for collapsed headers
  const summaryBase = `${material?.nome ?? '—'} | ${OPERACAO_LABELS[tipoOperacao]}`;
  const summaryTool = `${FERRAMENTAS_PADRAO.find((f) => f.tipo === ferramenta.tipo)?.descricao.split(' ')[0] ?? ferramenta.tipo} D${ferramenta.diametro} ${ferramenta.numeroArestas}Z`;
  const summaryParams = `ap ${parametros.ap} | ae ${parametros.ae} | fz ${parametros.fz}`;
  const summarySafety = `SF ${safetyFactor.toFixed(2)}`;

  return (
    <section className="flex flex-col gap-3 px-4">
      {/* Material + Operation */}
      <AccordionSection color="bg-primary" label="Configuração Base" summary={summaryBase} defaultOpen>
        <div className="space-y-4 mt-1">
          <FieldGroup label="Material da Peça">
            <select value={materialId} onChange={(e) => setMaterial(Number(e.target.value))}
              className="w-full min-h-[48px] bg-black/40 border border-white/10 rounded-lg py-3 pl-3 pr-10 text-sm text-gray-200 focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron">
              {MATERIAIS.map((m) => (
                <option key={m.id} value={m.id}>{m.nome}{m.status === 'estimado' ? ' ⚠' : ''}</option>
              ))}
            </select>
            {material && (
              <div className="flex justify-between mt-1 px-1">
                <span className="text-[10px] text-gray-600">{material.dureza}</span>
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
                  <input type="radio" name="mobile_tipo_usinagem" className="peer sr-only" checked={tipoOperacao === t} onChange={() => setTipoOperacao(t)} />
                  <div className="min-h-[44px] flex items-center justify-center rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-center text-xs font-medium">
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
          {/* Saved Tools — same as desktop */}
          <div className="mb-1">
            <div className="flex items-center gap-2">
              <select
                aria-label="Ferramenta Salva"
                value=""
                onChange={(e) => { if (e.target.value) loadSavedTool(e.target.value); }}
                disabled={savedTools.length === 0}
                className="flex-1 min-h-[44px] bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary cursor-pointer appearance-none select-chevron disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg bg-white/5 border border-white/10 active:bg-white/10 transition-colors flex items-center justify-center"
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

          <FieldGroup label="Tipo">
            <div className="grid grid-cols-3 gap-2">
              {FERRAMENTAS_PADRAO.map((f) => (
                <button key={f.tipo} onClick={() => setFerramenta({ tipo: f.tipo, numeroArestas: f.zPadrao })}
                  className={`min-h-[44px] py-2 rounded-lg border text-xs transition-colors ${ferramenta.tipo === f.tipo ? MOBILE_BTN_ACTIVE : MOBILE_BTN_IDLE}`}>
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
                <button key={z} onClick={() => setFerramenta({ numeroArestas: z })}
                  className={`min-h-[44px] py-2 rounded-lg border text-xs font-mono transition-colors ${ferramenta.numeroArestas === z ? MOBILE_BTN_ACTIVE : MOBILE_BTN_IDLE}`}>
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

      {/* Safety factor */}
      <AccordionSection color="bg-seg-verde" label="Fator de Segurança" summary={summarySafety}>
        <div className="flex items-center gap-4 mt-1">
          <input type="range" min={0.5} max={1} step={0.05} value={safetyFactor}
            onChange={(e) => setSafetyFactor(Number(e.target.value))}
            className="flex-1 h-2 bg-black/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-seg-verde [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(46,204,113,0.6)]" />
          <span className="text-sm font-mono text-white w-10 text-right">{safetyFactor.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-gray-600 mt-2">0.70 = conservador · 0.85 = agressivo</p>
      </AccordionSection>
    </section>
  );
}
