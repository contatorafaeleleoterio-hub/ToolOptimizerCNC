import React, { useState } from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

/**
 * ImpactsSection - Painel de impactos dos parâmetros
 * Accordions com explicações e fórmulas
 * Visível apenas em telas >= 1600px
 */
function ImpactsSection() {
  const { results, validation } = useCalculatorStore();
  const [openAccordions, setOpenAccordions] = useState(['vc-rpm']);

  const toggleAccordion = (id) => {
    setOpenAccordions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isOpen = (id) => openAccordions.includes(id);

  // Dados dos accordions
  const impactos = [
    {
      id: 'vc-rpm',
      title: 'Vc → RPM',
      description: 'A velocidade de corte determina a rotação. Aumentar Vc aumenta RPM proporcionalmente.',
      formula: 'n = (Vc × 1000) / (π × D)',
      status: 'ok'
    },
    {
      id: 'fz-f',
      title: 'fz → F',
      description: 'O avanço por dente multiplica pela rotação e número de arestas para dar o avanço linear.',
      formula: 'F = n × Z × fz',
      status: results?.chipThinning?.chipThinningApplied ? 'warning' : 'ok'
    },
    {
      id: 'ae-cavaco',
      title: 'ae → Espessura Cavaco',
      description: 'Largura de corte menor que 25% do diâmetro ativa chip thinning, exigindo correção do fz.',
      formula: 'ae/D < 0.25 → Chip Thinning',
      status: (results?.ae / results?.diameter) < 0.25 ? 'warning' : 'ok'
    },
    {
      id: 'ap-torque',
      title: 'ap → Torque/Potência',
      description: 'Maior profundidade aumenta força de corte, exigindo mais torque e potência do spindle.',
      formula: 'P = (Vc × ap × ae × kc) / 60000',
      status: 'ok'
    },
    {
      id: 'ld-estabilidade',
      title: 'L/D → Estabilidade',
      description: 'Relação balanço/diâmetro alta causa vibração. L/D > 6 é crítico.',
      formula: 'L/D = Comprimento / Diâmetro',
      status: results?.ldRatio > 6 ? 'danger' : results?.ldRatio > 4 ? 'warning' : 'ok'
    }
  ];

  return (
    <aside className="impacts-section" aria-label="Impactos dos parâmetros">
      <h2 className="impacts-title">Impactos dos Parâmetros</h2>

      {/* Accordions */}
      <div role="region" aria-label="Explicações dos parâmetros">
        {impactos.map((impacto) => (
          <div
            key={impacto.id}
            className={`accordion ${isOpen(impacto.id) ? 'open' : ''}`}
          >
            <button
              className="accordion-header"
              onClick={() => toggleAccordion(impacto.id)}
              aria-expanded={isOpen(impacto.id)}
              aria-controls={`accordion-content-${impacto.id}`}
            >
              <span className="accordion-title">
                <span
                  className={`status-dot ${impacto.status}`}
                  aria-hidden="true"
                />
                {impacto.title}
              </span>
              <span className="accordion-arrow" aria-hidden="true">
                <ChevronIcon />
              </span>
            </button>
            <div
              id={`accordion-content-${impacto.id}`}
              className="accordion-content"
              role="region"
            >
              <div className="accordion-body">
                <p>{impacto.description}</p>
                <code className="accordion-formula">{impacto.formula}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo de Validação */}
      {validation && (
        <div className="validation-summary">
          <h3 className="validation-summary-title">Status de Validação</h3>

          <div role="list">
            {validation.issues.slice(0, 3).map((issue, idx) => (
              <div
                key={idx}
                className={`validation-item ${issue.type === 'error' ? 'error' : issue.type}`}
                role="listitem"
              >
                {issue.message}
              </div>
            ))}

            {validation.issues.length === 0 && (
              <div className="validation-item ok" role="listitem">
                Todos os parâmetros dentro dos limites
              </div>
            )}
          </div>
        </div>
      )}

      {/* Limites da Máquina */}
      <div className="machine-limits">
        <h3 className="machine-limits-title">Limites da Máquina</h3>

        <div role="list">
          <div className="machine-limit-row" role="listitem">
            <span className="machine-limit-label">RPM Máx:</span>
            <span className="machine-limit-value">24.000</span>
          </div>
          <div className="machine-limit-row" role="listitem">
            <span className="machine-limit-label">Potência Máx:</span>
            <span className="machine-limit-value">15 kW</span>
          </div>
          <div className="machine-limit-row" role="listitem">
            <span className="machine-limit-label">Feed Máx:</span>
            <span className="machine-limit-value">2.000 mm/min</span>
          </div>
          <div className="machine-limit-row" role="listitem">
            <span className="machine-limit-label">L/D Crítico:</span>
            <span className="machine-limit-value">&gt; 6</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/**
 * ChevronIcon - Seta de expansão
 */
function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
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

export default ImpactsSection;
