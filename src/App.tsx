import { ConfigPanel } from './components/config-panel';
import { ResultsPanel } from './components/results-panel';
import { FineTunePanel } from './components/fine-tune-panel';
import { ExportButtons } from './components/export-buttons';
import { Disclaimer } from './components/disclaimer';

export default function App() {
  return (
    <div className="flex flex-col h-screen max-w-[1500px] mx-auto p-4 md:p-6 gap-6 relative">
      {/* Background gradient orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] opacity-40" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between py-4 px-6 rounded-2xl bg-surface-dark backdrop-blur-xl border border-white/5 shadow-glass">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-4xl drop-shadow-[0_0_12px_rgba(0,217,255,0.8)]">
            precision_manufacturing
          </span>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            ToolOptimizer<span className="font-light text-primary">CNC</span>
          </h1>
        </div>
        <ExportButtons />
      </header>

      {/* 3-column grid */}
      <main className="flex-1 grid grid-cols-12 gap-6 min-h-0">
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
