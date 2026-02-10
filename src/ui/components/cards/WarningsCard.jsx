import React, { useState } from 'react';
import useCalculatorStore from '../../store/useCalculatorStore';

/**
 * WarningsCard - Card de Avisos e Impactos dos Parâmetros
 * Accordions com explicações
 */
function WarningsCard() {
  const { results, validation } = useCalculatorStore();
  const [openAccordions, setOpenAccordions] = useState(['vc-rpm']);

  const toggleAccordion = (id) => {
    setOpenAccordions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isOpen = (id) => openAccordions.includes(id);

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
      description: 'Largura de corte menor que 25% do diâmetro ativa chip thinning.',
      formula: 'ae/D < 0.25 → Chip Thinning',
      status: (results?.ae / results?.diameter) < 0.25 ? 'warning' : 'ok'
    },
    {
      id: 'ap-torque',
      title: 'ap → Torque/Potência',
      description: 'Maior profundidade aumenta força de corte, exigindo mais torque.',
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
    <div className="card card-warnings">
      <div className="card-header">
        <h2 className="card-title">Avisos e Impactos</h2>
      </div>
      <div className="card-body">
        {/* Status de Validação */}
        {validation && (
          <div className="validation-status">
            <div className="validation-title">Status de Validação</div>
            <div className="validation-list">
              {validation.issues.slice(0, 3).map((issue, idx) => (
                <div
                  key={idx}
                  className={`validation-item ${issue.type}`}
                >
                  {issue.type === 'error' && '🚫'}
                  {issue.type === 'warning' && '⚠️'}
                  {issue.type === 'info' && 'ℹ️'}
                  <span>{issue.message}</span>
                </div>
              ))}
              {validation.issues.length === 0 && (
                <div className="validation-item ok">
                  ✓ Todos os parâmetros dentro dos limites
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accordions de Impacto */}
        <div className="impacts-section">
          <div className="impacts-title">Impactos dos Parâmetros</div>
          {impactos.map((impacto) => (
            <div key={impacto.id} className={`accordion ${isOpen(impacto.id) ? 'open' : ''}`}>
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(impacto.id)}
              >
                <span className="accordion-title">
                  <span className={`status-dot ${impacto.status}`}></span>
                  {impacto.title}
                </span>
                <span className="accordion-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
              <div className="accordion-content">
                <div className="accordion-body">
                  <p>{impacto.description}</p>
                  <div className="accordion-formula">{impacto.formula}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WarningsCard;
