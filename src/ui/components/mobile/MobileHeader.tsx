import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';

interface MobileHeaderProps {
  onOpenSettings: () => void;
}

export default function MobileHeader({ onOpenSettings }: MobileHeaderProps) {
  const { selectedMaterial, selectedTool, selectedSubstrate, safetyMargin } = useCalculator();

  return (
    <header className="mobile-header" aria-label="Cabeçalho Móvel ToolOptimizer CNC">
      <div className="mobile-header-main">
        <div className="mobile-brand-plate" role="img" aria-label="Marca ToolOptimizer CNC">
          TOOLOPTIMIZER
        </div>

        <div className="mobile-header-status">
          {safetyMargin !== 100 && (
            <span className="mobile-badge-margin" title={`Margem ativa: ${safetyMargin}%`}>
              Margem {safetyMargin}%
            </span>
          )}

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
