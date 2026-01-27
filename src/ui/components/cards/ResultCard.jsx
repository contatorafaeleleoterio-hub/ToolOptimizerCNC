import React from 'react';
import useCalculatorStore from '../../store/useCalculatorStore';

/**
 * ResultCard - Card de Resultado Principal
 * Destaque máximo visual - RPM e Feed Rate
 * Mobile-first: primeiro no layout
 */
function ResultCard() {
  const store = useCalculatorStore();
  const { results, validation } = store;

  if (!results) {
    return (
      <div className="card card-result">
        <div className="card-header">
          <h2 className="card-title">Resultados</h2>
        </div>
        <div className="card-body flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-4xl mb-4 opacity-30">⚙️</div>
            <p className="text-text-muted">Calculando parâmetros...</p>
          </div>
        </div>
      </div>
    );
  }

  // Determinar status visual baseado na validação
  const getStatus = (field) => {
    if (!validation) return '';
    const fieldIssue = validation.issues.find(i => i.field === field);
    if (fieldIssue?.type === 'error') return 'status-danger';
    if (fieldIssue?.type === 'warning') return 'status-warning';
    return '';
  };

  return (
    <div className="card card-result">
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

      {/* RPM - Destaque Principal */}
      <div className="result-block">
        <div className="result-header">
          <span className="result-label">🔄 Rotação (RPM)</span>
          <span className="result-formula">n = (Vc × 1000) ÷ (π × D)</span>
        </div>
        <div className={`result-value-main ${getStatus('rpm')}`}>
          {results.rpm.toLocaleString('pt-BR')}
        </div>

        {/* Controles de ajuste */}
        <div className="result-controls">
          <div className="adjustment-info">
            Ajuste: {store.rpmAdjustment > 0 ? '+' : ''}{store.rpmAdjustment}%
            {store.rpmAdjustment !== 0 && (
              <span className="base-value">
                (Base: {results.baseRpm.toLocaleString('pt-BR')})
              </span>
            )}
          </div>
          <div className="adjustment-buttons">
            <button
              className="adj-btn adj-btn-negative"
              onClick={() => store.adjustRpmByPercent(-10)}
            >
              -10%
            </button>
            <button
              className="adj-btn adj-btn-negative"
              onClick={() => store.adjustRpmByPercent(-5)}
            >
              -5%
            </button>
            <button
              className="adj-btn"
              onClick={() => store.resetRpmAdjustment()}
            >
              Reset
            </button>
            <button
              className="adj-btn adj-btn-positive"
              onClick={() => store.adjustRpmByPercent(5)}
            >
              +5%
            </button>
            <button
              className="adj-btn adj-btn-positive"
              onClick={() => store.adjustRpmByPercent(10)}
            >
              +10%
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="result-divider"></div>

      {/* Feed Rate - Destaque Principal */}
      <div className="result-block">
        <div className="result-header">
          <span className="result-label">➡️ Avanço (F)</span>
          <span className="result-formula">F = n × Z × fz</span>
        </div>
        <div className={`result-value-main ${getStatus('feedRate')}`}>
          {results.feedRate.toLocaleString('pt-BR')}
          <span className="result-unit">mm/min</span>
        </div>

        {/* Controles de ajuste */}
        <div className="result-controls">
          <div className="adjustment-info">
            Ajuste: {store.feedAdjustment > 0 ? '+' : ''}{store.feedAdjustment}%
            {store.feedAdjustment !== 0 && (
              <span className="base-value">
                (Base: {results.baseFeedRate.toLocaleString('pt-BR')})
              </span>
            )}
          </div>
          <div className="adjustment-buttons">
            <button
              className="adj-btn adj-btn-negative"
              onClick={() => store.adjustFeedByPercent(-10)}
            >
              -10%
            </button>
            <button
              className="adj-btn adj-btn-negative"
              onClick={() => store.adjustFeedByPercent(-5)}
            >
              -5%
            </button>
            <button
              className="adj-btn"
              onClick={() => store.resetFeedAdjustment()}
            >
              Reset
            </button>
            <button
              className="adj-btn adj-btn-positive"
              onClick={() => store.adjustFeedByPercent(5)}
            >
              +5%
            </button>
            <button
              className="adj-btn adj-btn-positive"
              onClick={() => store.adjustFeedByPercent(10)}
            >
              +10%
            </button>
          </div>
        </div>
      </div>

      {/* Valores Secundários */}
      <div className="result-secondary-grid">
        <div className="result-secondary-item">
          <span className="secondary-label">fz Efetivo</span>
          <span className="secondary-value">{results.effectiveFz.toFixed(3)} mm</span>
        </div>
        <div className="result-secondary-item">
          <span className="secondary-label">Vc Efetiva</span>
          <span className="secondary-value">{results.effectiveVc.toFixed(1)} m/min</span>
        </div>
        <div className="result-secondary-item">
          <span className="secondary-label">MRR</span>
          <span className="secondary-value">{results.mrr.toFixed(2)} cm³/min</span>
        </div>
        <div className="result-secondary-item">
          <span className="secondary-label">Potência</span>
          <span className="secondary-value">{results.power.toFixed(2)} kW</span>
        </div>
      </div>

      {/* Chip Thinning Info */}
      {results.chipThinning?.chipThinningApplied && (
        <div className="chip-thinning-alert">
          <span>💡</span>
          <span>
            Chip Thinning aplicado (fator: {results.chipThinning.correctionFactor}x)
          </span>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
