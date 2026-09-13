import { useEffect, useRef, useState } from 'react';
import { ARCHITECTURE_GRAPH, EDGE_COLORS } from '@/data/architecture-graph';
import type { ArchGroup, ArchGroupId, ArchNode } from '@/data/architecture-graph';
import { ArchDataFlow } from './arch-data-flow';
import { ArchEdge as Edge } from './arch-edge';
import { ArchGroup as GroupCard } from './arch-group';
import { ArchLegend } from './arch-legend';
import { ArchNode as NodeCard } from './arch-node';
import { ArchTooltip } from './arch-tooltip';

interface ArchitectureMapProps {
  level: 1 | 2 | 3;
  onLevelChange: (level: 1 | 2 | 3) => void;
}

interface NodePosition {
  x: number;
  y: number;
}

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 760;
const EXPANDED_GROUP_DEFAULT: ArchGroupId = 'components';

function getGroupStats(group: ArchGroup) {
  const nodes = ARCHITECTURE_GRAPH.nodes.filter((node) => node.group === group.id);
  return {
    nodeCount: nodes.length,
    totalLines: nodes.reduce((sum, node) => sum + node.lines, 0),
  };
}

function getExpandedNodes(groupId: ArchGroupId): ArchNode[] {
  return ARCHITECTURE_GRAPH.nodes.filter((node) => node.group === groupId);
}

function getExpandedLayout(groupId: ArchGroupId): {
  panelX: number;
  panelY: number;
  panelWidth: number;
  panelHeight: number;
  contentHeight: number;
  positions: Record<string, NodePosition>;
} {
  const nodes = getExpandedNodes(groupId);
  const panelX = 254;
  const panelY = 120;
  const panelWidth = 760;
  const panelHeight = 510;
  const nodeWidth = 172;
  const nodeHeight = 72;
  const gapX = 18;
  const gapY = 18;
  const columns = groupId === 'components' ? 4 : nodes.length > 8 ? 4 : 3;
  const paddingX = 22;
  const paddingY = 22;
  const positions: Record<string, NodePosition> = {};

  nodes.forEach((node, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    positions[node.id] = {
      x: paddingX + column * (nodeWidth + gapX),
      y: paddingY + row * (nodeHeight + gapY),
    };
  });

  const rows = Math.max(1, Math.ceil(nodes.length / columns));
  const contentHeight = paddingY * 2 + rows * nodeHeight + Math.max(0, rows - 1) * gapY;

  return {
    panelX,
    panelY,
    panelWidth,
    panelHeight,
    contentHeight,
    positions,
  };
}

function getLevel1Center(group: ArchGroup): NodePosition {
  return {
    x: group.position.x + 110,
    y: group.position.y + 60,
  };
}

function buildMarkers() {
  return (
    <defs>
      {(['import', 'data-flow', 'state', 'renders'] as const).map((type) => (
        <marker key={type} id={`arch-arrow-${type}`} markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={EDGE_COLORS[type]} />
        </marker>
      ))}
    </defs>
  );
}

