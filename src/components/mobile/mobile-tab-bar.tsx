type Tab = 'config' | 'results' | 'adjust';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'config',  label: 'Configurar', icon: 'settings'   },
  { id: 'results', label: 'Resultados', icon: 'bar_chart'   },
  { id: 'adjust',  label: 'Ajustar',    icon: 'tune'        },
];

interface MobileTabBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  hasNewResult?: boolean;
}

export function MobileTabBar({ active, onChange, hasNewResult = false }: MobileTabBarProps) {
  return (
    <nav
      className="flex bg-[rgba(10,14,20,0.97)] border-t border-white/8 backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      role="tablist"
      aria-label="Navegação principal"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-3 min-h-[56px] transition-all active:scale-95"
          >
            <div className="relative">
              <span
                className="material-symbols-outlined text-xl transition-all"
                style={{
                  color: isActive ? '#00D9FF' : 'rgba(255,255,255,0.35)',
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(0,217,255,0.5))' : undefined,
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 300",
                }}
              >
                {tab.icon}
              </span>
              {/* New result badge — shown on Resultados tab when user is elsewhere */}
              {tab.id === 'results' && hasNewResult && !isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
            <span
              className="text-[9px] uppercase tracking-widest font-semibold transition-colors"
              style={{ color: isActive ? '#00D9FF' : 'rgba(255,255,255,0.3)' }}
            >
              {tab.label}
            </span>
            {/* Active indicator line */}
            {isActive && (
              <span
                className="absolute top-0 left-1/2 h-[2px] w-8 rounded-full"
                style={{
                  background: '#00D9FF',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 8px rgba(0,217,255,0.6)',
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export type { Tab };
