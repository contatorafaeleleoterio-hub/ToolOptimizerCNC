import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';

interface MobileStickyBarProps {
  onOpenResults: () => void;
}

function formatInt(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function MobileStickyBar({ onOpenResults }: MobileStickyBarProps) {
  const {
    activeFamily,
    isCalculated,
    canCalculate,
    calculate,
    millingResult,
    drillingResult,
    threadingResult,
    boringResult,
  } = useCalculator();

  const result =
    activeFamily === 'fresar'
      ? millingResult
      : activeFamily === 'furar'
      ? drillingResult
      : activeFamily === 'roscar'
      ? threadingResult
      : boringResult;

  const calculado = isCalculated && result !== null;
  const safetyLevel = calculado ? result.safetyLevel : 'NORMAL';

  let alertBadgeClass = 'normal';
  if (safetyLevel === 'ATENÇÃO') alertBadgeClass = 'warning';
  if (safetyLevel === 'CRÍTICO') alertBadgeClass = 'critical';

  return (
    <aside className="mobile-sticky-bar" aria-label="Barra de Ação e Resultados Móvel">
      {!calculado ? (
        <div className="mobile-sticky-actions">
          <button
            type="button"
            className={`btn-cta ${canCalculate ? '' : 'btn-cta-disabled'}`}
            id="btn-calcular-mobile"
            disabled={!canCalculate}
            onClick={() => {
              calculate();
              // Abre a folha de resultados automaticamente na primeira execução bem sucedida
              onOpenResults();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{canCalculate ? 'Calcular Parâmetros' : 'Preencha os Campos'}</span>
          </button>
        </div>
      ) : (
        <div className="mobile-sticky-summary" onClick={onOpenResults} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenResults(); }}>
          <div className="mobile-sticky-metrics">
            <div className="mobile-sticky-metric">
              <span className="mobile-sticky-lbl">S:</span>
              <span className="mobile-sticky-val">{formatInt(result.n)}</span>
              <span className="mobile-sticky-unit">rpm</span>
            </div>
            <div className="mobile-sticky-sep" aria-hidden="true">|</div>
            <div className="mobile-sticky-metric">
              <span className="mobile-sticky-lbl">F:</span>
              <span className="mobile-sticky-val">{formatInt(result.vf)}</span>
              <span className="mobile-sticky-unit">mm/min</span>
            </div>
            <span className={`chip ${alertBadgeClass}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
              {safetyLevel}
            </span>
          </div>

          <button
            type="button"
            className="mobile-sticky-expand-btn"
            id="btn-ver-resultados-mobile"
            onClick={(e) => {
              e.stopPropagation();
              onOpenResults();
            }}
            aria-label="Ver Diagnóstico e Resultados Completos"
          >
            <span>Detalhes</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      )}
    </aside>
  );
}
