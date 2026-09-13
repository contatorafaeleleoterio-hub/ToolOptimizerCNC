import { CATEGORY_COLORS, EDGE_COLORS } from '@/data/architecture-graph';
import type { ArchGraph } from '@/data/architecture-graph';

interface ArchLegendProps {
  metadata: ArchGraph['metadata'];
}

const CATEGORY_ITEMS = [
  { label: 'Entrada / UI', color: CATEGORY_COLORS.component },
  { label: 'Estado', color: CATEGORY_COLORS.store },
  { label: 'Calculo', color: CATEGORY_COLORS.engine },
  { label: 'Dados', color: CATEGORY_COLORS.data },
  { label: 'Hooks / Rotas', color: CATEGORY_COLORS.page },
  { label: 'Tipos / Utils', color: CATEGORY_COLORS.type },
];

const EDGE_ITEMS = [
  { label: 'import', color: EDGE_COLORS.import, dashed: false },
  { label: 'data-flow', color: EDGE_COLORS['data-flow'], dashed: true },
  { label: 'state', color: EDGE_COLORS.state, dashed: false },
  { label: 'renders', color: EDGE_COLORS.renders, dashed: false },
];

export function ArchLegend({ metadata }: ArchLegendProps) {
  return (
    <aside className="pointer-events-none absolute bottom-4 left-4 z-20 w-[230px] rounded-2xl border border-white/5 bg-card-dark/95 p-4 shadow-inner-glow backdrop-blur-xl">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Legenda</div>

      <div className="mt-3 space-y-2">
        {CATEGORY_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-gray-200">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-white/5" />

      <div className="space-y-2">
        {EDGE_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-gray-200">
            <svg width="28" height="8" aria-hidden="true">
              <line
                x1="0"
                y1="4"
                x2="28"
                y2="4"
                stroke={item.color}
                strokeWidth="2"
                strokeDasharray={item.dashed ? '6 4' : undefined}
              />
            </svg>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-white/5" />

      <div className="space-y-1 text-[11px] text-gray-400">
        <div>v{metadata.version}</div>
        <div>{metadata.totalFiles} arquivos</div>
        <div>{metadata.totalLines} linhas</div>
        <div>Atualizado: {metadata.lastUpdated}</div>
      </div>
    </aside>
  );
}
