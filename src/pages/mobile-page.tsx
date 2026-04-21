import { useEffect, useState, useRef } from 'react';
import { useMachiningStore } from '@/store';
import { MobileHeader } from '@/components/mobile/mobile-header';
import { MobileConfigSection } from '@/components/mobile/mobile-config-section';
import { MobileResultsSection } from '@/components/mobile/mobile-results-section';
import { MobileAdjustSection } from '@/components/mobile/mobile-adjust-section';
import { MobileSimulateButton } from '@/components/mobile/mobile-simulate-button';
import { MobileTabBar, type Tab } from '@/components/mobile/mobile-tab-bar';
import { Disclaimer } from '@/components/disclaimer';
import { usePageTitle } from '@/hooks/use-page-title';
import { SeoHead } from '@/components/seo-head';

export function MobilePage() {
  usePageTitle('ToolOptimizer CNC Mobile');

  const [activeTab, setActiveTab] = useState<Tab>('config');
  const [hasNewResult, setHasNewResult] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Detect new simulation by watching resultado timestamp in store
  const resultado = useMachiningStore((s) => s.resultado);
  const prevResultadoRef = useRef(resultado);

  useEffect(() => {
    document.body.classList.add('mobile-active');
    return () => { document.body.classList.remove('mobile-active'); };
  }, []);

  // Auto-switch to Resultados when a new simulation completes
  useEffect(() => {
    if (resultado !== null && resultado !== prevResultadoRef.current) {
      prevResultadoRef.current = resultado;
      setHasNewResult(true);
      setActiveTab('results');
    }
    if (resultado === null) {
      prevResultadoRef.current = null;
    }
  }, [resultado]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'results') setHasNewResult(false);
  };

  return (
    <div className="flex flex-col bg-background-dark overflow-hidden" style={{ height: '100dvh', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-56 h-56 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-48 h-48 rounded-full bg-cyan-400/3 blur-3xl" />
      </div>

      <SeoHead title="ToolOptimizer CNC Mobile" />

      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-seg-amarelo/20 border-b border-seg-amarelo/30 px-4 py-1.5 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
          <span className="material-symbols-outlined text-seg-amarelo text-sm">cloud_off</span>
          <span className="text-[10px] font-bold text-seg-amarelo uppercase tracking-widest">Modo Offline Ativo</span>
        </div>
      )}

      {/* ─── Header (sticky top) ─── */}
      <MobileHeader />

      {/* ─── Tab content (flex-1, scrollable) ─── */}
      <main className="flex-1 overflow-y-auto">
        <div key={activeTab} style={{ animation: 'tabSlideIn 0.15s ease-out' }}>
          {activeTab === 'config'  && <MobileConfigSection />}
          {activeTab === 'results' && <MobileResultsSection />}
          {activeTab === 'adjust'  && <MobileAdjustSection />}
        </div>
      </main>

      {/* ─── Bottom: Simulate button + Disclaimer (config tab only) + Tab bar ─── */}
      <div className="shrink-0">
        {activeTab === 'config' && <Disclaimer />}
        <MobileSimulateButton onSimulationStart={() => setHasNewResult(false)} />
        <MobileTabBar active={activeTab} onChange={handleTabChange} hasNewResult={hasNewResult} />
      </div>
    </div>
  );
}
