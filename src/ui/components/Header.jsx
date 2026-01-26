import React from 'react';

/**
 * Header - 60px
 * Background: linear-gradient(90deg, #1e3a5f 0%, #2c5282 100%)
 * Border-bottom: 2px solid primary blue
 */
function Header() {
  return (
    <header className="header">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="header-title">ToolOptimizer CNC</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm text-text-secondary">v2.0</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
