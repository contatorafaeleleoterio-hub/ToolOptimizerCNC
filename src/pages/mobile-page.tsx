import { useEffect } from 'react';
import { useMachiningStore } from '@/store';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';
import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileConfigSection } from '@/components/mobile/mobile-config-section';
import { MobileResultsSection } from '@/components/mobile/mobile-results-section';
import { MobileFineTuneSection } from '@/components/mobile/mobile-fine-tune-section';
import { Disclaimer } from '@/components/disclaimer';
import { usePageTitle } from '@/hooks/use-page-title';
import { SeoHead } from '@/components/seo-head';

function MobileStickyActions() {
  const { simular, reset } = useMachiningStore();
  const { isCalculating, runSimulation } = useSimulationAnimation();

  return (
    <div className="sticky top-0 z-20 bg-background-dark/95 backdrop-blur-md px-4 py-2 border-b border-white/5 shadow-glass">
      <div className="flex gap-3">
        <button onClick={() => runSimulation(simular)} disabled={isCalculating}
          className="flex-1 min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan active:scale-[0.97] transition-all flex items-center justify-center gap-2 text-sm uppercase disabled:opacity-70 disabled:cursor-not-allowed">
          {isCalculating ? (
            <>
              <span className="material-symbols-outlined text-lg animate-[spinner_0.9s_linear_infinite]">refresh</span>
              Calculando...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              Simular
            </>
          )}
        </button>
        <button onClick={reset}
          className="w-14 min-h-[48px] rounded-xl bg-white/5 border border-white/10 text-gray-400 active:bg-white/10 transition-all flex items-center justify-center">
          <span className="material-symbols-outlined text-xl">restart_alt</span>
        </button>
      </div>
    </div>
  );
}

export function MobilePage() {
  usePageTitle('ToolOptimizer CNC Mobile');
  useEffect(() => {
    document.body.classList.add('mobile-active');
    return () => { document.body.classList.remove('mobile-active'); };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <SeoHead title="ToolOptimizer CNC Mobile" />
      <MobileHeader />
      <MobileStickyActions />
      <main className="flex-1 flex flex-col gap-6 py-4 pb-8">
        <MobileResultsSection />
        <MobileConfigSection />
        <MobileFineTuneSection />
      </main>
      <Disclaimer />
    </div>
  );
}
