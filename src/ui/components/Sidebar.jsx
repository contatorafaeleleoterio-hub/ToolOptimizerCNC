import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';
import { MATERIALS, OPERATIONS, VALIDATION_RANGES } from '../../shared/types';
import ToolConfigCard from './ToolConfigCard';

/**
 * Tooltip inline component
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
 * Indicador de status do slider
 */
function SliderStatus({ value, idealMin, idealMax, warningMin, warningMax }) {
  let status = 'ok';
  if (value < warningMin || value > warningMax) {
    status = 'danger';
  } else if (value < idealMin || value > idealMax) {
    status = 'warning';
  }

  return <span className={`slider-status ${status}`} />;
}

/**
 * Sidebar - Zona de Configurações (360px)
 * Hierarquia de Inputs conforme especificação
 */
function Sidebar() {
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
    <aside className="sidebar">
      {/* Botões de Ação - Fixos no topo, acima de tudo */}
      <div className="sidebar-actions-top">
        <button
          className="btn-calculate flex-1"
          onClick={() => store.recalculate()}
        >
          Simular Parâmetros
        </button>
        <button
          className="btn-reset-icon"
          onClick={() => store.reset()}
          title="Limpar Tudo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
        </button>
      </div>

      {/* GRUPO FIXO - Material e Tipo de Usinagem */}
      <div className="config-card">
        <div className="config-card-header">Configuração Base</div>

        {/* 1. Material da Peça */}
        <div className="input-group">
          <label className="input-label">
            Material da Peça
            <InfoTooltip text="Selecione o material da peça a ser usinada. O material define a faixa de Vc recomendada." />
          </label>
          <select
            className="select-field"
            value={store.materialId}
            onChange={(e) => store.setMaterial(e.target.value)}
          >
            {Object.values(MATERIALS).map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
          {material && (
            <div className="input-hint">
              Vc recomendada: {material.vcMin}-{material.vcMax} m/min
            </div>
          )}
        </div>

        {/* 2. Tipo de Usinagem */}
        <div className="input-group">
          <label className="input-label">
            Tipo de Usinagem
            <InfoTooltip text="Define os fatores de ap, ae e fz aplicados automaticamente." />
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

      {/* CARD PRINCIPAL - Configuração da Ferramenta com Gaveta */}
      <ToolConfigCard />

      {/* PARÂMETROS DE CORTE - Sliders com Zona Ideal */}
      <div className="config-card">
        <div className="config-card-header">Parâmetros de Corte</div>

        {/* 9. Velocidade de Corte (Vc) */}
        <div className="input-group">
          <label className="input-label">
            <span className={`status-dot ${getVcStatus()}`} />
            Velocidade de Corte (Vc)
            <span className="input-unit">{store.vc} m/min</span>
          </label>
          <div className="slider-container">
            <div className="slider-track"></div>
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
          <div className="slider-range-labels">
            <span>50</span>
            <span className="text-green-400">Ideal: {material?.vcMin || 100}-{material?.vcMax || 140}</span>
            <span>200</span>
          </div>
        </div>

        {/* 10. Avanço por Dente (fz) */}
        <div className="input-group">
          <label className="input-label">
            <span className={`status-dot ${getFzStatus()}`} />
            Avanço por Dente (fz)
            <span className="input-unit">{store.fz.toFixed(3)} mm/dente</span>
          </label>
          <div className="slider-container">
            <div className="slider-track"></div>
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
          <div className="slider-range-labels">
            <span>0.01</span>
            <span className="text-green-400">Ideal: 0.08-0.12</span>
            <span>0.20</span>
          </div>
        </div>

        {/* 11. Largura de Corte (ae) */}
        <div className="input-group">
          <label className="input-label">
            <span className={`status-dot ${getAeStatus()}`} />
            Largura de Corte (ae)
            <span className="input-unit">{store.ae.toFixed(1)} mm ({Math.round((store.ae / store.diameter) * 100)}%)</span>
          </label>
          <div className="slider-container">
            <div className="slider-track"></div>
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
          <div className="slider-range-labels">
            <span>5%</span>
            <span className="text-green-400">Ideal: 20-40%</span>
            <span>100%</span>
          </div>
          {(store.ae / store.diameter) < 0.25 && (
            <div className="input-warning">
              Chip Thinning será aplicado automaticamente
            </div>
          )}
        </div>

        {/* 12. Profundidade Axial (ap) */}
        <div className="input-group">
          <label className="input-label">
            <span className={`status-dot ${getApStatus()}`} />
            Profundidade Axial (ap)
            <span className="input-unit">{store.ap.toFixed(1)} mm ({Math.round((store.ap / store.diameter) * 100)}%)</span>
          </label>
          <div className="slider-container">
            <div className="slider-track"></div>
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
          <div className="slider-range-labels">
            <span>5%</span>
            <span className="text-green-400">Ideal: 20-50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
