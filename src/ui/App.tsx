import React, { useState } from 'react';
import './index.css';
import { CalculatorProvider, useCalculator } from './context/CalculatorContext';
import HeaderZ1 from './components/HeaderZ1';
import FamilyNav, { ID_PAINEL_CALCULO, idDaAba } from './components/FamilyNav';
import ConfigForm from './components/ConfigForm';
import ResultsPanel from './components/ResultsPanel';
import SettingsView from './components/SettingsView';
import MobileCalculator from './components/mobile/MobileCalculator';
import { useIsMobile } from './hooks/useIsMobile';

/**
 * O conteúdo, separado da casca porque precisa ler a família ativa do contexto —
 * e `useCalculator` só funciona dentro do `CalculatorProvider`.
 */
function Painel() {
  const [showSettings, setShowSettings] = useState(false);
  const { activeFamily } = useCalculator();
  const isMobile = useIsMobile(768);

  return (
    <div className="tool-app">
      {/* TÍTULO DE DOCUMENTO (R10 / Defeito K da especificação estrutural) */}
      <h1 className="sr-only">ToolOptimizer CNC — Calculadora de Parâmetros de Corte</h1>

      {isMobile ? (
        /* EXPERIÊNCIA MOBILE DEDICADA */
        <div className="mobile-view-wrapper">
          {showSettings ? (
            <section id="view-configuracoes-mobile" aria-label="Área de Configurações Gerais do Sistema">
              <SettingsView onClose={() => setShowSettings(false)} />
            </section>
          ) : (
            <MobileCalculator onOpenSettings={() => setShowSettings(true)} />
          )}
        </div>
      ) : (
        /* EXPERIÊNCIA DESKTOP PRESERVADA (INALTERADA) */
        <main id="viewport-container" className="viewport-wrapper">
          {/* CABEÇALHO Z1 */}
          <HeaderZ1 onOpenSettings={() => setShowSettings(!showSettings)} />

          {/* NAVEGAÇÃO DE FAMÍLIAS */}
          <FamilyNav onCloseSettings={() => setShowSettings(false)} />

          {/* LAYOUT PRINCIPAL DE CÁLCULO */}
          <div
            id={ID_PAINEL_CALCULO}
            className="main-layout"
            role="tabpanel"
            aria-labelledby={idDaAba(activeFamily)}
            hidden={showSettings}
          >
            <section className="col-config" id="config-form-container" aria-label="Entradas e Configurações de Usinagem">
              <ConfigForm />
            </section>

            <section className="col-results" id="col-resultados-content" aria-label="Resultados Calculados e Diagnóstico de Corte">
              <ResultsPanel />
            </section>
          </div>

          {/* ÁREA DE CONFIGURAÇÕES GERAIS */}
          <section id="view-configuracoes" hidden={!showSettings} aria-label="Área de Configurações Gerais do Sistema">
            {showSettings && <SettingsView onClose={() => setShowSettings(false)} />}
          </section>
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CalculatorProvider>
      <Painel />
    </CalculatorProvider>
  );
}
