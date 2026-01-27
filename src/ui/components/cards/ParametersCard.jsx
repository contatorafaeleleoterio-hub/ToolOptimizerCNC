import React from 'react';
import useCalculatorStore from '../../store/useCalculatorStore';
import { MATERIALS, OPERATIONS, VALIDATION_RANGES } from '../../../shared/types';

/**
 * InfoTooltip - Tooltip inline
 */
function InfoTooltip({ text }) {
  return (
    <span className="info-tooltip" title={text}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12" y2="8"/>
      </svg>
    </span>
  );
}

/**
 * ParametersCard - Card de Parâmetros de Corte
 * Sliders para Vc, fz, ae, ap
 */
function ParametersCard() {
  const store = useCalculatorStore();
  const material = MATERIALS[store.materialId];

  // Calcular status dos parâmetros
  const getVcStatus = () => {
    if (!material) return 'ok';
    if (store.vc < material.vcMin || store.vc > material.vcMax) return 'danger';
    if (store.vc >= material.vcMin * 0.9 && store.vc <= material.vcMax * 1.1) return 'ok';
    return 'warning';
  };

  const getFzStatus = () => {
    const { idealMin, idealMax, min, max } = VALIDATION_RANGES.fz;
    if (store.fz < min || store.fz > max) return 'danger';
    if (store.fz >= idealMin && store.fz <= idealMax) return 'ok';
    return 'warning';
  };

  const getAeStatus = () => {
    const aePercent = (store.ae / store.diameter) * 100;
    if (aePercent < 10) return 'danger';
    if (aePercent >= 20 && aePercent <= 40) return 'ok';
    return 'warning';
  };

  const getApStatus = () => {
    const apPercent = (store.ap / store.diameter) * 100;
    if (apPercent < 10) return 'danger';
    if (apPercent >= 20 && apPercent <= 50) return 'ok';
    return 'warning';
  };

  return (
    <div className="card card-parameters">
      <div className="card-header">
        <h2 className="card-title">Parâmetros de Corte</h2>
      </div>
      <div className="card-body">
        {/* Configuração Base */}
        <div className="param-section">
          <div className="param-section-title">Configuração Base</div>

          {/* Material da Peça */}
          <div className="input-group">
            <label className="input-label">
              Material da Peça
              <InfoTooltip text="Selecione o material da peça a ser usinada" />
            </label>
            <select
              className="select-field"
              value={store.materialId}
              onChange={(e) => store.setMaterial(e.target.value)}
            >
              {Object.values(MATERIALS).map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name}
                </option>
              ))}
            </select>
            {material && (
              <div className="input-hint">
                Vc recomendada: {material.vcMin}-{material.vcMax} m/min
              </div>
            )}
          </div>

          {/* Tipo de Usinagem */}
          <div className="input-group">
            <label className="input-label">
              Tipo de Usinagem
              <InfoTooltip text="Define os fatores de ap, ae e fz" />
            </label>
            <div className="button-group">
              {Object.values(OPERATIONS).map((op) => (
                <button
                  key={op.id}
                  className={`button-group-item ${store.operationType === op.id ? 'active' : ''}`}
                  onClick={() => store.setOperationType(op.id)}
                >
                  {op.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Parâmetros de Corte */}
        <div className="param-section">
          <div className="param-section-title">Velocidades e Avanços</div>

          {/* Velocidade de Corte (Vc) */}
          <div className="input-group">
            <label className="input-label">
              <span className={`status-dot ${getVcStatus()}`} />
              Velocidade de Corte (Vc)
              <span className="input-value">{store.vc} m/min</span>
            </label>
            <div className="slider-wrapper">
              <input
                type="range"
                className="slider-input"
                value={store.vc}
                onChange={(e) => store.setVc(parseFloat(e.target.value))}
                min={50}
                max={200}
                step={5}
              />
            </div>
            <div className="slider-labels">
              <span>50</span>
              <span className="ideal">Ideal: {material?.vcMin || 100}-{material?.vcMax || 140}</span>
              <span>200</span>
            </div>
          </div>

          {/* Avanço por Dente (fz) */}
          <div className="input-group">
            <label className="input-label">
              <span className={`status-dot ${getFzStatus()}`} />
              Avanço por Dente (fz)
              <span className="input-value">{store.fz.toFixed(3)} mm/dente</span>
            </label>
            <div className="slider-wrapper">
              <input
                type="range"
                className="slider-input"
                value={store.fz * 1000}
                onChange={(e) => store.setFz(parseFloat(e.target.value) / 1000)}
                min={10}
                max={200}
                step={5}
              />
            </div>
            <div className="slider-labels">
              <span>0.01</span>
              <span className="ideal">Ideal: 0.08-0.12</span>
              <span>0.20</span>
            </div>
          </div>

          {/* Largura de Corte (ae) */}
          <div className="input-group">
            <label className="input-label">
              <span className={`status-dot ${getAeStatus()}`} />
              Largura de Corte (ae)
              <span className="input-value">{store.ae.toFixed(1)} mm ({Math.round((store.ae / store.diameter) * 100)}%)</span>
            </label>
            <div className="slider-wrapper">
              <input
                type="range"
                className="slider-input"
                value={(store.ae / store.diameter) * 100}
                onChange={(e) => store.setAe((parseFloat(e.target.value) / 100) * store.diameter)}
                min={5}
                max={100}
                step={5}
              />
            </div>
            <div className="slider-labels">
              <span>5%</span>
              <span className="ideal">Ideal: 20-40%</span>
              <span>100%</span>
            </div>
            {(store.ae / store.diameter) < 0.25 && (
              <div className="input-warning">
                Chip Thinning será aplicado automaticamente
              </div>
            )}
          </div>

          {/* Profundidade Axial (ap) */}
          <div className="input-group">
            <label className="input-label">
              <span className={`status-dot ${getApStatus()}`} />
              Profundidade Axial (ap)
              <span className="input-value">{store.ap.toFixed(1)} mm ({Math.round((store.ap / store.diameter) * 100)}%)</span>
            </label>
            <div className="slider-wrapper">
              <input
                type="range"
                className="slider-input"
                value={(store.ap / store.diameter) * 100}
                onChange={(e) => store.setAp((parseFloat(e.target.value) / 100) * store.diameter)}
                min={5}
                max={100}
                step={5}
              />
            </div>
            <div className="slider-labels">
              <span>5%</span>
              <span className="ideal">Ideal: 20-50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="card-actions">
          <button
            className="btn-primary"
            onClick={() => store.recalculate()}
          >
            Simular Parâmetros
          </button>
          <button
            className="btn-secondary"
            onClick={() => store.reset()}
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParametersCard;
