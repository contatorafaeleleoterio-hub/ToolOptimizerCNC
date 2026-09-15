import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';

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
        <div className="mobile-brand-plate" role="img" aria-label="Marca ToolOptimizer CNC" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <svg width="18" height="18" viewBox="0 0 500 500" style={{ flexShrink: 0 }}>
            <path d="M 70 340 A 180 180 0 0 1 116 220 L 179 276 A 95 95 0 0 0 155 340 Z" fill="#16202C" stroke="#19E4BB" strokeWidth="8"/>
            <path d="M 125 210 A 180 180 0 0 1 370 206 L 314 269 A 95 95 0 0 0 184 272 Z" fill="#0E7C69" stroke="#19E4BB" strokeWidth="8"/>
            <path d="M 379 215 A 180 180 0 0 1 430 340 L 345 340 A 95 95 0 0 0 318 274 Z" fill="#19E4BB" stroke="#19E4BB" strokeWidth="8"/>
            <path d="M 115 450 L 210 270 L 248 305 L 345 170 L 330 155 L 410 95 L 385 195 L 368 188 L 262 335 L 222 298 Z" fill="#BDFF4B" stroke="#E4FF94" strokeWidth="6"/>
          </svg>
          <span>TOOLOPTIMIZER</span>
        </div>

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
            title="Alternar Tema"
            style={{ fontSize: '14px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'claro' ? '☀️' : '🌙'}
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
