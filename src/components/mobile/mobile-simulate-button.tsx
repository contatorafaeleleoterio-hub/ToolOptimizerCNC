import { useMachiningStore } from '@/store';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { usePlausible } from '@/hooks/use-plausible';

interface MobileSimulateButtonProps {
  onSimulationStart?: () => void;
}

export function MobileSimulateButton({ onSimulationStart }: MobileSimulateButtonProps) {
  const { simular, reset } = useMachiningStore();
  const { isUpdated, runSimulation } = useSimulationAnimation();
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
        className="flex-1 min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan active:scale-[0.97] transition-all flex items-center justify-center gap-2 text-sm uppercase"
      >
        {isUpdated ? (
          <>
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Atualizado
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-lg">play_arrow</span>
            Simular
          </>
        )}
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
