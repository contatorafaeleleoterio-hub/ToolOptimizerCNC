import { useState } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO, RAIOS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import { SectionTitle, FieldGroup, NumInput } from '../ui-helpers';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

const ARESTAS_OPTIONS = [2, 3, 4, 5, 6] as const;

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
  } = useMachiningStore();

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

          <FieldGroup label="Diâmetro (mm)">
            <input
              type="number"
              min={0.1}
              max={200}
              step={0.1}
              inputMode="decimal"
              value={ferramenta.diametro}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (!isNaN(n) && n >= 0.1 && n <= 200) setFerramenta({ diametro: n });
              }}
              className="w-full min-h-[48px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none"
            />
          </FieldGroup>

          {ferramenta.tipo === 'toroidal' && (
            <FieldGroup label="Raio da Ponta">
              <div className="grid grid-cols-2 gap-2">
                {RAIOS_PADRAO.map((raio) => (
                  <button key={raio} onClick={() => setFerramenta({ raioQuina: raio })}
                    className={`min-h-[44px] py-2.5 rounded-lg border text-xs font-mono transition-colors ${(ferramenta.raioQuina ?? 1.0) === raio ? MOBILE_BTN_ACTIVE : MOBILE_BTN_IDLE}`}>
                    R{raio}
                  </button>
                ))}
              </div>
            </FieldGroup>
          )}

          <FieldGroup label="Arestas (Z)">
            <div className="grid grid-cols-5 gap-1.5">
              {ARESTAS_OPTIONS.map((z) => (
                <button key={z} onClick={() => setFerramenta({ numeroArestas: z })}
                  className={`min-h-[44px] py-2 rounded-lg border text-xs font-mono transition-colors ${ferramenta.numeroArestas === z ? MOBILE_BTN_ACTIVE : MOBILE_BTN_IDLE}`}>
                  {z}Z
                </button>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup label="Altura de Fixação (mm)">
            <div className="flex gap-2">
              <input type="number" inputMode="decimal" value={ferramenta.balanco}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!isNaN(n) && n >= 5 && n <= 300) setFerramenta({ balanco: n });
                }} min={5} max={300}
                className="flex-1 min-h-[48px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none" />
              <button onClick={() => setFerramenta({ balanco: Math.min(300, ferramenta.balanco + 5) })}
                className="w-12 min-h-[48px] rounded-lg bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 transition-all text-lg font-bold" aria-label="Aumentar fixação">&#9650;</button>
              <button onClick={() => setFerramenta({ balanco: Math.max(5, ferramenta.balanco - 5) })}
                className="w-12 min-h-[48px] rounded-lg bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 transition-all text-lg font-bold" aria-label="Diminuir fixação">&#9660;</button>
            </div>
          </FieldGroup>
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
