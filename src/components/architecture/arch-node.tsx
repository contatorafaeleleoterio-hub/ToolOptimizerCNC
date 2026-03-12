import { CATEGORY_COLORS } from '@/data/architecture-graph';
import type { ArchNode as ArchNodeType } from '@/data/architecture-graph';

interface ArchNodeProps {
  node: ArchNodeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: (event: React.MouseEvent<SVGGElement>) => void;
  onMouseLeave: () => void;
}

function compact(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

export function ArchNode({
  node,
  x,
  y,
  width = 172,
  height = 72,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ArchNodeProps) {
  const color = CATEGORY_COLORS[node.category];
  const pathLabel = compact(node.filePath.replace('src/', ''), 26);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer transition-all"
      style={{
        filter: isHovered ? `drop-shadow(0 0 10px ${color})` : undefined,
      }}
      data-node-id={node.id}
    >
      <rect
        width={width}
        height={height}
        rx="10"
        fill="rgba(15, 23, 42, 0.92)"
        stroke="rgba(255,255,255,0.10)"
      />
      <rect width="5" height={height} rx="10" fill={color} />
      <text
        x="14"
        y="24"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
      >
        {compact(node.label, 24)}
      </text>
      <text
        x="14"
        y="44"
        fill="#94A3B8"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
      >
        {pathLabel}
      </text>
      <rect
        x={width - 56}
        y="12"
        width="42"
        height="18"
        rx="9"
        fill="rgba(255,255,255,0.08)"
      />
      <text
        x={width - 35}
        y="25"
        textAnchor="middle"
        fill="#E2E8F0"
        fontSize="10"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
      >
        {node.lines}L
      </text>
    </g>
  );
}
