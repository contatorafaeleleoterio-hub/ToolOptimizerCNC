import { useMachiningStore } from '@/store';
import { MATERIAIS, FERRAMENTAS_PADRAO, DIAMETROS_COMPLETOS, RAIOS_PADRAO } from '@/data';
import { TipoUsinagem } from '@/types';
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

const ARESTAS_OPTIONS = [2, 4] as const;

export function ConfigPanel() {
  const {
    materialId, ferramenta, tipoOperacao, parametros,
    setMaterial, setFerramenta, setTipoOperacao,
    simular, reset,
  } = useMachiningStore();

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

      <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-2 shadow-glass flex flex-col gap-2">

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
                    className={`py-2 rounded border text-sm transition-colors ${tipoOperacao === t
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
            {/* Dropdown Ferramentas Salvas — será adicionado na Fase 4 */}

            {/* 1. Tool type */}
            <FieldGroup label="Tipo">
              <div className="grid grid-cols-3 gap-2">
                {FERRAMENTAS_PADRAO.map((f) => (
                  <button key={f.tipo} onClick={() => setFerramenta({ tipo: f.tipo, numeroArestas: f.zPadrao })}
                    className={`py-2 rounded border text-sm transition-colors ${ferramenta.tipo === f.tipo
                      ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                      : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                    {f.descricao.split(' ')[0]}
                  </button>
                ))}
              </div>
            </FieldGroup>

            {/* 2. Diameter */}
            <FieldGroup label="Diâmetro (mm)">
              <select value={ferramenta.diametro} onChange={(e) => setFerramenta({ diametro: Number(e.target.value) })}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-base text-white font-mono focus:ring-1 focus:ring-primary outline-none appearance-none hover:border-white/20 select-chevron">
                {DIAMETROS_COMPLETOS.map((d) => (
                  <option key={d} value={d}>{d}mm</option>
                ))}
              </select>
            </FieldGroup>

            {/* 3. Corner radius — toroidal only (mantido como radio buttons até Fase 3) */}
            {ferramenta.tipo === 'toroidal' && (
              <FieldGroup label="Raio da Ponta">
                <div className="grid grid-cols-2 gap-2">
                  {RAIOS_PADRAO.map((raio) => (
                    <button key={raio} onClick={() => setFerramenta({ raioQuina: raio })}
                      className={`py-2 rounded-lg border text-sm font-mono transition-colors ${(ferramenta.raioQuina ?? 1.0) === raio
                        ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                      R{raio}
                    </button>
                  ))}
                </div>
              </FieldGroup>
            )}

            {/* 4. Arestas — mantido como radio buttons até Fase 3 */}
            <FieldGroup label="Arestas (Z)">
              <div className="grid grid-cols-2 gap-2">
                {ARESTAS_OPTIONS.map((z) => (
                  <button key={z} onClick={() => setFerramenta({ numeroArestas: z })}
                    className={`py-2 rounded-lg border text-sm font-mono transition-colors ${ferramenta.numeroArestas === z
                      ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
                      : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'}`}>
                    {z} Arestas
                  </button>
                ))}
              </div>
            </FieldGroup>

            {/* 5. Altura de Fixação — mantido como NumInput até Fase 3 */}
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
