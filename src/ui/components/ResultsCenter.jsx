import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';
import Gauge from './Gauge';

/**
 * ResultsCenter - Zona Central de Resultados (1fr)
 * RPM e F com destaque máximo + Sliders de ajuste ±50%
 * Gauges de performance
 */
function ResultsCenter() {
  const store = useCalculatorStore();
  const { results, validation } = store;

  if (!results) {
    return (
      <main className="results-center flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">⚙️</div>
          <p className="text-text-muted">Calculando parâmetros...</p>
        </div>
      </main>
    );
  }

  // Determinar status visual baseado na validação
  const getStatus = (value, field) => {
    if (!validation) return '';
    const fieldIssue = validation.issues.find(i => i.field === field);
    if (fieldIssue?.type === 'error') return 'status-danger';
    if (fieldIssue?.type === 'warning') return 'status-warning';
    return '';
  };

  return (
    <main className="results-center">
      {/* Validação Banner */}
      {validation && validation.issues.length > 0 && (
        <div className={`validation-banner ${validation.status}`}>
          <span className="validation-icon">
            {validation.status === 'ok' && '✓'}
            {validation.status === 'warning' && '⚠️'}
            {validation.status === 'danger' && '🚫'}
          </span>
          <span className="validation-message">
            {validation.issues[0]?.message || 'Parâmetros validados'}
          </span>
        </div>
      )}

      {/* RPM - Destaque Máximo */}
      <div className="result-main">
        <div className="result-main-header">
          <span className="result-main-title">🔄 Rotação (RPM)</span>
          <span className="result-main-formula">n = (Vc × 1000) ÷ (π × D)</span>
        </div>

        <div className={`result-main-value ${getStatus(results.rpm, 'rpm')}`}>
          {results.rpm.toLocaleString('pt-BR')}
        </div>

        {/* Slider de ajuste percentual */}
        <div className="adjustment-slider">
          <div className="adjustment-markers">
            <span>-50%</span>
            <span>-30%</span>
            <span>-10%</span>
            <span className="center">0%</span>
            <span>+10%</span>
            <span>+30%</span>
            <span>+50%</span>
          </div>
          <div className="slider-container">
            <div className="slider-track"></div>
            <input
              type="range"
              className="slider-input"
              value={store.rpmAdjustment}
              onChange={(e) => store.setRpmAdjustment(parseFloat(e.target.value))}
              min={-50}
              max={50}
              step={5}
            />
          </div>
          <div className="text-center text-sm text-text-muted mt-2">
            Ajuste: {store.rpmAdjustment > 0 ? '+' : ''}{store.rpmAdjustment}%
            {store.rpmAdjustment !== 0 && (
              <span className="ml-2 text-text-secondary">
                (Base: {results.baseRpm.toLocaleString('pt-BR')})
              </span>
            )}
          </div>
          {/* Botões de ajuste rápido */}
          <div className="adjustment-buttons">
            <button
              className="adjustment-btn negative"
              onClick={() => store.adjustRpmByPercent(-10)}
            >
              -10%
            </button>
            <button
              className="adjustment-btn negative"
              onClick={() => store.adjustRpmByPercent(-5)}
            >
              -5%
            </button>
            <button
              className="adjustment-btn"
              onClick={() => store.resetRpmAdjustment()}
            >
              Reset
            </button>
            <button
              className="adjustment-btn positive"
              onClick={() => store.adjustRpmByPercent(5)}
            >
              +5%
            </button>
            <button
              className="adjustment-btn positive"
              onClick={() => store.adjustRpmByPercent(10)}
            >
              +10%
            </button>
          </div>
        </div>
      </div>

      {/* Feed Rate - Destaque Máximo */}
      <div className="result-main">
        <div className="result-main-header">
          <span className="result-main-title">➡️ Avanço (F)</span>
          <span className="result-main-formula">F = n × Z × fz</span>
        </div>

        <div className={`result-main-value ${getStatus(results.feedRate, 'feedRate')}`}>
          {results.feedRate.toLocaleString('pt-BR')} <span className="text-lg">mm/min</span>
        </div>

        {/* Slider de ajuste percentual */}
        <div className="adjustment-slider">
          <div className="adjustment-markers">
            <span>-50%</span>
            <span>-30%</span>
            <span>-10%</span>
            <span className="center">0%</span>
            <span>+10%</span>
            <span>+30%</span>
            <span>+50%</span>
          </div>
          <div className="slider-container">
            <div className="slider-track"></div>
            <input
              type="range"
              className="slider-input"
              value={store.feedAdjustment}
              onChange={(e) => store.setFeedAdjustment(parseFloat(e.target.value))}
              min={-50}
              max={50}
              step={5}
            />
          </div>
          <div className="text-center text-sm text-text-muted mt-2">
            Ajuste: {store.feedAdjustment > 0 ? '+' : ''}{store.feedAdjustment}%
            {store.feedAdjustment !== 0 && (
              <span className="ml-2 text-text-secondary">
                (Base: {results.baseFeedRate.toLocaleString('pt-BR')})
              </span>
            )}
          </div>
          {/* Botões de ajuste rápido */}
          <div className="adjustment-buttons">
            <button
              className="adjustment-btn negative"
              onClick={() => store.adjustFeedByPercent(-10)}
            >
              -10%
            </button>
            <button
              className="adjustment-btn negative"
              onClick={() => store.adjustFeedByPercent(-5)}
            >
              -5%
            </button>
            <button
              className="adjustment-btn"
              onClick={() => store.resetFeedAdjustment()}
            >
              Reset
            </button>
            <button
              className="adjustment-btn positive"
              onClick={() => store.adjustFeedByPercent(5)}
            >
              +5%
            </button>
            <button
              className="adjustment-btn positive"
              onClick={() => store.adjustFeedByPercent(10)}
            >
              +10%
            </button>
          </div>
        </div>
      </div>

      {/* Valores Secundários */}
      <div className="result-secondary">
        <div className="result-secondary-grid">
          <div>
            <div className="result-secondary-label">fz Efetivo</div>
            <div className="result-secondary-value">{results.effectiveFz.toFixed(3)} mm</div>
          </div>
          <div>
            <div className="result-secondary-label">Vc Efetiva</div>
            <div className="result-secondary-value">{results.effectiveVc.toFixed(1)} m/min</div>
          </div>
          <div>
            <div className="result-secondary-label">L/D Ratio</div>
            <div className="result-secondary-value">{results.ldRatio.toFixed(2)}</div>
          </div>
          <div>
            <div className="result-secondary-label">MRR</div>
            <div className="result-secondary-value">{results.mrr.toFixed(2)} cm³/min</div>
          </div>
          <div>
            <div className="result-secondary-label">Potência</div>
            <div className="result-secondary-value">{results.power.toFixed(2)} kW</div>
          </div>
          <div>
            <div className="result-secondary-label">Torque</div>
            <div className="result-secondary-value">{results.torque.toFixed(2)} Nm</div>
          </div>
        </div>
      </div>

      {/* Chip Thinning Info */}
      {results.chipThinning?.chipThinningApplied && (
        <div className="validation-banner warning">
          <span className="validation-icon">💡</span>
          <span className="validation-message">
            Chip Thinning aplicado (fator: {results.chipThinning.correctionFactor}x)
            {results.chipThinning.warning && ` - ${results.chipThinning.warning}`}
          </span>
        </div>
      )}

      {/* GAUGES - Indicadores de Performance */}
      <div className="gauges-container">
        <Gauge
          title="Tool Life Remaining"
          value={results.metrics?.toolLifeRemaining || 0}
          max={1000}
          unit="hours"
          idealMin={300}
          idealMax={700}
        />
        <Gauge
          title="Efficiency Rate"
          value={results.metrics?.efficiencyRate || 0}
          max={100}
          unit="%"
          idealMin={85}
          idealMax={95}
        />
        <Gauge
          title="Spindle Load"
          value={results.metrics?.spindleLoad || 0}
          max={100}
          unit="%"
          idealMin={50}
          idealMax={80}
          invertColors={true}
        />
      </div>
    </main>
  );
}

export default ResultsCenter;
