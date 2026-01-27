import React, { useEffect, useCallback } from 'react';
import useCalculatorStore from './store/useCalculatorStore';
import DashboardLayout from './components/layout/DashboardLayout';
import ResultCard from './components/cards/ResultCard';
import ParametersCard from './components/cards/ParametersCard';
import ToolCard from './components/cards/ToolCard';
import MachineCard from './components/cards/MachineCard';
import WarningsCard from './components/cards/WarningsCard';

/**
 * App Principal - Dashboard CNC
 * Layout responsivo: Mobile (coluna única) | Desktop (grid 3 colunas)
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
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
      return;
    }

    if (event.key === 'ArrowUp' && event.shiftKey) {
      event.preventDefault();
      adjustRpmByPercent(5);
    } else if (event.key === 'ArrowDown' && event.shiftKey) {
      event.preventDefault();
      adjustRpmByPercent(-5);
    } else if (event.key === 'ArrowUp' && event.ctrlKey) {
      event.preventDefault();
      adjustFeedByPercent(5);
    } else if (event.key === 'ArrowDown' && event.ctrlKey) {
      event.preventDefault();
      adjustFeedByPercent(-5);
    } else if (event.key === 'r' && event.shiftKey) {
      event.preventDefault();
      resetRpmAdjustment();
    } else if (event.key === 'f' && event.shiftKey) {
      event.preventDefault();
      resetFeedAdjustment();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      recalculate();
    }
  }, [adjustRpmByPercent, adjustFeedByPercent, resetRpmAdjustment, resetFeedAdjustment, recalculate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <DashboardLayout>
      {/* Card Resultado - Primeiro no mobile (destaque máximo) */}
      <ResultCard />

      {/* Card Parâmetros */}
      <ParametersCard />

      {/* Card Ferramenta */}
      <ToolCard />

      {/* Card Máquina */}
      <MachineCard />

      {/* Card Avisos */}
      <WarningsCard />
    </DashboardLayout>
  );
}

export default App;
