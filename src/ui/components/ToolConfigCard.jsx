import React, { useState, useEffect } from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

/**
 * ToolConfigCard - Card de Configuração da Ferramenta
 * Com visor de resumo colapsável conforme especificação
 */
function ToolConfigCard() {
  const store = useCalculatorStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Gera texto do visor baseado no estado atual
  const getVisorText = () => {
    const { toolType, cornerRadius, diameter, physicalConfig, neckHeight, fixingHeight } = store;

    // Nome do tipo
    const tipoNome = {
      'toroidal': 'Toroidal',
      'topo-reto': 'Topo Reto',
      'esferica': 'Esférica'
    }[toolType] || 'Toroidal';

    // Raio (apenas Toroidal)
    const raioText = toolType === 'toroidal' && cornerRadius
      ? ` R${cornerRadius.toFixed(1)}`
      : '';

    // Configuração física
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

  // Handle ao trocar tipo de ferramenta
  const handleToolTypeChange = (newType) => {
    // Fecha gaveta ao trocar tipo
    setIsDrawerOpen(false);

    // Reset valores conforme especificação
    store.setToolType(newType);

    // Se não for toroidal, força reset do raio
    if (newType !== 'toroidal') {
      // Store já faz isso no setToolType
    }

    // Reset config física para Interiça
    if (store.physicalConfig === 'com-rebaixo') {
      store.setPhysicalConfig('inteirica');
    }
  };

  // Handle mudança de diâmetro
  const handleDiameterChange = (newDiameter) => {
    const diameter = Math.max(1, Math.min(16, newDiameter));

    // Se > 6mm, força Interiça e esconde rebaixo
    if (diameter > 6 && store.physicalConfig === 'com-rebaixo') {
      store.setPhysicalConfig('inteirica');
    }

    store.setDiameter(diameter);
  };

  // Handle mudança de config física
  const handlePhysicalConfigChange = (config) => {
    store.setPhysicalConfig(config);
  };

  // Condições de visibilidade
  const showCornerRadius = store.toolType === 'toroidal';
  const showPhysicalConfig = store.diameter <= 6;
  const showNeckHeight = showPhysicalConfig && store.physicalConfig === 'com-rebaixo';

  const visor = getVisorText();

  return (
    <div className="config-card tool-config-card" style={{ position: 'relative' }}>
      <div className="config-card-header">Configuração da Ferramenta</div>

      {/* VISOR DE RESUMO - Sempre visível */}
      <div
        className={`tool-visor ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <div className="tool-visor-content">
          <div className="tool-visor-title">Ferramenta Selecionada</div>
          <div className="tool-visor-summary">
            <span className="visor-tipo">{visor.tipo}</span>
            <span className="visor-separator">|</span>
            <span className="visor-diametro">{visor.diametro}</span>
            <span className="visor-separator">|</span>
            <span className="visor-config">{visor.config}</span>
          </div>
          <div className="tool-visor-fixacao">{visor.fixacao}</div>
        </div>
      </div>

      {/* SETA NO CANTO INFERIOR DIREITO */}
      <div 
        className="tool-visor-arrow-bottom"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        style={{
          position: 'absolute',
          bottom: isDrawerOpen ? 'auto' : '12px',
          right: '12px',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            transform: isDrawerOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease-in-out',
            color: '#3b82f6'
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {/* GAVETA - Colapsável */}
      <div className={`tool-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="tool-drawer-content">

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

          {/* Raio de Ponta - Condicional (apenas Toroidal) */}
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

          {/* Diâmetro de Corte */}
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
            <div className="diameter-suggestions">
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

          {/* Configuração Física - Condicional (D <= 6mm) */}
          {showPhysicalConfig && (
            <div className="input-group">
              <label className="input-label">Configuração Física</label>
              <div className="button-group">
                <button
                  className={`button-group-item ${store.physicalConfig === 'inteirica' ? 'active' : ''}`}
                  onClick={() => handlePhysicalConfigChange('inteirica')}
                >
                  Interiça
                </button>
                <button
                  className={`button-group-item ${store.physicalConfig === 'com-rebaixo' ? 'active' : ''}`}
                  onClick={() => handlePhysicalConfigChange('com-rebaixo')}
                >
                  Com Rebaixo
                </button>
              </div>
            </div>
          )}

          {/* Altura do Rebaixo - Condicional aninhado */}
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
              <div className="slider-range-labels">
                <span>5mm</span>
                <span>30mm</span>
              </div>
            </div>
          )}

          {/* Altura de Fixação - Sempre visível */}
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
            <div className="slider-range-labels">
              <span>10mm</span>
              <span>100mm</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ToolConfigCard;