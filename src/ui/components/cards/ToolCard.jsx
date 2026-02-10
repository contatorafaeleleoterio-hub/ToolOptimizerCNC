import React, { useState } from 'react';
import useCalculatorStore from '../../store/useCalculatorStore';

/**
 * ToolCard - Card de Configuração da Ferramenta
 * Com visor colapsável
 */
function ToolCard() {
  const store = useCalculatorStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Gera texto do visor
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

  const showCornerRadius = store.toolType === 'toroidal';
  const showPhysicalConfig = store.diameter <= 6;
  const showNeckHeight = showPhysicalConfig && store.physicalConfig === 'com-rebaixo';

  const visor = getVisorText();

  return (
    <div className="card card-tool">
      <div className="card-header">
        <h2 className="card-title">Ferramenta</h2>
      </div>

      {/* Visor de Resumo */}
      <div
        className={`tool-visor ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="visor-content">
          <div className="visor-label">Ferramenta Selecionada</div>
          <div className="visor-summary">
            <span className="visor-tipo">{visor.tipo}</span>
            <span className="visor-sep">|</span>
            <span className="visor-diametro">{visor.diametro}</span>
            <span className="visor-sep">|</span>
            <span className="visor-config">{visor.config}</span>
          </div>
          <div className="visor-fixacao">{visor.fixacao}</div>
        </div>
        <div className="visor-arrow">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {/* Conteúdo Expandível */}
      <div className={`tool-drawer ${isExpanded ? 'expanded' : ''}`}>
        <div className="drawer-content">
          {/* Tipo de Ferramenta */}
          <div className="input-group">
            <label className="input-label">Tipo de Ferramenta</label>
            <div className="button-group">
              <button
                className={`button-group-item ${store.toolType === 'toroidal' ? 'active' : ''}`}
                onClick={() => handleToolTypeChange('toroidal')}
              >
                Toroidal
              </button>
              <button
                className={`button-group-item ${store.toolType === 'topo-reto' ? 'active' : ''}`}
                onClick={() => handleToolTypeChange('topo-reto')}
              >
                Topo Reto
              </button>
              <button
                className={`button-group-item ${store.toolType === 'esferica' ? 'active' : ''}`}
                onClick={() => handleToolTypeChange('esferica')}
              >
                Esférica
              </button>
            </div>
          </div>

          {/* Raio de Ponta */}
          {showCornerRadius && (
            <div className="input-group">
              <label className="input-label">Raio de Ponta</label>
              <div className="button-group">
                <button
                  className={`button-group-item ${store.cornerRadius === 0.5 ? 'active' : ''}`}
                  onClick={() => store.setCornerRadius(0.5)}
                >
                  R0.5
                </button>
                <button
                  className={`button-group-item ${store.cornerRadius === 1.0 ? 'active' : ''}`}
                  onClick={() => store.setCornerRadius(1.0)}
                >
                  R1.0
                </button>
              </div>
            </div>
          )}

          {/* Diâmetro */}
          <div className="input-group">
            <label className="input-label">
              Diâmetro
              <span className="input-unit">mm</span>
            </label>
            <input
              type="number"
              className="input-field"
              value={store.diameter}
              onChange={(e) => handleDiameterChange(parseFloat(e.target.value) || 10)}
              min={1}
              max={16}
              step={1}
            />
            <div className="diameter-chips">
              {[2, 4, 6, 8, 10, 12, 14, 16].map(d => (
                <button
                  key={d}
                  className={`diameter-chip ${store.diameter === d ? 'active' : ''}`}
                  onClick={() => handleDiameterChange(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Configuração Física */}
          {showPhysicalConfig && (
            <div className="input-group">
              <label className="input-label">Configuração Física</label>
              <div className="button-group">
                <button
                  className={`button-group-item ${store.physicalConfig === 'inteirica' ? 'active' : ''}`}
                  onClick={() => store.setPhysicalConfig('inteirica')}
                >
                  Interiça
                </button>
                <button
                  className={`button-group-item ${store.physicalConfig === 'com-rebaixo' ? 'active' : ''}`}
                  onClick={() => store.setPhysicalConfig('com-rebaixo')}
                >
                  Com Rebaixo
                </button>
              </div>
            </div>
          )}

          {/* Altura do Rebaixo */}
          {showNeckHeight && (
            <div className="input-group">
              <label className="input-label">
                Altura do Rebaixo
                <span className="input-unit">mm</span>
              </label>
              <input
                type="number"
                className="input-field"
                value={store.neckHeight}
                onChange={(e) => store.setNeckHeight(parseFloat(e.target.value) || 10)}
                min={5}
                max={30}
              />
            </div>
          )}

          {/* Altura de Fixação */}
          <div className="input-group">
            <label className="input-label">
              Altura Fixação
              <span className="input-unit">mm</span>
            </label>
            <input
              type="number"
              className="input-field"
              value={store.fixingHeight}
              onChange={(e) => store.setFixingHeight(parseFloat(e.target.value) || 30)}
              min={10}
              max={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolCard;
