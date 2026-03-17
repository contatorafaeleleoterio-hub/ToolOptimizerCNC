import { useMachiningStore } from '@/store';
import { getMaterialById } from '@/data';
import { TipoUsinagem } from '@/types';
import type { Ferramenta } from '@/types';

const TOOL_LABELS: Record<Ferramenta['tipo'], string> = {
  toroidal: 'Toroidal',
  esferica: 'Esférica',
  topo: 'Topo Reto',
};

const OPERACAO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

function getCornerRadius(f: Ferramenta): string {
  if (f.tipo === 'toroidal') return `R${f.raioQuina ?? 1.0}`;
  if (f.tipo === 'esferica') return `R${f.diametro / 2}`;
  return 'N/A';
}

function MiniCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-mono font-semibold text-white/90">{value}</span>
    </div>
  );
}

function OperationBadge({ tipo }: { tipo: TipoUsinagem }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Operação</span>
      <span className="text-sm font-semibold text-white/90 bg-white/10 px-2 py-0.5 rounded-md inline-block">
        {OPERACAO_LABELS[tipo]}
      </span>
    </div>
  );
}

function ParamCard({ label, value, unit, abbrev, accentClass }: {
  label: string; value: string; unit: string; abbrev: string; accentClass: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-xl font-mono font-bold text-white leading-none">{value}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-gray-500">{unit}</span>
        <span className={`text-[10px] font-bold ${accentClass}`}>{abbrev}</span>
      </div>
    </div>
  );
}

export function ToolSummaryViewer() {
  const ferramenta    = useMachiningStore((s) => s.ferramenta);
  const parametros    = useMachiningStore((s) => s.parametros);
  const materialId    = useMachiningStore((s) => s.materialId);
  const tipoOperacao  = useMachiningStore((s) => s.tipoOperacao);
  const material      = getMaterialById(materialId);

  return (
    <div className="bg-black/30 border border-white/5 rounded-xl p-3 mb-4 backdrop-blur-sm" data-testid="tool-summary">

      {/* GROUP 1: Identity — material, operation, tool specs */}
      <div className="flex items-center gap-4 pb-2.5 border-b border-white/10">

        {/* Material + Operation */}
        <div className="flex items-center gap-3 flex-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Material</span>
            <span className="text-sm font-semibold text-white">{material?.nome ?? '—'}</span>
          </div>
          <OperationBadge tipo={tipoOperacao} />
        </div>

        {/* Vertical divider */}
        <div className="w-px h-8 bg-white/10 flex-shrink-0" />

        {/* Tool specs */}
        <div className="flex gap-4">
          <MiniCell label="Tipo"  value={TOOL_LABELS[ferramenta.tipo]} />
          <MiniCell label="Diâm." value={`Ø${ferramenta.diametro}mm`} />
          <MiniCell label="Raio"  value={getCornerRadius(ferramenta)} />
          <MiniCell label="Fix."  value={`${ferramenta.balanco}mm`} />
        </div>

      </div>

      {/* GROUP 2: Cutting parameters — full name prominent, abbrev secondary */}
      <div className="grid grid-cols-4 gap-3 pt-2.5">
        <ParamCard label="Veloc. Corte" value={parametros.vc.toFixed(2)} unit="m/min" abbrev="Vc" accentClass="text-primary" />
        <ParamCard label="Avanço/Dente" value={parametros.fz.toFixed(3)} unit="mm"    abbrev="fz" accentClass="text-secondary" />
        <ParamCard label="Eng. Radial"  value={parametros.ae.toFixed(2)} unit="mm"    abbrev="ae" accentClass="text-accent-purple" />
        <ParamCard label="Prof. Axial"  value={parametros.ap.toFixed(2)} unit="mm"    abbrev="ap" accentClass="text-accent-orange" />
      </div>

    </div>
  );
}
