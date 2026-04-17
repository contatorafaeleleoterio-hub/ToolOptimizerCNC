import { useMachiningStore } from '@/store';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { usePlausible } from '@/hooks/use-plausible';

interface MobileSimulateButtonProps {
  onSimulationStart?: () => void;
}

export function MobileSimulateButton({ onSimulationStart }: MobileSimulateButtonProps) {
  const { simular, reset } = useMachiningStore();
  const { isCalculating, calcProgress, runSimulation } = useSimulationAnimation();
  const { track } = usePlausible();
  const materialId = useMachiningStore((s) => s.materialId);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);

  const handleSimulate = () => {
    track('Simulacao_Executada', { material: String(materialId), operacao: tipoOperacao });
    onSimulationStart?.();
    runSimulation(simular);
  };

  return (
    <div className="flex gap-3 bg-[rgba(10,14,20,0.95)] backdrop-blur-xl border-t border-white/5 px-4 py-2">
      <button
        onClick={handleSimulate}
        disabled={isCalculating}
        className="relative flex-1 min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan active:scale-[0.97] transition-all flex items-center justify-center gap-2 text-sm uppercase disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        style={!isCalculating ? { animation: 'btnIdleGlow 3s ease-in-out infinite' } : undefined}
      >
        {/* Progress bar fill */}
        {isCalculating && (
          <span
            className="absolute inset-0 rounded-xl origin-left"
            style={{
              background: 'linear-gradient(90deg, rgba(0,217,255,0.35) 0%, rgba(57,255,20,0.25) 100%)',
              transform: `scaleX(${calcProgress / 100})`,
              transition: calcProgress > 0 ? 'transform 0.08s linear' : 'none',
            }}
          />
        )}
        <span className="relative flex items-center gap-2">
          {isCalculating ? (
            <>
              <span
                className="material-symbols-outlined text-lg"
                style={{ animation: 'spinIcon 0.9s linear infinite' }}
              >
                casino
              </span>
              CALCULANDO {calcProgress}%
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              Simular
            </>
          )}
        </span>
      </button>
      <button
        onClick={reset}
        className="w-14 min-h-[48px] rounded-xl bg-white/5 border border-white/10 text-gray-400 active:bg-white/10 transition-all flex items-center justify-center"
        aria-label="Resetar parâmetros"
      >
        <span className="material-symbols-outlined text-xl">restart_alt</span>
      </button>
    </div>
  );
}
