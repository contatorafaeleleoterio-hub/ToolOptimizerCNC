import React, { useState } from 'react';

/**
 * Tooltip Component - Informações explicativas
 */
function Tooltip({ content, children, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-bg-card border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-bg-card border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-bg-card border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-bg-card border-y-transparent border-l-transparent',
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div className={`tooltip ${positionClasses[position]}`}>
          {content}
          <div className={`tooltip-arrow ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
