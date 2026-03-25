import { ArchEdge } from './arch-edge';

interface ArchDataFlowProps {
  onClose: () => void;
}

interface PipelineStep {
  id: string;
  label: string;
  formula: string;
}

const VIEWBOX_WIDTH = 920;
const VIEWBOX_HEIGHT = 560;
const STEP_WIDTH = 180;
const STEP_HEIGHT = 82;
const COL_GAP = 28;
const ROW_GAP = 36;
const START_X = 50;
const START_Y = 56;

const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'user-input', label: 'User Input', formula: 'material + ferramenta + parametros' },
  { id: 'tool-corrections', label: 'Safety Factor', formula: 'SF aplicado em potência e avanço' },
  { id: 'validate-inputs', label: 'validateInputs()', formula: 'D > 0, ap > 0, ae <= D' },
  { id: 'calc-rpm', label: 'calculateRPM()', formula: 'RPM = (Vc * 1000) / (pi * D)' },
  { id: 'calc-effective-fz', label: 'calculateEffectiveFz()', formula: 'CTF = 1 / sqrt(1 - ...)' },
  { id: 'calc-feed', label: 'calculateFeedRate()', formula: 'F = fzEfetivo * Z * RPM' },
  { id: 'manual-overrides', label: 'Manual Overrides', formula: 'rpm/feed percentuais ou fixos' },
  { id: 'calc-mrr', label: 'calculateMRR()', formula: 'Q = (ap * ae * Vf) / 1000' },
  { id: 'calc-power', label: 'calculatePower()', formula: 'Pc = (Q * Kc) / (60000 * eta)' },
  { id: 'calc-torque', label: 'calculateTorque()', formula: 'M = (Pc * 9549) / RPM' },
  { id: 'validate-limits', label: 'validateMachineLimits()', formula: 'rpm, potencia e avanco' },
  { id: 'validate-ld', label: 'validateLDRatio()', formula: 'seguro / alerta / critico / bloqueado' },
  { id: 'slider-bounds', label: 'calcularSliderBounds()', formula: 'ranges dinamicos por material' },
  { id: 'calc-health', label: 'calculateHealthScore()', formula: 'ap 40 + fz 30 + ae 20 + vc 10' },
  { id: 'store-result', label: 'set({ resultado })', formula: 'resultado pronto na machining-store' },
  { id: 'save-history', label: 'historyStore.addEntry()', formula: 'persistencia do historico' },
];

function getStepPosition(index: number): { x: number; y: number } {
  const row = Math.floor(index / 4);
  const column = index % 4;
  const actualColumn = row % 2 === 0 ? column : 3 - column;

  return {
    x: START_X + actualColumn * (STEP_WIDTH + COL_GAP),
    y: START_Y + row * (STEP_HEIGHT + ROW_GAP),
  };
}

function buildFlowPath(): string {
  const points = PIPELINE_STEPS.map((_, index) => {
    const { x, y } = getStepPosition(index);
    return {
      x: x + STEP_WIDTH / 2,
      y: y + STEP_HEIGHT / 2,
    };
  });

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    return `${path} L ${point.x} ${point.y}`;
  }, '');
}

const flowPath = buildFlowPath();

export function ArchDataFlow({ onClose }: ArchDataFlowProps) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 p-5 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-[1100px] rounded-3xl border border-primary/20 bg-surface-dark/95 p-5 shadow-glass"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">Fluxo de Dados do calcular()</h2>
            <p className="text-xs text-gray-400">
              Sequencia real do pipeline em torno de <code className="text-primary">machining-store.ts</code> e <code className="text-primary">simular()</code>.
            </p>
          </div>
          <button
            type="button"
            data-stop-pan="true"
            aria-label="Fechar fluxo de dados"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            Fechar
          </button>
        </div>

        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-[560px] w-full rounded-2xl bg-background-dark/75"
        >
          <defs>
            <marker id="arch-arrow-data-flow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#00D9FF" />
            </marker>
          </defs>

          {PIPELINE_STEPS.map((step, index) => {
            const position = getStepPosition(index);

            return (
              <g key={step.id} transform={`translate(${position.x}, ${position.y})`}>
                <rect
                  width={STEP_WIDTH}
                  height={STEP_HEIGHT}
                  rx="12"
                  fill="rgba(15, 23, 42, 0.94)"
                  stroke="rgba(0, 217, 255, 0.28)"
                />
                <text
                  x="16"
                  y="28"
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {step.label}
                </text>
                <text
                  x="16"
                  y="52"
                  fill="#94A3B8"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {step.formula}
                </text>
              </g>
            );
          })}

          {PIPELINE_STEPS.slice(0, -1).map((step, index) => {
            const current = getStepPosition(index);
            const next = getStepPosition(index + 1);

            return (
              <ArchEdge
                key={`${step.id}-${PIPELINE_STEPS[index + 1].id}`}
                fromX={current.x + STEP_WIDTH / 2}
                fromY={current.y + STEP_HEIGHT / 2}
                toX={next.x + STEP_WIDTH / 2}
                toY={next.y + STEP_HEIGHT / 2}
                type="data-flow"
                animated
                opacity={0.9}
              />
            );
          })}

          <circle r="5" fill="#00D9FF" filter="drop-shadow(0 0 6px #00D9FF)">
            <animateMotion dur="4s" repeatCount="indefinite" path={flowPath} />
          </circle>
        </svg>
      </div>
    </div>
  );
}
