import React from 'react';
import ResultCard from '../cards/ResultCard';
import ParametersCard from '../cards/ParametersCard';
import ToolCard from '../cards/ToolCard';
import MachineCard from '../cards/MachineCard';
import WarningsCard from '../cards/WarningsCard';

/**
 * MobileDashboard - Layout específico para mobile
 * Coluna única com cards empilhados
 * Card Resultado primeiro (destaque máximo)
 */
function MobileDashboard() {
  return (
    <div className="mobile-dashboard">
      {/* Header Mobile */}
      <header className="mobile-header">
        <h1 className="mobile-header-title">ToolOptimizer CNC</h1>
        <div className="mobile-header-status">
          <div className="status-dot-online"></div>
          <span>v2.0</span>
        </div>
      </header>

      {/* Conteúdo Mobile */}
      <main className="mobile-main">
        {/* Card Resultado - Primeiro e com maior destaque */}
        <ResultCard />

        {/* Card Parâmetros */}
        <ParametersCard />

        {/* Card Ferramenta */}
        <ToolCard />

        {/* Card Máquina */}
        <MachineCard />

        {/* Card Avisos */}
        <WarningsCard />
      </main>
    </div>
  );
}

export default MobileDashboard;
