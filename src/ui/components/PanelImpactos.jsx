import React, { useState } from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

/**
 * PanelImpactos - Painel lateral direito (300px)
 * Accordions com explicações de impactos
 * Colapsável para 20px
 */
function PanelImpactos() {
  const { isPanelCollapsed, togglePanel, results, validation } = useCalculatorStore();
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
    <aside className={`panel-impactos relative ${isPanelCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      <button
        className="panel-toggle"
        onClick={togglePanel}
        title={isPanelCollapsed ? 'Expandir painel' : 'Recolher painel'}
      >
        {isPanelCollapsed ? '◀' : '▶'}
      </button>

      {/* Conteúdo do painel (oculto quando colapsado) */}
      {!isPanelCollapsed && (
        <>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
            Impactos dos Parâmetros
          </h3>

          {/* Accordions */}
          {impactos.map((impacto) => (
            <div key={impacto.id} className={`accordion ${isOpen(impacto.id) ? 'open' : ''}`}>
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(impacto.id)}
              >
                <span className="accordion-title flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    impacto.status === 'ok' ? 'bg-status-ok' :
                    impacto.status === 'warning' ? 'bg-status-warning' :
                    'bg-status-danger'
                  }`}></span>
                  {impacto.title}
                </span>
                <span className="accordion-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

          {/* Resumo de Validação */}
          {validation && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-xs font-semibold text-text-muted uppercase mb-3">
                Status de Validação
              </h4>

              <div className="space-y-2">
                {validation.issues.slice(0, 3).map((issue, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-2 rounded ${
                      issue.type === 'error' ? 'bg-red-900/20 text-status-danger' :
                      issue.type === 'warning' ? 'bg-yellow-900/20 text-status-warning' :
                      'bg-blue-900/20 text-primary-blue'
                    }`}
                  >
                    {issue.message}
                  </div>
                ))}

                {validation.issues.length === 0 && (
                  <div className="text-xs p-2 rounded bg-green-900/20 text-status-ok">
                    Todos os parâmetros dentro dos limites
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Limites da Máquina */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <h4 className="text-xs font-semibold text-text-muted uppercase mb-3">
              Limites da Máquina
            </h4>
            <div className="space-y-1 text-xs text-text-muted">
              <div className="flex justify-between">
                <span>RPM Máx:</span>
                <span className="text-text-secondary">24.000</span>
              </div>
              <div className="flex justify-between">
                <span>Potência Máx:</span>
                <span className="text-text-secondary">15 kW</span>
              </div>
              <div className="flex justify-between">
                <span>Feed Máx:</span>
                <span className="text-text-secondary">2.000 mm/min</span>
              </div>
              <div className="flex justify-between">
                <span>L/D Crítico:</span>
                <span className="text-text-secondary">&gt; 6</span>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

export default PanelImpactos;