export function ArchitectureMap({ level, onLevelChange }: ArchitectureMapProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const [expandedGroup, setExpandedGroup] = useState<ArchGroupId>(EXPANDED_GROUP_DEFAULT);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipNode, setTooltipNode] = useState<ArchNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (level === 3) {
          onLevelChange(2);
        } else if (level === 2) {
          onLevelChange(1);
        }
      }

      if (event.key === '1') onLevelChange(1);
      if (event.key === '2') onLevelChange(2);
      if (event.key === '3') onLevelChange(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [level, onLevelChange]);

  useEffect(() => {
    if (level > 1 && !expandedGroup) {
      setExpandedGroup(EXPANDED_GROUP_DEFAULT);
    }
  }, [expandedGroup, level]);

  const level1Edges = ARCHITECTURE_GRAPH.edges.filter((edge) => edge.level === 1);
  const level2Edges = ARCHITECTURE_GRAPH.edges.filter((edge) => edge.level === 2);
  const layout = getExpandedLayout(expandedGroup);
  const expandedNodes = getExpandedNodes(expandedGroup);
  const visibleEdges = level2Edges.filter(
    (edge) =>
      expandedNodes.some((node) => node.id === edge.from) &&
      expandedNodes.some((node) => node.id === edge.to),
  );

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const rect = viewportRef.current?.getBoundingClientRect();
    const cursorX = rect ? event.clientX - rect.left : 0;
    const cursorY = rect ? event.clientY - rect.top : 0;
    const nextScale = Math.max(0.5, Math.min(2, scale + (event.deltaY > 0 ? -0.1 : 0.1)));
    const ratio = nextScale / scale;

    setPan((current) => ({
      x: cursorX - (cursorX - current.x) * ratio,
      y: cursorY - (cursorY - current.y) * ratio,
    }));
    setScale(nextScale);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-stop-pan="true"]')) {
      return;
    }

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.active) {
      setPan({
        x: dragRef.current.originX + (event.clientX - dragRef.current.startX),
        y: dragRef.current.originY + (event.clientY - dragRef.current.startY),
      });
    }
  };

  const stopDragging = () => {
    dragRef.current.active = false;
  };

  const handleNodeEnter = (node: ArchNode) => (event: React.MouseEvent<SVGGElement>) => {
    setHoveredNode(node.id);
    setTooltipNode(node);
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
    setTooltipNode(null);
  };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs text-gray-400">
        <div>Scroll: zoom, arrastar: pan, duplo clique: reset, teclado: 1 / 2 / 3 / Esc</div>
        <div className="font-mono text-[11px] text-gray-500">{scale.toFixed(1)}x</div>
      </div>

      <div
        ref={viewportRef}
        className="relative min-h-[760px] overflow-hidden rounded-[28px] border border-white/5 bg-surface-dark shadow-glass"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onDoubleClick={() => {
          setPan({ x: 0, y: 0 });
          setScale(1);
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-18%] h-[320px] w-[320px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-18%] right-[-12%] h-[320px] w-[320px] rounded-full bg-accent-orange/10 blur-[120px]" />
        </div>

        <div
          className="absolute left-0 top-0"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} className="absolute inset-0 h-full w-full">
            {buildMarkers()}

            {level1Edges.map((edge) => {
              const fromGroup = ARCHITECTURE_GRAPH.groups.find((group) => group.id === edge.from);
              const toGroup = ARCHITECTURE_GRAPH.groups.find((group) => group.id === edge.to);

              if (!fromGroup || !toGroup) {
                return null;
              }

              const from = getLevel1Center(fromGroup);
              const to = getLevel1Center(toGroup);

              return (
                <Edge
                  key={`${edge.from}-${edge.to}-${edge.level}`}
                  fromX={from.x}
                  fromY={from.y}
                  toX={to.x}
                  toY={to.y}
                  type={edge.type}
                  label={edge.label}
                  opacity={level === 1 ? 0.9 : 0.18}
                />
              );
            })}
          </svg>

          {ARCHITECTURE_GRAPH.groups.map((group) => {
            const stats = getGroupStats(group);
            const isMinimized = level !== 1 && group.id !== expandedGroup;

            return (
              <GroupCard
                key={group.id}
                group={group}
                nodeCount={stats.nodeCount}
                totalLines={stats.totalLines}
                isExpanded={level !== 1 && group.id === expandedGroup}
                isMinimized={isMinimized}
                onClick={() => {
                  setExpandedGroup(group.id);
                  onLevelChange(2);
                }}
                onMouseEnter={() => undefined}
                onMouseLeave={() => undefined}
              />
            );
          })}

          {level !== 1 ? (
            <div
              data-stop-pan="true"
              className="absolute overflow-hidden rounded-[28px] border border-white/10 bg-black/45 shadow-inner-glow backdrop-blur-md"
              style={{
                left: layout.panelX,
                top: layout.panelY,
                width: layout.panelWidth,
                height: layout.panelHeight,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <div>
                  <div className="text-lg font-bold text-white">
                    {ARCHITECTURE_GRAPH.groups.find((group) => group.id === expandedGroup)?.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {ARCHITECTURE_GRAPH.groups.find((group) => group.id === expandedGroup)?.labelPt}
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-300">
                  {expandedNodes.length} arquivos
                </div>
              </div>

              <div className="h-[calc(100%-73px)] overflow-auto">
                <svg
                  viewBox={`0 0 ${layout.panelWidth} ${Math.max(layout.panelHeight - 70, layout.contentHeight)}`}
                  className="min-h-full w-full"
                  style={{ height: Math.max(layout.contentHeight, layout.panelHeight - 70) }}
                >
                  {buildMarkers()}

                  {visibleEdges.map((edge) => {
                    const from = layout.positions[edge.from];
                    const to = layout.positions[edge.to];

                    if (!from || !to) {
                      return null;
                    }

                    const isHighlighted = hoveredNode ? hoveredNode === edge.from || hoveredNode === edge.to : false;

                    return (
                      <Edge
                        key={`${edge.from}-${edge.to}-${edge.level}`}
                        fromX={from.x + 86}
                        fromY={from.y + 36}
                        toX={to.x + 86}
                        toY={to.y + 36}
                        type={edge.type}
                        opacity={hoveredNode ? (isHighlighted ? 1 : 0.2) : 0.5}
                      />
                    );
                  })}

                  {expandedNodes.map((node) => {
                    const position = layout.positions[node.id];

                    return (
                      <NodeCard
                        key={node.id}
                        node={node}
                        x={position.x}
                        y={position.y}
                        isHovered={hoveredNode === node.id}
                        onClick={() => undefined}
                        onMouseEnter={handleNodeEnter(node)}
                        onMouseLeave={handleNodeLeave}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          ) : null}
        </div>

        <ArchLegend metadata={ARCHITECTURE_GRAPH.metadata} />
        <ArchTooltip node={tooltipNode} mouseX={mousePos.x} mouseY={mousePos.y} />

        {level === 3 ? <ArchDataFlow onClose={() => onLevelChange(2)} /> : null}
      </div>
    </div>
  );
}
