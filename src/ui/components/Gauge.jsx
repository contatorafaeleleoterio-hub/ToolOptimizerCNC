import React, { useEffect, useState, useRef } from 'react';

/**
 * Gauge Component - Indicadores de Performance
 * Tool Life, Efficiency, Spindle Load
 * Com animação suave e visual melhorado
 */
function Gauge({
  title,
  value,
  max,
  unit = '',
  idealMin = 0,
  idealMax = max,
  invertColors = false
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const animationRef = useRef(null);
  const prevValueRef = useRef(0);

  // Animar valor e barra
  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = startValue + (endValue - startValue) * easeProgress;
      setDisplayValue(Math.round(currentValue));
      setAnimatedWidth(Math.min(100, (currentValue / max) * 100));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    prevValueRef.current = value;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, max]);

  // Determinar status baseado no valor
  const getStatus = () => {
    if (invertColors) {
      if (value > idealMax) return 'danger';
      if (value >= idealMin) return 'ok';
      return 'warning';
    } else {
      if (value >= idealMin && value <= idealMax) return 'ok';
      if (value < idealMin) return 'warning';
      return 'danger';
    }
  };

  const status = getStatus();

  // Calcular posição da zona ideal na barra
  const idealStartPercent = (idealMin / max) * 100;
  const idealWidthPercent = ((idealMax - idealMin) / max) * 100;

  const statusLabels = {
    ok: 'Ideal',
    warning: 'Atenção',
    danger: 'Crítico'
  };

  return (
    <article
      className="gauge-card"
      role="meter"
      aria-valuenow={displayValue}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`${title}: ${displayValue}${unit}`}
    >
      <h3 className="gauge-title">{title}</h3>

      <div className={`gauge-value ${status}`}>
        {displayValue.toLocaleString('pt-BR')}
        {unit && <span className="unit">{unit}</span>}
      </div>

      <div className="gauge-bar" aria-hidden="true">
        <div
          className="gauge-ideal-zone"
          style={{
            left: `${idealStartPercent}%`,
            width: `${idealWidthPercent}%`
          }}
        />
        <div
          className={`gauge-fill ${status}`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>

      <div className="gauge-labels" aria-hidden="true">
        <span>0</span>
        <span className="ideal">{idealMin}-{idealMax}</span>
        <span>{max}</span>
      </div>

      <div
        className={`gauge-status ${status}`}
        role="status"
        aria-live="polite"
      >
        {statusLabels[status]}
      </div>
    </article>
  );
}

export default Gauge;
