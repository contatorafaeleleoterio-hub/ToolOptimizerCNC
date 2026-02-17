import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO, DIAMETROS_COMPLETOS, RAIOS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import { SectionTitle, FieldGroup, NumInput } from './ui-helpers';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

const ARESTAS_OPTIONS = [2, 4] as const;

export function ConfigPanel() {
  const {
    materialId, ferramenta, tipoOperacao, parametros, safetyFactor,
    setMaterial, setFerramenta, setTipoOperacao, setParametros,
    setSafetyFactor, simular, reset,
  } = useMachiningStore();

  const material = MATERIAIS.find((m) => m.id === materialId);
  const vcRange = material?.vcRanges[tipoOperacao];

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass flex flex-col gap-3">
        <div className="flex gap-3">
          <button onClick={simular}
            className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase">
            <span className="material-symbols-outlined text-lg">play_arrow</span>
            Simular
          </button>
          <button onClick={reset}
            className="w-12 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center active:scale-[0.98]">
            <span className="material-symbols-outlined text-xl">restart_alt</span>
          </button>
        </div>

        {/* Material + operation */}
        <div className="bg-card-dark rounded-xl p-3 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-primary" label="Configuração Base" />
          <div className="space-y-3">
            <FieldGroup label="Material da Peça">
              <select value={materialId} onChange={(e) => setMaterial(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-3 pr-10 text-sm text-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none transition-all hover:border-white/20 select-chevron">
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
                    <input type="radio" name="tipo_usinagem" className="peer sr-only" checked={tipoOperacao === t} onChange={() => setTipoOperacao(t)} />
                    <div className="py-2 px-1 rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-center text-[11px] font-medium hover:bg-white/5">
                      {OPERACAO_LABELS[t]}
                    </div>
                  </label>
                ))}
              </div>
            </FieldGroup>
          </div>
        </div>

        {/* Tool section — Flow: Tipo → Diâmetro → Raio (toroidal) → Arestas → Altura */}
        <div className="bg-card-dark rounded-xl p-3 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-secondary" label="Ferramenta" />
          <div className="space-y-3">
            {/* 1. Tool type */}
            <FieldGroup label="Tipo">
              <div className="grid grid-cols-3 gap-2">
                {FERRAMENTAS_PADRAO.map((f) => (
                  <button key={f.tipo} onClick={() => setFerramenta({ tipo: f.tipo, numeroArestas: f.zPadrao })}
                    className={`py-2 rounded border text-xs transition-colors ${ferramenta.tipo === f.tipo
                      ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                      : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                    {f.descricao.split(' ')[0]}
                  </button>
                ))}
              </div>
            </FieldGroup>

            {/* 2. Diameter (dropdown with chevron) */}
            <FieldGroup label="Diâmetro (mm)">
              <select value={ferramenta.diametro} onChange={(e) => setFerramenta({ diametro: Number(e.target.value) })}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none appearance-none hover:border-white/20 select-chevron">
                {DIAMETROS_COMPLETOS.map((d) => (
                  <option key={d} value={d}>{d}mm</option>
                ))}
              </select>
            </FieldGroup>

            {/* 3. Corner radius — only for toroidal, 2 options: R0.5 and R1 */}
            {ferramenta.tipo === 'toroidal' && (
              <FieldGroup label="Raio da Ponta">
                <div className="grid grid-cols-2 gap-2">
                  {RAIOS_PADRAO.map((raio) => (
                    <button key={raio} onClick={() => setFerramenta({ raioQuina: raio })}
                      className={`py-2 rounded-lg border text-xs font-mono transition-colors ${(ferramenta.raioQuina ?? 1.0) === raio
                        ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                      R{raio}
                    </button>
                  ))}
                </div>
              </FieldGroup>
            )}

            {/* 4. Flute count — 2 button options */}
            <FieldGroup label="Arestas (Z)">
              <div className="grid grid-cols-2 gap-2">
                {ARESTAS_OPTIONS.map((z) => (
                  <button key={z} onClick={() => setFerramenta({ numeroArestas: z })}
                    className={`py-2 rounded-lg border text-xs font-mono transition-colors ${ferramenta.numeroArestas === z
                      ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                      : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                    {z} Arestas
                  </button>
                ))}
              </div>
            </FieldGroup>

            {/* 5. Tool stickout height — min 15, max 150, step 5 */}
            <FieldGroup label="Altura de Fixação (mm)">
              <div className="flex gap-2">
                <input type="number" value={ferramenta.balanco}
                  onChange={(e) => setFerramenta({ balanco: Number(e.target.value) })} min={15} max={150}
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none" />
                <button onClick={() => setFerramenta({ balanco: Math.min(150, ferramenta.balanco + 5) })}
                  className="w-9 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-lg font-bold" aria-label="Increase height">▲</button>
                <button onClick={() => setFerramenta({ balanco: Math.max(15, ferramenta.balanco - 5) })}
                  className="w-9 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-lg font-bold" aria-label="Decrease height">&#9660;</button>
              </div>
            </FieldGroup>
          </div>
        </div>

        {/* Cutting parameters */}
        <div className="bg-card-dark rounded-xl p-3 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-accent-orange" label="Parâmetros de Corte" />
          <div className="grid grid-cols-2 gap-3">
            <NumInput label="ap (mm)" value={parametros.ap} onChange={(v) => setParametros({ ap: v })} min={0.1} max={50} step={0.1} />
            <NumInput label="ae (mm)" value={parametros.ae} onChange={(v) => setParametros({ ae: v })} min={0.1} max={50} step={0.1} />
            <NumInput label="fz (mm)" value={parametros.fz} onChange={(v) => setParametros({ fz: v })} min={0.01} max={1} step={0.01} />
            <NumInput label="Vc (m/min)" value={parametros.vc} onChange={(v) => setParametros({ vc: v })} min={1} max={1200} step={1} />
          </div>
        </div>

        {/* Safety factor slider */}
        <div className="bg-card-dark rounded-xl p-3 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-seg-verde" label="Fator de Segurança" />
          <div className="flex items-center gap-4">
            <input type="range" min={0.5} max={1} step={0.05} value={safetyFactor}
              onChange={(e) => setSafetyFactor(Number(e.target.value))}
              className="flex-1 h-1.5 bg-black/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-seg-verde [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(46,204,113,0.6)]" />
            <span className="text-sm font-mono text-white w-10 text-right">{safetyFactor.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
