import React, { useState } from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

/**
 * ToolConfigCard - Card de Configuração da Ferramenta
 * Com visor de resumo colapsável
 */
function ToolConfigCard({ isOpen, onToggle }) {
  const store = useCalculatorStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Gera texto do visor baseado no estado atual
  const getVisorText = () => {
    const { toolType, cornerRadius, diameter, physicalConfig, neckHeight, fixingHeight } = store;

    const tipoNome = {
      'toroidal': 'Toroidal',
      'topo-reto': 'Topo Reto',
      'esferica': 'Esférica'
    }[toolType] || 'Toroidal';

    const raioText = toolType === 'toroidal' && cornerRadius
      ? ` R${cornerRadius.toFixed(1)}`
      : '';

    let configText = 'Interiça';
    if (diameter <= 6 && physicalConfig === 'com-rebaixo') {
      configText = `Rebaixo (${neckHeight}mm)`;
    }

    return {
      tipo: tipoNome + raioText,
      diametro: `Ø${diameter}mm`,
      config: configText,
      fixacao: `Fixação: ${fixingHeight}mm`
    };
  };

  const handleToolTypeChange = (newType) => {
    setIsDrawerOpen(false);
    store.setToolType(newType);
    if (store.physicalConfig === 'com-rebaixo') {
      store.setPhysicalConfig('inteirica');
    }
  };

  const handleDiameterChange = (newDiameter) => {
    const diameter = Math.max(1, Math.min(16, newDiameter));
    if (diameter > 6 && store.physicalConfig === 'com-rebaixo') {
      store.setPhysicalConfig('inteirica');
    }
    store.setDiameter(diameter);
  };

  // Condições de visibilidade
  const showCornerRadius = store.toolType === 'toroidal';
  const showPhysicalConfig = store.diameter <= 6;
  const showNeckHeight = showPhysicalConfig && store.physicalConfig === 'com-rebaixo';

  const visor = getVisorText();

  return (
    <article className={`config-card ${isOpen ? 'open' : ''}`}>
      <header
        className="config-card-header"
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        aria-controls="tool-config-content"
      >
        <h2 className="config-card-title">Configuração da Ferramenta</h2>
        <span className="config-card-toggle" aria-hidden="true">
          <ChevronIcon />
        </span>
      </header>

      <div id="tool-config-content" className="config-card-body">
        <div className="config-card-content">
          {/* Visor de Resumo */}
          <div
            className={`tool-visor ${isDrawerOpen ? 'open' : ''}`}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            role="button"
            aria-expanded={isDrawerOpen}
            aria-controls="tool-drawer"
          >
            <div className="tool-visor-row">
              <div className="tool-visor-content">
                <div className="tool-visor-label">Ferramenta Selecionada</div>
                <div className="tool-visor-value">
                  <span>{visor.tipo}</span>
                  <span className="tool-visor-separator">|</span>
                  <span>{visor.diametro}</span>
                  <span className="tool-visor-separator">|</span>
                  <span>{visor.config}</span>
                </div>
                <div className="tool-visor-fixacao">{visor.fixacao}</div>
              </div>
              <span className="tool-visor-toggle" aria-hidden="true">
                <ChevronIcon />
              </span>
            </div>
          </div>

          {/* Drawer de Configuração */}
          <div
            id="tool-drawer"
            className={`tool-drawer ${isDrawerOpen ? 'open' : ''}`}
          >
            <div className="tool-drawer-content">
              {/* Tipo de Ferramenta */}
              <div className="input-group">
                <span className="input-label">Tipo de Ferramenta</span>
                <div className="button-group cols-3" role="radiogroup" aria-label="Tipo de ferramenta">
                  {[
                    { id: 'toroidal', label: 'Toroidal' },
                    { id: 'topo-reto', label: 'Topo Reto' },
                    { id: 'esferica', label: 'Esférica' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      className={`button-group-item ${store.toolType === type.id ? 'active' : ''}`}
                      onClick={() => handleToolTypeChange(type.id)}
                      role="radio"
                      aria-checked={store.toolType === type.id}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Raio de Ponta - Condicional */}
              {showCornerRadius && (
                <div className="input-group">
                  <span className="input-label">Raio de Ponta</span>
                  <div className="button-group" role="radiogroup" aria-label="Raio de ponta">
                    {[0.5, 1.0].map((radius) => (
                      <button
                        key={radius}
                        className={`button-group-item ${store.cornerRadius === radius ? 'active' : ''}`}
                        onClick={() => store.setCornerRadius(radius)}
                        role="radio"
                        aria-checked={store.cornerRadius === radius}
                      >
                        R{radius.toFixed(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Diâmetro */}
              <div className="input-group">
                <label htmlFor="diameter-input" className="input-label">
                  Diâmetro
                  <span className="unit">mm</span>
                </label>
                <input
                  id="diameter-input"
                  type="number"
                  className="input-field"
                  value={store.diameter}
                  onChange={(e) => handleDiameterChange(parseFloat(e.target.value) || 10)}
                  min={1}
                  max={16}
                  step={1}
                />
                <div className="diameter-chips" role="group" aria-label="Diâmetros comuns">
                  {[2, 4, 6, 8, 10, 12, 14, 16].map(d => (
                    <button
                      key={d}
                      className={`diameter-chip ${store.diameter === d ? 'active' : ''}`}
                      onClick={() => handleDiameterChange(d)}
                      aria-pressed={store.diameter === d}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Configuração Física - Condicional */}
              {showPhysicalConfig && (
                <div className="input-group">
                  <span className="input-label">Configuração Física</span>
                  <div className="button-group" role="radiogroup" aria-label="Configuração física">
                    {[
                      { id: 'inteirica', label: 'Interiça' },
                      { id: 'com-rebaixo', label: 'Com Rebaixo' }
                    ].map((config) => (
                      <button
                        key={config.id}
                        className={`button-group-item ${store.physicalConfig === config.id ? 'active' : ''}`}
                        onClick={() => store.setPhysicalConfig(config.id)}
                        role="radio"
                        aria-checked={store.physicalConfig === config.id}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Altura do Rebaixo - Condicional */}
              {showNeckHeight && (
                <div className="input-group">
                  <label htmlFor="neck-height-input" className="input-label">
                    Altura do Rebaixo
                    <span className="unit">mm</span>
                  </label>
                  <input
                    id="neck-height-input"
                    type="number"
                    className="input-field"
                    value={store.neckHeight}
                    onChange={(e) => store.setNeckHeight(parseFloat(e.target.value) || 10)}
                    min={5}
                    max={30}
                  />
                  <div className="slider-range-labels">
                    <span>5mm</span>
                    <span>30mm</span>
                  </div>
                </div>
              )}

              {/* Altura de Fixação */}
              <div className="input-group">
                <label htmlFor="fixing-height-input" className="input-label">
                  Altura Fixação
                  <span className="unit">mm</span>
                </label>
                <input
                  id="fixing-height-input"
                  type="number"
                  className="input-field"
                  value={store.fixingHeight}
                  onChange={(e) => store.setFixingHeight(parseFloat(e.target.value) || 30)}
                  min={10}
                  max={100}
                />
                <div className="slider-range-labels">
                  <span>10mm</span>
                  <span>100mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
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

export default ToolConfigCard;
