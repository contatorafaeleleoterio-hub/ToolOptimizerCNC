import { useOnboardingStore } from '@/hooks/use-onboarding';

export function WelcomeModal() {
  const { setStep, skipOnboarding } = useOnboardingStore();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[rgba(22,27,34,0.95)] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center gap-6"
        data-testid="welcome-modal"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 mb-2">
            <span className="material-symbols-outlined text-4xl text-cyan-400">precision_manufacturing</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">FÊNIX</h1>
          <p className="text-sm text-cyan-400/70 font-mono">ToolOptimizer CNC</p>
        </div>

        <div className="text-center space-y-4">
          <p className="text-lg text-white font-medium">Parâmetros CNC em menos de 1 minuto</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Configure material + fresa e calcule RPM e Avanço com base em Kienzle e dados validados de fabricantes.
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 mt-4">
          <button
            onClick={() => setStep('config-base')}
            className="w-full py-3 rounded-xl bg-gradient-to-right from-cyan-700 to-cyan-500 hover:from-cyan-600 hover:to-cyan-400 text-white font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,217,255,0.3)] active:scale-95"
            data-testid="btn-comecar"
          >
            COMEÇAR AGORA
          </button>
          <button
            onClick={skipOnboarding}
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-sm uppercase tracking-widest active:scale-95"
            data-testid="btn-pular"
          >
            PULAR
          </button>
        </div>

        <div className="flex gap-2 mt-2">
          <div className="w-5 h-1.5 rounded-full bg-cyan-400" />
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    </div>
  );
}
