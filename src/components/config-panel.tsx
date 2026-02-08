import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO, DIAMETROS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
import { SectionTitle, FieldGroup, NumInput } from './ui-helpers';

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

export function ConfigPanel() {
  const {
    materialId, ferramenta, tipoOperacao, parametros, limitesMaquina, safetyFactor,
    setMaterial, setFerramenta, setTipoOperacao, setParametros,
    setLimitesMaquina, setSafetyFactor, calcular, reset,
  } = useMachiningStore();

  const material = MATERIAIS.find((m) => m.id === materialId);
  const vcRange = material?.vcRanges[tipoOperacao];

  return (
    <div className="flex flex-col gap-6">
      {/* Simulate + Reset */}
      <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-glass flex flex-col gap-5">
        <div className="flex gap-3">
          <button
            onClick={calcular}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase"
          >
            <span className="material-symbols-outlined text-lg">play_arrow</span>
            Simular
          </button>
          <button
            onClick={reset}
            className="w-12 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-xl">restart_alt</span>
          </button>
        </div>

        {/* Material select */}
        <div className="bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-primary" label="Configuração Base" />
          <div className="space-y-4">
            <FieldGroup label="Material da Peça">
              <select
                value={materialId}
                onChange={(e) => setMaterial(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-3 pr-8 text-sm text-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none transition-all hover:border-white/20"
              >
                {MATERIAIS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}{m.status === 'estimado' ? ' ⚠' : ''}
                  </option>
                ))}
              </select>
              {material && (
                <div className="flex justify-between mt-1 px-1">
                  <span className="text-[10px] text-gray-600">{material.dureza}</span>
                  {vcRange && (
                    <span className="text-[10px] text-primary/70">Vc: {vcRange[0]}-{vcRange[1]} m/min</span>
                  )}
                </div>
              )}
              {material?.status === 'estimado' && (
                <span className="text-[10px] text-seg-amarelo mt-1 block">Dados estimados</span>
              )}
            </FieldGroup>

            {/* Operation type radio */}
            <FieldGroup label="Tipo de Usinagem">
              <div className="grid grid-cols-3 gap-2">
                {Object.values(TipoUsinagem).map((t) => (
                  <label key={t} className="cursor-pointer group">
                    <input
                      type="radio"
                      name="tipo_usinagem"
                      className="peer sr-only"
                      checked={tipoOperacao === t}
                      onChange={() => setTipoOperacao(t)}
                    />
                    <div className="py-2.5 px-1 rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-center text-[11px] font-medium hover:bg-white/5">
                      {OPERACAO_LABELS[t]}
                    </div>
                  </label>
                ))}
              </div>
            </FieldGroup>
          </div>
        </div>

        {/* Tool section */}
        <div className="bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-secondary" label="Ferramenta" />
          <div className="space-y-4">
            <FieldGroup label="Tipo">
              <div className="grid grid-cols-3 gap-2">
                {FERRAMENTAS_PADRAO.map((f) => (
                  <button
                    key={f.tipo}
                    onClick={() => setFerramenta({ tipo: f.tipo, numeroArestas: f.zPadrao })}
                    className={`py-2 rounded border text-xs transition-colors ${
                      ferramenta.tipo === f.tipo
                        ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'
                    }`}
                  >
                    {f.descricao.split(' ')[0]}
                  </button>
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="Diâmetro (mm)">
              <div className="grid grid-cols-6 gap-1.5">
                {DIAMETROS_PADRAO.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFerramenta({ diametro: d })}
                    className={`py-1.5 rounded border text-xs font-mono ${
                      ferramenta.diametro === d
                        ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="Arestas (Z)">
              <input
                type="number"
                value={ferramenta.numeroArestas}
                onChange={(e) => setFerramenta({ numeroArestas: Number(e.target.value) })}
                min={1} max={12}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none"
              />
            </FieldGroup>

            <FieldGroup label="Balanço (mm)">
              <input
                type="number"
                value={ferramenta.balanco}
                onChange={(e) => setFerramenta({ balanco: Number(e.target.value) })}
                min={5} max={200}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none"
              />
            </FieldGroup>
          </div>
        </div>

        {/* Cutting parameters */}
        <div className="bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-accent-orange" label="Parâmetros de Corte" />
          <div className="grid grid-cols-2 gap-3">
            <NumInput label="ap (mm)" value={parametros.ap} onChange={(v) => setParametros({ ap: v })} min={0.1} max={50} step={0.1} />
            <NumInput label="ae (mm)" value={parametros.ae} onChange={(v) => setParametros({ ae: v })} min={0.1} max={50} step={0.1} />
            <NumInput label="fz (mm)" value={parametros.fz} onChange={(v) => setParametros({ fz: v })} min={0.01} max={1} step={0.01} />
            <NumInput label="Vc (m/min)" value={parametros.vc} onChange={(v) => setParametros({ vc: v })} min={1} max={1200} step={1} />
          </div>
        </div>

        {/* Machine limits */}
        <div className="bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-seg-vermelho" label="Limites de Máquina" />
          <div className="grid grid-cols-2 gap-3">
            <NumInput label="Max RPM" value={limitesMaquina.maxRPM} onChange={(v) => setLimitesMaquina({ maxRPM: v })} min={100} max={40000} step={100} />
            <NumInput label="Max kW" value={limitesMaquina.maxPotencia} onChange={(v) => setLimitesMaquina({ maxPotencia: v })} min={0.5} max={100} step={0.5} />
            <NumInput label="Max Nm" value={limitesMaquina.maxTorque} onChange={(v) => setLimitesMaquina({ maxTorque: v })} min={1} max={500} step={1} />
            <NumInput label="Max mm/min" value={limitesMaquina.maxAvanco} onChange={(v) => setLimitesMaquina({ maxAvanco: v })} min={100} max={20000} step={100} />
          </div>
        </div>

        {/* Safety factor slider */}
        <div className="bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow">
          <SectionTitle color="bg-seg-verde" label="Fator de Segurança" />
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0.5} max={1} step={0.05}
              value={safetyFactor}
              onChange={(e) => setSafetyFactor(Number(e.target.value))}
              className="flex-1 h-1.5 bg-black/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-seg-verde [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(46,204,113,0.6)]"
            />
            <span className="text-sm font-mono text-white w-10 text-right">{safetyFactor.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

