import { EDGE_COLORS } from '@/data/architecture-graph';
import type { ArchEdge as ArchEdgeType } from '@/data/architecture-graph';

interface ArchEdgeProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  type: ArchEdgeType['type'];
  label?: string;
  animated?: boolean;
  opacity?: number;
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

export function ArchEdge({
  fromX,
  fromY,
  toX,
  toY,
  type,
  label,
  animated = false,
  opacity = 1,
}: ArchEdgeProps) {
  const color = EDGE_COLORS[type];
  const deltaX = toX - fromX;
  const curve = Math.max(60, Math.abs(deltaX) * 0.35);
  const controlX1 = fromX + (deltaX >= 0 ? curve : -curve);
  const controlX2 = toX - (deltaX >= 0 ? curve : -curve);
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const path = `M ${round(fromX)} ${round(fromY)} C ${round(controlX1)} ${round(fromY)} ${round(controlX2)} ${round(toY)} ${round(toX)} ${round(toY)}`;

  return (
    <g opacity={opacity}>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={animated ? 2 : 1.6}
        strokeDasharray={animated ? '8 4' : undefined}
        style={animated ? { animation: 'dashFlow 2s linear infinite' } : undefined}
        markerEnd={`url(#arch-arrow-${type})`}
      />
      {label ? (
        <text
          x={round(midX)}
          y={round(midY - 8)}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}
