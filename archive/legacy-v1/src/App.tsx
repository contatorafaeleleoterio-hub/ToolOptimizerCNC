import logoImg from './assets/logo-tooloptimizer.png';
import { ConfigPanel } from './components/config-panel';
import { ResultsPanel } from './components/results-panel';
import { HeaderNav } from './components/header-nav';
import { ExportButtons } from './components/export-buttons';
import { Disclaimer } from './components/disclaimer';
import { SeoHead } from './components/seo-head';
import { usePageTitle } from './hooks/use-page-title';
import { useMachiningStore } from './store';

const BASE_URL = 'https://contatorafaeleleoterio-hub.github.io/ToolOptimizerCNC';

/** ✓1 Material → ✓2 Ferramenta → 3 Simular — Material/Ferramenta sempre completos (defaults sempre válidos); Simular reflete se já rodou uma simulação */
function FlowStep() {
  const hasResult = useMachiningStore((s) => s.resultado !== null);
  const doneDot = 'w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold bg-seg-verde text-[#04140a] shrink-0';
  const pendingDot = 'w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold border border-white/25 text-white/50 shrink-0';
  return (
    <div data-testid="flow-step" className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/45 px-1 py-0.5">
      <span className={doneDot}>✓</span>
      <span>Material</span>
      <span className="opacity-30">→</span>
      <span className={doneDot}>✓</span>
      <span>Ferramenta</span>
      <span className="opacity-30">→</span>
      <span className={hasResult ? doneDot : pendingDot}>{hasResult ? '✓' : '3'}</span>
      <span>Simular</span>
    </div>
  );
}

export default function App() {
  usePageTitle('ToolOptimizer CNC — Calculadora de Parâmetros de Corte');
  return (
    <div className="flex flex-col h-screen mx-auto p-3 gap-3 relative">
      <SeoHead
        title="ToolOptimizer CNC — Calculadora de Parâmetros de Corte"
        url={`${BASE_URL}/`}
      />
      {/* Background gradient orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] opacity-40" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between py-2 px-6 rounded-2xl bg-surface-dark backdrop-blur-xl border border-white/5 shadow-glass">
        <div className="flex items-center gap-6">
          <img src={logoImg} alt="ToolOptimizer CNC" style={{ height: '44px', objectFit: 'contain' }} />
          <HeaderNav />
        </div>
        <ExportButtons />
      </header>

      {/* 2-column grid — config fixo 400px, resultados ocupam o resto */}
      <main className="flex-1 grid grid-cols-[400px_1fr] gap-3 min-h-0">
        <section className="flex flex-col min-h-0 pr-1 gap-2">
          <FlowStep />
          <div className="flex-1 overflow-y-auto">
            <ConfigPanel />
          </div>
        </section>
        <section className="overflow-y-auto pr-2">
          <ResultsPanel />
        </section>
      </main>

      <Disclaimer />
    </div>
  );
}
