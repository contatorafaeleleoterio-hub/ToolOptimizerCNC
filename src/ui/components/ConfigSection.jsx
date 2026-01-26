import React, { useState } from 'react';
import useCalculatorStore from '../store/useCalculatorStore';
import { MATERIALS, OPERATIONS, VALIDATION_RANGES } from '../../shared/types';
import ToolConfigCard from './ToolConfigCard';

/**
 * ConfigSection - Seção de configurações
 * Cards colapsáveis no mobile, sempre abertos no desktop
 */
function ConfigSection() {
  const [openCards, setOpenCards] = useState(['base', 'tool', 'params']);

  const toggleCard = (cardId) => {
    setOpenCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const isOpen = (cardId) => openCards.includes(cardId);

  return (
    <section className="config-section" aria-label="Configurações">
      <BaseConfigCard isOpen={isOpen('base')} onToggle={() => toggleCard('base')} />
      <ToolConfigCard isOpen={isOpen('tool')} onToggle={() => toggleCard('tool')} />
      <CuttingParamsCard isOpen={isOpen('params')} onToggle={() => toggleCard('params')} />
    </section>
  );
}

/**
 * BaseConfigCard - Material e Tipo de Usinagem
 */
function BaseConfigCard({ isOpen, onToggle }) {
  const store = useCalculatorStore();
  const material = MATERIALS[store.materialId];

  return (
    <article className={`config-card ${isOpen ? 'open' : ''}`}>
      <header
        className="config-card-header"
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        aria-controls="base-config-content"
      >
        <h2 className="config-card-title">Configuração Base</h2>
        <span className="config-card-toggle" aria-hidden="true">
          <ChevronIcon />
        </span>
      </header>

      <div id="base-config-content" className="config-card-body">
        <div className="config-card-content">
          {/* Material da Peça */}
          <div className="input-group">
            <label htmlFor="material-select" className="input-label">
              Material da Peça
              <InfoIcon text="Selecione o material da peça a ser usinada. O material define a faixa de Vc recomendada." />
            </label>
            <select
              id="material-select"
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
              <p className="input-hint">
                Vc recomendada: {material.vcMin}-{material.vcMax} m/min
              </p>
            )}
          </div>

          {/* Tipo de Usinagem */}
          <div className="input-group">
            <span className="input-label">
              Tipo de Usinagem
              <InfoIcon text="Define os fatores de ap, ae e fz aplicados automaticamente." />
            </span>
            <div className="button-group" role="radiogroup" aria-label="Tipo de usinagem">
              {Object.values(OPERATIONS).map((op) => (
                <button
                  key={op.id}
                  className={`button-group-item ${store.operationType === op.id ? 'active' : ''}`}
                  onClick={() => store.setOperationType(op.id)}
                  role="radio"
                  aria-checked={store.operationType === op.id}
                >
                  {op.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * CuttingParamsCard - Parâmetros de corte (Vc, fz, ae, ap)
 */
function CuttingParamsCard({ isOpen, onToggle }) {
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
    <article className={`config-card ${isOpen ? 'open' : ''}`}>
      <header
        className="config-card-header"
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        aria-controls="cutting-params-content"
      >
        <h2 className="config-card-title">Parâmetros de Corte</h2>
        <span className="config-card-toggle" aria-hidden="true">
          <ChevronIcon />
        </span>
      </header>

      <div id="cutting-params-content" className="config-card-body">
        <div className="config-card-content">
          {/* Velocidade de Corte (Vc) */}
          <SliderParam
            id="vc-slider"
            label="Velocidade de Corte (Vc)"
            status={getVcStatus()}
            value={store.vc}
            displayValue={`${store.vc} m/min`}
            min={50}
            max={200}
            step={5}
            onChange={(val) => store.setVc(val)}
            idealLabel={`Ideal: ${material?.vcMin || 100}-${material?.vcMax || 140}`}
            minLabel="50"
            maxLabel="200"
          />

          {/* Avanço por Dente (fz) */}
          <SliderParam
            id="fz-slider"
            label="Avanço por Dente (fz)"
            status={getFzStatus()}
            value={store.fz * 1000}
            displayValue={`${store.fz.toFixed(3)} mm/dente`}
            min={10}
            max={200}
            step={5}
            onChange={(val) => store.setFz(val / 1000)}
            idealLabel="Ideal: 0.08-0.12"
            minLabel="0.01"
            maxLabel="0.20"
          />

          {/* Largura de Corte (ae) */}
          <SliderParam
            id="ae-slider"
            label="Largura de Corte (ae)"
            status={getAeStatus()}
            value={(store.ae / store.diameter) * 100}
            displayValue={`${store.ae.toFixed(1)} mm (${Math.round((store.ae / store.diameter) * 100)}%)`}
            min={5}
            max={100}
            step={5}
            onChange={(val) => store.setAe((val / 100) * store.diameter)}
            idealLabel="Ideal: 20-40%"
            minLabel="5%"
            maxLabel="100%"
            warning={(store.ae / store.diameter) < 0.25 ? "Chip Thinning será aplicado automaticamente" : null}
          />

          {/* Profundidade Axial (ap) */}
          <SliderParam
            id="ap-slider"
            label="Profundidade Axial (ap)"
            status={getApStatus()}
            value={(store.ap / store.diameter) * 100}
            displayValue={`${store.ap.toFixed(1)} mm (${Math.round((store.ap / store.diameter) * 100)}%)`}
            min={5}
            max={100}
            step={5}
            onChange={(val) => store.setAp((val / 100) * store.diameter)}
            idealLabel="Ideal: 20-50%"
            minLabel="5%"
            maxLabel="100%"
          />
        </div>
      </div>
    </article>
  );
}

/**
 * SliderParam - Componente de slider para parâmetros
 */
function SliderParam({
  id,
  label,
  status,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
  idealLabel,
  minLabel,
  maxLabel,
  warning
}) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        <span className={`status-dot ${status}`} aria-hidden="true" />
        {label}
        <span className="unit">{displayValue}</span>
      </label>

      <div className="slider-range">
        <input
          id={id}
          type="range"
          className="slider-input"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
      </div>

      <div className="slider-range-labels">
        <span>{minLabel}</span>
        <span className="ideal">{idealLabel}</span>
        <span>{maxLabel}</span>
      </div>

      {warning && <p className="input-warning">{warning}</p>}
    </div>
  );
}

/**
 * InfoIcon - Ícone de informação com tooltip nativo
 */
function InfoIcon({ text }) {
  return (
    <span className="info-icon" title={text} aria-label={text}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </span>
  );
}

/**
 * ChevronIcon - Seta de expansão
 */
function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default ConfigSection;
