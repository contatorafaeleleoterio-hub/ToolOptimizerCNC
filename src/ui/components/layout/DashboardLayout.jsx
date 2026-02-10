import React from 'react';

/**
 * DashboardLayout - Layout base do dashboard
 * Mobile: coluna única | Desktop: grid 3 colunas
 * Conforme especificação de layout responsivo
 */
function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header simples */}
      <header className="header">
        <div className="flex items-center justify-between w-full">
          <h1 className="header-title">ToolOptimizer CNC</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-text-secondary">v2.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="dashboard-main">
        {/* Mobile: coluna única | Desktop: grid 3 colunas */}
        <div className="dashboard-grid">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
