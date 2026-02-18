import { useMachiningStore } from '@/store';
import type { Ferramenta } from '@/types';

const TOOL_LABELS: Record<Ferramenta['tipo'], string> = {
  toroidal: 'Toroidal',
  esferica: 'Esférica',
  topo: 'Topo Reto',
};

function getCornerRadius(f: Ferramenta): string {
  if (f.tipo === 'toroidal') return `R${f.raioQuina ?? 1.0}`;
  if (f.tipo === 'esferica') return `R${f.diametro / 2}`;
  return 'N/A';
}

function ValueCell({ label, value, color = 'text-primary' }: {
  label: string; value: string; color?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] text-gray-500 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-mono font-bold ${color}`}>{value}</span>
    </div>
  );
}

export function ToolSummaryViewer() {
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const parametros = useMachiningStore((s) => s.parametros);

  return (
    <div className="bg-gradient-to-r from-primary/5 to-transparent border-l-2 border-primary rounded-lg p-3 mb-4" data-testid="tool-summary">
      <div className="grid grid-cols-4 gap-3 mb-2">
        <ValueCell label="Diâmetro" value={`Ø${ferramenta.diametro}mm`} />
        <ValueCell label="Raio Ponta" value={getCornerRadius(ferramenta)} />
        <ValueCell label="Tipo" value={TOOL_LABELS[ferramenta.tipo]} />
        <ValueCell label="Altura Fix." value={`${ferramenta.balanco}mm`} />
      </div>
      <div className="grid grid-cols-4 gap-3">
        <ValueCell label="Vc" value={`${parametros.vc.toFixed(2)}`} color="text-primary" />
        <ValueCell label="fz" value={`${parametros.fz.toFixed(2)}`} color="text-secondary" />
        <ValueCell label="ae" value={`${parametros.ae.toFixed(2)}`} color="text-accent-orange" />
        <ValueCell label="ap" value={`${parametros.ap.toFixed(2)}`} color="text-accent-orange" />
      </div>
    </div>
  );
}
