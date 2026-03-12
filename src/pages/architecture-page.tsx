import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArchitectureMap } from '@/components/architecture/architecture-map';
import { MobileArchitectureView } from '@/components/architecture/mobile-architecture-view';
import { SeoHead } from '@/components/seo-head';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { usePageTitle } from '@/hooks/use-page-title';

const LEVEL_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Visao Geral',
  2: 'Modulos',
  3: 'Fluxo de Dados',
};

export default function ArchitecturePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [level, setLevel] = useState<1 | 2 | 3>(1);

  usePageTitle('Arquitetura - ToolOptimizer CNC');

  // Mobile: apply body class for proper scrolling (same pattern as MobilePage)
  useEffect(() => {
    if (!isMobile) return;
    document.body.classList.add('mobile-active');
    return () => {
      document.body.classList.remove('mobile-active');
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <>
        <SeoHead title="Arquitetura - ToolOptimizer CNC" />
        <MobileArchitectureView onBack={() => navigate('/mobile')} />
      </>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-background-dark p-3 sm:p-6">
      <SeoHead title="Arquitetura - ToolOptimizer CNC" />

      <header className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-surface-dark px-4 py-3 shadow-glass backdrop-blur-xl">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="min-h-[44px] shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/10 hover:text-white"
        >
          Voltar
        </button>

        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="material-symbols-outlined text-primary">account_tree</span>
            Arquitetura do Sistema
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Mapa interativo do codigo fonte com niveis de zoom, grupos e fluxo do calculo.
          </p>
        </div>

        <div className="ml-auto flex flex-wrap gap-2">
          {([1, 2, 3] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setLevel(value)}
              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                level === value
                  ? 'border-primary/40 bg-primary/15 text-primary'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {LEVEL_LABELS[value]}
            </button>
          ))}
        </div>
      </header>

      <ArchitectureMap level={level} onLevelChange={setLevel} />
    </div>
  );
}
