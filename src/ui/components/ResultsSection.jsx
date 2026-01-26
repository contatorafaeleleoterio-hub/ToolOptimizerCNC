import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';
import Gauge from './Gauge';

/**
 * ResultsSection - Área central de resultados
 * Exibe RPM, Feed, valores secundários e gauges
 */
function ResultsSection() {
  const store = useCalculatorStore();
  const { results, validation } = store;

  if (!results) {
    return (
      <section className="results-section" aria-label="Resultados">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="text-4xl mb-4 opacity-30" aria-hidden="true">⚙️</div>
            <p className="text-text-muted">Calculando parâmetros...</p>
          </div>
        </div>
      </section>
    );
  }

  // Determinar status visual baseado na validação
  const getStatus = (field) => {
    if (!validation) return '';
    const fieldIssue = validation.issues.find(i => i.field === field);
    if (fieldIssue?.type === 'error') return 'danger';
    if (fieldIssue?.type === 'warning') return 'warning';
    return '';
  };

  return (
    <section className="results-section" aria-label="Resultados de usinagem">
      {/* Validação Banner */}
      {validation && validation.issues.length > 0 && (
        <div
          className={`validation-banner ${validation.status}`}
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">
            {validation.status === 'ok' && '✓'}
            {validation.status === 'warning' && '⚠️'}
            {validation.status === 'danger' && '🚫'}
          </span>
          <span>{validation.issues[0]?.message || 'Parâmetros validados'}</span>
        </div>
      )}

      {/* RPM Card */}
      <ResultCard
        title="Rotação (RPM)"
        icon="🔄"
        formula="n = (Vc × 1000) ÷ (π × D)"
        value={results.rpm}
        status={getStatus('rpm')}
        adjustment={store.rpmAdjustment}
        baseValue={results.baseRpm}
        onAdjustmentChange={(val) => store.setRpmAdjustment(val)}
        onQuickAdjust={(percent) => store.adjustRpmByPercent(percent)}
        onReset={() => store.resetRpmAdjustment()}
      />

      {/* Feed Rate Card */}
      <ResultCard
        title="Avanço (F)"
        icon="➡️"
        formula="F = n × Z × fz"
        value={results.feedRate}
        unit="mm/min"
        status={getStatus('feedRate')}
        adjustment={store.feedAdjustment}
        baseValue={results.baseFeedRate}
        onAdjustmentChange={(val) => store.setFeedAdjustment(val)}
        onQuickAdjust={(percent) => store.adjustFeedByPercent(percent)}
        onReset={() => store.resetFeedAdjustment()}
      />

      {/* Valores Secundários */}
      <div className="secondary-results">
        <SecondaryItem label="fz Efetivo" value={`${results.effectiveFz.toFixed(3)} mm`} />
        <SecondaryItem label="Vc Efetiva" value={`${results.effectiveVc.toFixed(1)} m/min`} />
        <SecondaryItem label="L/D Ratio" value={results.ldRatio.toFixed(2)} />
        <SecondaryItem label="MRR" value={`${results.mrr.toFixed(2)} cm³/min`} />
        <SecondaryItem label="Potência" value={`${results.power.toFixed(2)} kW`} />
        <SecondaryItem label="Torque" value={`${results.torque.toFixed(2)} Nm`} />
      </div>

      {/* Chip Thinning Info */}
      {results.chipThinning?.chipThinningApplied && (
        <div className="validation-banner warning" role="status">
          <span aria-hidden="true">💡</span>
          <span>
            Chip Thinning aplicado (fator: {results.chipThinning.correctionFactor}x)
            {results.chipThinning.warning && ` - ${results.chipThinning.warning}`}
          </span>
        </div>
      )}

      {/* Gauges */}
      <div className="gauges-grid">
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
    </section>
  );
}

/**
 * ResultCard - Card principal de resultado (RPM ou Feed)
 */
function ResultCard({
  title,
  icon,
  formula,
  value,
  unit,
  status,
  adjustment,
  baseValue,
  onAdjustmentChange,
  onQuickAdjust,
  onReset
}) {
  const statusClass = status ? status : '';

  return (
    <article className="result-card">
      <header className="result-card-header">
        <span className="result-card-title">
          <span aria-hidden="true">{icon}</span> {title}
        </span>
        <code className="result-card-formula">{formula}</code>
      </header>

      <div className={`result-value ${statusClass}`}>
        {value.toLocaleString('pt-BR')}
        {unit && <span className="unit">{unit}</span>}
      </div>

      <div className="adjustment-section">
        <div className="adjustment-labels" aria-hidden="true">
          <span>-50%</span>
          <span>-30%</span>
          <span>-10%</span>
          <span className="center">0%</span>
          <span>+10%</span>
          <span>+30%</span>
          <span>+50%</span>
        </div>

        <div className="slider-track">
          <input
            type="range"
            className="slider-input"
            value={adjustment}
            onChange={(e) => onAdjustmentChange(parseFloat(e.target.value))}
            min={-50}
            max={50}
            step={5}
            aria-label={`Ajuste de ${title}`}
            aria-valuenow={adjustment}
            aria-valuemin={-50}
            aria-valuemax={50}
          />
        </div>

        <div className="adjustment-value">
          Ajuste: {adjustment > 0 ? '+' : ''}{adjustment}%
          {adjustment !== 0 && (
            <span className="base">(Base: {baseValue.toLocaleString('pt-BR')})</span>
          )}
        </div>

        <div className="adjustment-buttons">
          <button
            className="adjustment-btn negative"
            onClick={() => onQuickAdjust(-10)}
            aria-label="Reduzir 10%"
          >
            -10%
          </button>
          <button
            className="adjustment-btn negative"
            onClick={() => onQuickAdjust(-5)}
            aria-label="Reduzir 5%"
          >
            -5%
          </button>
          <button
            className="adjustment-btn"
            onClick={onReset}
            aria-label="Resetar ajuste"
          >
            Reset
          </button>
          <button
            className="adjustment-btn positive"
            onClick={() => onQuickAdjust(5)}
            aria-label="Aumentar 5%"
          >
            +5%
          </button>
          <button
            className="adjustment-btn positive"
            onClick={() => onQuickAdjust(10)}
            aria-label="Aumentar 10%"
          >
            +10%
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * SecondaryItem - Item de resultado secundário
 */
function SecondaryItem({ label, value }) {
  return (
    <div className="secondary-item">
      <div className="secondary-label">{label}</div>
      <div className="secondary-value">{value}</div>
    </div>
  );
}

export default ResultsSection;
