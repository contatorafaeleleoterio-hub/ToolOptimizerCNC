import React, { useEffect, useCallback } from 'react';
import useCalculatorStore from './store/useCalculatorStore';
import Header from './components/Header';
import QuickActions from './components/QuickActions';
import ResultsSection from './components/ResultsSection';
import ConfigSection from './components/ConfigSection';
import ImpactsSection from './components/ImpactsSection';

/**
 * App Principal - Layout Mobile-First Responsivo
 * Mobile: Stack vertical (Results primeiro)
 * Desktop 900px+: 2 colunas
 * Large 1600px+: 3 colunas
 */
function App() {
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
      <Header />
      <div className="app-container">
        <QuickActions />
        <ResultsSection />
        <ConfigSection />
        <ImpactsSection />
      </div>
    </div>
  );
}

export default App;
