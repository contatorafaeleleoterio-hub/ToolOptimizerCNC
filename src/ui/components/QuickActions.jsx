import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

/**
 * QuickActions - Barra de ações rápidas
 * Sticky no mobile, fixa no desktop
 */
function QuickActions() {
  const recalculate = useCalculatorStore((state) => state.recalculate);
  const reset = useCalculatorStore((state) => state.reset);

  return (
    <div className="quick-actions">
      <button
        className="btn-primary"
        onClick={recalculate}
        aria-label="Simular parâmetros de usinagem"
      >
        Simular Parâmetros
      </button>
      <button
        className="btn-icon"
        onClick={reset}
        title="Limpar todos os valores"
        aria-label="Limpar todos os valores"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      </button>
    </div>
  );
}

export default QuickActions;
