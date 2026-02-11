import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO, DIAMETROS_COMPLETOS, RAIOS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import { SectionTitle, FieldGroup, NumInput } from '../ui-helpers';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

const ARESTAS_OPTIONS = [2, 4] as const;

const MOBILE_BTN_ACTIVE = 'bg-primary text-black font-bold border-primary shadow-neon-cyan';
const MOBILE_BTN_IDLE = 'bg-black/40 text-gray-400 active:bg-white/10 border-white/10';

export function MobileConfigSection() {
  const {
    materialId, ferramenta, tipoOperacao, parametros, safetyFactor,
    setMaterial, setFerramenta, setTipoOperacao, setParametros,
    setSafetyFactor, calcular, reset,
  } = useMachiningStore();

  const material = MATERIAIS.find((m) => m.id === materialId);
  const vcRange = material?.vcRanges[tipoOperacao];

  return (
    <section className="flex flex-col gap-4 px-4">
      {/* Simulate + Reset */}
      <div className="flex gap-3">
        <button onClick={calcular}
          className="flex-1 min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan active:scale-[0.97] transition-all flex items-center justify-center gap-2 text-sm uppercase">
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          Simular
        </button>
        <button onClick={reset}
          className="w-14 min-h-[48px] rounded-xl bg-white/5 border border-white/10 text-gray-400 active:bg-white/10 transition-all flex items-center justify-center">
          <span className="material-symbols-outlined text-xl">restart_alt</span>
        </button>
      </div>

      {/* Material + Operation */}
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <SectionTitle color="bg-primary" label="Configuração Base" />
        <div className="space-y-4">
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
      </div>

      {/* Tool section */}
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <SectionTitle color="bg-secondary" label="Ferramenta" />
        <div className="space-y-4">
          {/* Tool type */}
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

          {/* Diameter */}
          <FieldGroup label="Diâmetro (mm)">
            <select value={ferramenta.diametro} onChange={(e) => setFerramenta({ diametro: Number(e.target.value) })}
              className="w-full min-h-[48px] bg-black/40 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron">
              {DIAMETROS_COMPLETOS.map((d) => (
                <option key={d} value={d}>{d}mm</option>
              ))}
            </select>
          </FieldGroup>

          {/* Corner radius (toroidal only) */}
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

          {/* Flute count */}
          <FieldGroup label="Arestas (Z)">
            <div className="grid grid-cols-2 gap-2">
              {ARESTAS_OPTIONS.map((z) => (
                <button key={z} onClick={() => setFerramenta({ numeroArestas: z })}
                  className={`min-h-[44px] py-2.5 rounded-lg border text-xs font-mono transition-colors ${ferramenta.numeroArestas === z ? MOBILE_BTN_ACTIVE : MOBILE_BTN_IDLE}`}>
                  {z} Arestas
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Height */}
          <FieldGroup label="Altura de Fixação (mm)">
            <div className="flex gap-2">
              <input type="number" value={ferramenta.balanco}
                onChange={(e) => setFerramenta({ balanco: Number(e.target.value) })} min={15} max={150}
                className="flex-1 min-h-[48px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none" />
              <button onClick={() => setFerramenta({ balanco: Math.min(150, ferramenta.balanco + 5) })}
                className="w-12 min-h-[48px] rounded-lg bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 transition-all text-lg font-bold" aria-label="Increase height">&#9650;</button>
              <button onClick={() => setFerramenta({ balanco: Math.max(15, ferramenta.balanco - 5) })}
                className="w-12 min-h-[48px] rounded-lg bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 transition-all text-lg font-bold" aria-label="Decrease height">&#9660;</button>
            </div>
          </FieldGroup>
        </div>
      </div>

      {/* Cutting parameters */}
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <SectionTitle color="bg-accent-orange" label="Parâmetros de Corte" />
        <div className="grid grid-cols-2 gap-3">
          <NumInput label="ap (mm)" value={parametros.ap} onChange={(v) => setParametros({ ap: v })} min={0.1} max={50} step={0.1} />
          <NumInput label="ae (mm)" value={parametros.ae} onChange={(v) => setParametros({ ae: v })} min={0.1} max={50} step={0.1} />
          <NumInput label="fz (mm)" value={parametros.fz} onChange={(v) => setParametros({ fz: v })} min={0.01} max={1} step={0.01} />
          <NumInput label="Vc (m/min)" value={parametros.vc} onChange={(v) => setParametros({ vc: v })} min={1} max={1200} step={1} />
        </div>
      </div>

      {/* Safety factor */}
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <SectionTitle color="bg-seg-verde" label="Fator de Segurança" />
        <div className="flex items-center gap-4">
          <input type="range" min={0.5} max={1} step={0.05} value={safetyFactor}
            onChange={(e) => setSafetyFactor(Number(e.target.value))}
            className="flex-1 h-2 bg-black/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-seg-verde [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(46,204,113,0.6)]" />
          <span className="text-sm font-mono text-white w-10 text-right">{safetyFactor.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
