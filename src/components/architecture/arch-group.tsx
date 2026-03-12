import type { ArchGroup } from '@/data/architecture-graph';

interface ArchGroupProps {
  group: ArchGroup;
  nodeCount: number;
  totalLines: number;
  isExpanded: boolean;
  isMinimized: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ArchGroup({
  group,
  nodeCount,
  totalLines,
  isExpanded,
  isMinimized,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ArchGroupProps) {
  const baseStyle = {
    left: group.position.x,
    top: group.position.y,
    boxShadow: isExpanded ? `0 0 22px ${group.color}55` : undefined,
  };

  if (isMinimized) {
    return (
      <button
        type="button"
        data-stop-pan="true"
        aria-label={`Abrir grupo ${group.labelPt}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="absolute flex h-10 w-36 items-center justify-center rounded-full border bg-black/35 px-4 text-xs font-semibold text-white/80 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-white"
        style={{
          ...baseStyle,
          borderColor: `${group.color}33`,
        }}
      >
        {group.labelPt}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-stop-pan="true"
      aria-pressed={isExpanded}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute h-[120px] w-[220px] rounded-2xl border bg-card-dark p-4 text-left shadow-inner-glow backdrop-blur-xl transition-all hover:-translate-y-1"
      style={{
        ...baseStyle,
        borderColor: 'rgba(255,255,255,0.06)',
        borderTopWidth: 3,
        borderTopColor: group.color,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-bold text-white">{group.label}</div>
          <div className="mt-1 text-[11px] text-gray-400">{group.labelPt}</div>
        </div>
        <span
          className="mt-0.5 h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: group.color }}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-gray-200">
          {nodeCount} arquivos
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-gray-200">
          {totalLines} linhas
        </span>
      </div>
    </button>
  );
}
