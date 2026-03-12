import { CATEGORY_COLORS } from '@/data/architecture-graph';
import type { ArchNode } from '@/data/architecture-graph';

interface ArchTooltipProps {
  node: ArchNode | null;
  mouseX: number;
  mouseY: number;
}

export function ArchTooltip({ node, mouseX, mouseY }: ArchTooltipProps) {
  if (!node) {
    return null;
  }

  const width = 260;
  const height = 126;
  const viewportWidth = typeof window === 'undefined' ? 1920 : window.innerWidth;
  const viewportHeight = typeof window === 'undefined' ? 1080 : window.innerHeight;
  const left = mouseX + width + 16 > viewportWidth ? mouseX - width - 12 : mouseX + 12;
  const top = mouseY + height + 16 > viewportHeight ? mouseY - height - 12 : mouseY + 12;

  return (
    <div
      className="pointer-events-none fixed z-40 w-[260px] rounded-xl border border-white/10 bg-surface-dark/95 p-3 shadow-glass backdrop-blur-xl transition-opacity"
      style={{ left, top }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-1 h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: CATEGORY_COLORS[node.category] }}
        />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{node.label}</div>
          <div className="mt-1 text-xs text-gray-400">{node.labelPt}</div>
        </div>
      </div>

      <div className="my-3 border-t border-white/5" />

      <div className="space-y-1">
        <div className="break-all font-mono text-[11px] text-primary">{node.filePath}</div>
        <div className="text-[11px] text-gray-400">{node.lines} linhas</div>
        <div className="text-[11px] uppercase tracking-[0.14em] text-gray-500">{node.group}</div>
      </div>
    </div>
  );
}
