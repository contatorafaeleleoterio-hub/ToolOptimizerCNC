import React, { useEffect, useCallback } from 'react';
import useCalculatorStore from './store/useCalculatorStore';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ResultsCenter from './components/ResultsCenter';
import PanelImpactos from './components/PanelImpactos';

/**
 * App Principal - Layout 3 Colunas
 * Conforme UI-SPEC.md: Sidebar (360px) + Center (1fr) + Panel (300px)
 */
function App() {
  const isPanelCollapsed = useCalculatorStore((state) => state.isPanelCollapsed);
  const recalculate = useCalculatorStore((state) => state.recalculate);
  const adjustRpmByPercent = useCalculatorStore((state) => state.adjustRpmByPercent);
  const adjustFeedByPercent = useCalculatorStore((state) => state.adjustFeedByPercent);
  const resetRpmAdjustment = useCalculatorStore((state) => state.resetRpmAdjustment);
  const resetFeedAdjustment = useCalculatorStore((state) => state.resetFeedAdjustment);

  // Calcular na inicialização
  useEffect(() => {
    recalculate();
  }, [recalculate]);

  // Atalhos de teclado para ajustes rápidos
  const handleKeyDown = useCallback((event) => {
    // Ignorar se estiver em um input
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
      return;
    }

    // Ajustes de RPM
    if (event.key === 'ArrowUp' && event.shiftKey) {
      event.preventDefault();
      adjustRpmByPercent(5);
    } else if (event.key === 'ArrowDown' && event.shiftKey) {
      event.preventDefault();
      adjustRpmByPercent(-5);
    }

    // Ajustes de Feed
    else if (event.key === 'ArrowUp' && event.ctrlKey) {
      event.preventDefault();
      adjustFeedByPercent(5);
    } else if (event.key === 'ArrowDown' && event.ctrlKey) {
      event.preventDefault();
      adjustFeedByPercent(-5);
    }

    // Reset com R
    else if (event.key === 'r' && event.shiftKey) {
      event.preventDefault();
      resetRpmAdjustment();
    } else if (event.key === 'f' && event.shiftKey) {
      event.preventDefault();
      resetFeedAdjustment();
    }

    // Recalcular com Enter
    else if (event.key === 'Enter') {
      event.preventDefault();
      recalculate();
    }
  }, [adjustRpmByPercent, adjustFeedByPercent, resetRpmAdjustment, resetFeedAdjustment, recalculate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header - 60px */}
      <Header />

      {/* Dashboard Container - 3 Colunas */}
      <div className={`dashboard-container ${isPanelCollapsed ? 'panel-collapsed' : ''}`}>
        {/* Coluna 1: Sidebar Configurações (360px) */}
        <Sidebar />

        {/* Coluna 2: Resultados Central (1fr) */}
        <ResultsCenter />

        {/* Coluna 3: Painel Impactos (300px / 20px colapsado) */}
        <PanelImpactos />
      </div>
    </div>
  );
}

export default App;
