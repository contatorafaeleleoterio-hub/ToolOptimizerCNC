import { ARCHITECTURE_GRAPH, CATEGORY_COLORS } from '@/data/architecture-graph';
import type { ArchGroup, ArchNode } from '@/data/architecture-graph';

interface MobileArchNodeListProps {
  group: ArchGroup;
  onBack: () => void;
}

function getConnectionCount(nodeId: string): number {
  return ARCHITECTURE_GRAPH.edges.filter(
    (edge) => edge.level === 2 && (edge.from === nodeId || edge.to === nodeId),
  ).length;
}

function getConnectedNodes(nodeId: string): string[] {
  const connected = new Set<string>();
  for (const edge of ARCHITECTURE_GRAPH.edges) {
    if (edge.level !== 2) continue;
    if (edge.from === nodeId) connected.add(edge.to);
    if (edge.to === nodeId) connected.add(edge.from);
  }
  return [...connected];
}

function NodeCard({ node, index }: { node: ArchNode; index: number }) {
  const connections = getConnectionCount(node.id);
  const connectedIds = getConnectedNodes(node.id);
  const color = CATEGORY_COLORS[node.category];

  return (
    <div
      className="rounded-xl border border-white/5 bg-black/30 p-3 backdrop-blur-sm"
      style={{
        animationDelay: `${index * 40}ms`,
        animation: 'fadeInUp 0.3s ease-out both',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="truncate font-mono text-xs font-bold text-white">
              {node.label}
            </span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-gray-400">
            {node.labelPt}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="font-mono text-[10px] text-gray-500">
            {node.lines} ln
          </span>
          <span className="text-[10px] text-gray-600">
            {connections} {connections === 1 ? 'conexao' : 'conexoes'}
          </span>
        </div>
      </div>

      <div className="mt-2 text-[10px] text-gray-600">
        <span className="font-mono">{node.filePath}</span>
      </div>

      {connectedIds.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {connectedIds.slice(0, 5).map((cid) => (
            <span
              key={cid}
              className="rounded-md border border-white/5 bg-white/3 px-1.5 py-0.5 text-[9px] text-gray-500"
            >
              {cid}
            </span>
          ))}
          {connectedIds.length > 5 && (
            <span className="rounded-md bg-white/3 px-1.5 py-0.5 text-[9px] text-gray-600">
              +{connectedIds.length - 5}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function MobileArchNodeList({ group, onBack }: MobileArchNodeListProps) {
  const nodes = ARCHITECTURE_GRAPH.nodes.filter((n) => n.group === group.id);
  const totalLines = nodes.reduce((sum, n) => sum + n.lines, 0);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 transition-colors active:text-white"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Mapa
        </button>
        <span className="text-gray-700">/</span>
        <span style={{ color: group.color }} className="font-semibold">
          {group.labelPt}
        </span>
      </div>

      {/* Group Header */}
      <div
        className="mb-4 rounded-2xl border p-4"
        style={{ borderColor: `${group.color}33` }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{group.labelPt}</h2>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
            style={{
              backgroundColor: `${group.color}18`,
              color: group.color,
            }}
          >
            {group.label}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-gray-500">
          {nodes.length} arquivos &middot; {totalLines.toLocaleString('pt-BR')} linhas
        </p>
      </div>

      {/* Node List */}
      <div className="flex flex-col gap-2">
        {nodes.map((node, i) => (
          <NodeCard key={node.id} node={node} index={i} />
        ))}
      </div>
    </div>
  );
}
