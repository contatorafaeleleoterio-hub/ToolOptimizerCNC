import React from 'react';

/**
 * Header - Sticky, responsivo
 * Mobile: compacto | Desktop: expandido
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">ToolOptimizer CNC</h1>
        <div className="header-status">
          <span className="status-indicator" aria-hidden="true" />
          <span className="version-badge">v2.1</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
