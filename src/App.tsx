import logoImg from './assets/logo-tooloptimizer.png';
import { ConfigPanel } from './components/config-panel';
import { ResultsPanel } from './components/results-panel';
import { FineTunePanel } from './components/fine-tune-panel';
import { ExportButtons } from './components/export-buttons';
import { Disclaimer } from './components/disclaimer';
import { SeoHead } from './components/seo-head';
import { usePageTitle } from './hooks/use-page-title';

const BASE_URL = 'https://contatorafaeleleoterio-hub.github.io/ToolOptimizerCNC';

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
        <div className="flex items-center">
          <img src={logoImg} alt="ToolOptimizer CNC" style={{ height: '44px', objectFit: 'contain' }} />
        </div>
        <ExportButtons />
      </header>

      {/* 3-column grid */}
      <main className="flex-1 grid grid-cols-12 gap-3 min-h-0">
        <section className="col-span-3 overflow-y-auto pr-1">
          <ConfigPanel />
        </section>
        <section className="col-span-6 overflow-y-auto pr-2">
          <ResultsPanel />
        </section>
        <section className="col-span-3 h-full">
          <FineTunePanel />
        </section>
      </main>

      <Disclaimer />
    </div>
  );
}
