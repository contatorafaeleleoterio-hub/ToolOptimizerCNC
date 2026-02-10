import React from 'react';
import useCalculatorStore from '../../store/useCalculatorStore';
import Gauge from '../Gauge';

/**
 * MachineCard - Card de Limites da Máquina e Performance
 * Gauges de performance + limites
 */
function MachineCard() {
  const { results } = useCalculatorStore();

  return (
    <div className="card card-machine">
      <div className="card-header">
        <h2 className="card-title">Performance da Máquina</h2>
      </div>
      <div className="card-body">
        {/* Gauges */}
        {results && (
          <div className="gauges-grid">
            <Gauge
              title="Vida da Ferramenta"
              value={results.metrics?.toolLifeRemaining || 0}
              max={1000}
              unit="hrs"
              idealMin={300}
              idealMax={700}
            />
            <Gauge
              title="Eficiência"
              value={results.metrics?.efficiencyRate || 0}
              max={100}
              unit="%"
              idealMin={85}
              idealMax={95}
            />
            <Gauge
              title="Carga Spindle"
              value={results.metrics?.spindleLoad || 0}
              max={100}
              unit="%"
              idealMin={50}
              idealMax={80}
              invertColors={true}
            />
          </div>
        )}

        {/* Limites da Máquina */}
        <div className="machine-limits">
          <div className="limits-title">Limites da Máquina</div>
          <div className="limits-grid">
            <div className="limit-item">
              <span className="limit-label">RPM Máx</span>
              <span className="limit-value">24.000</span>
            </div>
            <div className="limit-item">
              <span className="limit-label">Potência Máx</span>
              <span className="limit-value">15 kW</span>
            </div>
            <div className="limit-item">
              <span className="limit-label">Feed Máx</span>
              <span className="limit-value">2.000 mm/min</span>
            </div>
            <div className="limit-item">
              <span className="limit-label">L/D Crítico</span>
              <span className="limit-value">&gt; 6</span>
            </div>
          </div>
        </div>

        {/* L/D Ratio Info */}
        {results && (
          <div className="ld-info">
            <span className="ld-label">L/D Atual:</span>
            <span className={`ld-value ${results.ldRatio > 6 ? 'danger' : results.ldRatio > 4 ? 'warning' : 'ok'}`}>
              {results.ldRatio.toFixed(2)}
            </span>
            {results.ldRatio > 4 && (
              <span className="ld-warning">
                {results.ldRatio > 6 ? '⚠️ Crítico - risco de vibração' : '⚡ Atenção'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MachineCard;
