import { useState } from 'react';
import type { SavedTool } from '@/types/index';

interface ToolEditModalProps {
  tool: SavedTool;
  onSave: (updates: Partial<Omit<SavedTool, 'id' | 'createdAt'>>) => void;
  onClose: () => void;
}

const HELIX_OPTIONS = [30, 45, 60] as const;
const ARESTA_OPTIONS = [2, 3, 4, 6] as const;

const TIPO_LABELS: Record<SavedTool['tipo'], string> = {
  topo: 'Topo',
  toroidal: 'Toroidal',
  esferica: 'Esférica',
};

export function ToolEditModal({ tool, onSave, onClose }: ToolEditModalProps) {
  const [tipo, setTipo]           = useState(tool.tipo);
  const [diametro, setDiametro]   = useState(tool.diametro);
  const [raio, setRaio]           = useState(tool.raioQuina ?? 0);
  const [arestas, setArestas]     = useState(tool.numeroArestas);
  const [balanco, setBalanco]     = useState(tool.balanco);
  const [helice, setHelice]       = useState<30 | 45 | 60>(
    (tool.anguloHelice as 30 | 45 | 60) ?? 45
  );

  const isValid =
    diametro > 0 &&
    balanco > 0 &&
    !(tipo === 'toroidal' && raio > diametro / 2);

  const handleSave = () => {
    if (!isValid) return;
    onSave({
      tipo,
      diametro,
      raioQuina: tipo === 'toroidal' ? raio : undefined,
      anguloHelice: helice,
      numeroArestas: arestas,
      balanco,
    });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
      data-testid="tool-edit-modal-overlay"
    >
      <div className="bg-[rgba(20,28,40,0.98)] border border-white/12 rounded-2xl p-5 w-80 shadow-glass flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-300">
          Editar Ferramenta
        </h3>

        {/* Tipo */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Tipo</span>
          <div className="flex gap-2">
            {(['topo', 'toroidal', 'esferica'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTipo(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase border transition-all ${
                  tipo === t
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-black/30 border-white/10 text-gray-500 hover:border-white/20'
                }`}
              >
                {TIPO_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Diâmetro */}
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Diâmetro (mm)</span>
          <input
            type="number"
            min={0.1}
            max={200}
            step={0.1}
            value={diametro}
            onChange={(e) => setDiametro(Number(e.target.value))}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-sm text-white outline-none focus:border-primary/50"
          />
        </label>

        {/* Raio de Quina — só toroidal */}
        {tipo === 'toroidal' && (
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Raio de Quina (mm)</span>
            <input
              type="number"
              min={0}
              max={diametro / 2}
              step={0.1}
              value={raio}
              onChange={(e) => setRaio(Number(e.target.value))}
              className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-sm text-white outline-none focus:border-primary/50"
            />
          </label>
        )}

        {/* Arestas (Z) */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Arestas (Z)</span>
          <div className="flex gap-2">
            {ARESTA_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setArestas(n)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  arestas === n
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-black/30 border-white/10 text-gray-500 hover:border-white/20'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Fixação (H) */}
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Fixação (mm)</span>
          <input
            type="number"
            min={1}
            max={200}
            step={1}
            value={balanco}
            onChange={(e) => setBalanco(Number(e.target.value))}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-sm text-white outline-none focus:border-primary/50"
          />
        </label>

        {/* Ângulo de Hélice */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Hélice</span>
          <div className="flex gap-2">
            {HELIX_OPTIONS.map((h) => (
              <button
                key={h}
                onClick={() => setHelice(h)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  helice === h
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-black/30 border-white/10 text-gray-500 hover:border-white/20'
                }`}
              >
                {h}°
              </button>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-white/10 text-xs text-gray-500 hover:bg-white/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 py-2 rounded-xl bg-primary/20 border border-primary/50 text-xs font-bold text-primary hover:bg-primary/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
