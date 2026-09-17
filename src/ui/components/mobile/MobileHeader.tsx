import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import BrandLogo from '../BrandLogo';

interface MobileHeaderProps {
  onOpenSettings: () => void;
}

export default function MobileHeader({ onOpenSettings }: MobileHeaderProps) {
  const { selectedMaterial, selectedTool, selectedSubstrate, safetyMargin } = useCalculator();

  const [theme, setTheme] = React.useState<'claro' | 'escuro'>('escuro');

  React.useEffect(() => {
    const saved = (localStorage.getItem('to_theme') as 'claro' | 'escuro') || 'escuro';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    document.body.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'claro' ? 'escuro' : 'claro';
    setTheme(next);
    localStorage.setItem('to_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    document.body.setAttribute('data-theme', next);
  };

  return (
    <header className="mobile-header" aria-label="Cabeçalho Móvel ToolOptimizer CNC">
      <div className="mobile-header-main">
        <BrandLogo compact />

        <div className="mobile-header-status" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {safetyMargin !== 100 && (
            <span className="mobile-badge-margin" title={`Margem ativa: ${safetyMargin}%`}>
              Margem {safetyMargin}%
            </span>
          )}

          <button
            type="button"
            className="mobile-btn-settings"
            onClick={toggleTheme}
            aria-label="Alternar Tema Claro / Escuro"
            title={theme === 'claro' ? 'Mudar para Tema Escuro (Titanium)' : 'Mudar para Tema Claro'}
            style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'claro' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="mobile-btn-settings"
            id="btn-nav-configuracoes-mobile"
            onClick={onOpenSettings}
            aria-label="Abrir Configurações"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 2.4a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L3 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1L9.5 21h5l.3-2.4a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chip de resumo de contexto ativo */}
      <div className="mobile-context-bar">
        <span className="mobile-context-chip">
          <span className="mobile-context-label">Material:</span>
          <strong className="mobile-context-value">
            {selectedMaterial ? `${selectedMaterial.name} (${selectedMaterial.isoClass})` : 'Nenhum'}
          </strong>
        </span>
        <span className="mobile-context-sep" aria-hidden="true">·</span>
        <span className="mobile-context-chip">
          <span className="mobile-context-label">Ferramenta:</span>
          <strong className="mobile-context-value">
            {selectedTool ? `${selectedTool.name} · ${selectedSubstrate}` : 'Nenhuma'}
          </strong>
        </span>
      </div>
    </header>
  );
}
