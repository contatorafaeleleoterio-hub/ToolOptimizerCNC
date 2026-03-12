import type { ArchGroup } from '@/data/architecture-graph';

interface MobileArchGroupCardProps {
  group: ArchGroup;
  nodeCount: number;
  totalLines: number;
  onClick: () => void;
  index: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  entry: 'login',
  page: 'web',
  component: 'widgets',
  store: 'database',
  engine: 'precision_manufacturing',
  data: 'table_chart',
  hook: 'link',
  type: 'code',
  util: 'build',
};

export function MobileArchGroupCard({ group, nodeCount, totalLines, onClick, index }: MobileArchGroupCardProps) {
  const borderColor = group.color;
  const iconName = CATEGORY_ICONS[group.category] ?? 'folder';

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-2 rounded-2xl border bg-black/30 p-4 text-left backdrop-blur-sm transition-all active:scale-[0.97]"
      style={{
        borderColor: `${borderColor}33`,
        animationDelay: `${index * 60}ms`,
        animation: 'fadeInUp 0.35s ease-out both',
      }}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className="material-symbols-outlined text-2xl"
          style={{ color: borderColor }}
        >
          {iconName}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: `${borderColor}18`,
            color: borderColor,
          }}
        >
          {group.label}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">{group.labelPt}</h3>
        <p className="mt-1 text-[11px] text-gray-500">
          {nodeCount} {nodeCount === 1 ? 'arquivo' : 'arquivos'} &middot;{' '}
          {totalLines.toLocaleString('pt-BR')} linhas
        </p>
      </div>

      <div className="h-[3px] w-full rounded-full bg-white/5">
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: borderColor,
            width: `${Math.min(100, (nodeCount / 29) * 100)}%`,
            opacity: 0.6,
          }}
        />
      </div>
    </button>
  );
}
