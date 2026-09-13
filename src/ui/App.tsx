import React, { useState } from 'react';
import './index.css';
import { CalculatorProvider, useCalculator } from './context/CalculatorContext';
import HeaderZ1 from './components/HeaderZ1';
import FamilyNav, { ID_PAINEL_CALCULO, idDaAba } from './components/FamilyNav';
import ConfigForm from './components/ConfigForm';
import ResultsPanel from './components/ResultsPanel';
import SettingsView from './components/SettingsView';

/**
 * O conteúdo, separado da casca porque precisa ler a família ativa do contexto —
 * e `useCalculator` só funciona dentro do `CalculatorProvider`.
 */
function Painel() {
  const [showSettings, setShowSettings] = useState(false);
  const { activeFamily } = useCalculator();

  return (
    <div className="tool-app">
      <main id="viewport-container" className="viewport-wrapper">
        {/* O título de documento. Sem um h1 o leitor de tela não tem onde
            ancorar, e a página não tem estrutura para saltar. R10 do brief,
            defeito K da especificação estrutural. É visualmente a placa de
            marca, que o HeaderZ1 desenha. */}
        <h1 className="sr-only">ToolOptimizer CNC — Calculadora de Parâmetros de Corte</h1>

        {/* CABEÇALHO Z1 */}
        <HeaderZ1 onOpenSettings={() => setShowSettings(!showSettings)} />

        {/* NAVEGAÇÃO DE FAMÍLIAS */}
        <FamilyNav onCloseSettings={() => setShowSettings(false)} />

        {/* LAYOUT PRINCIPAL DE CÁLCULO — é o painel que as abas de família
            controlam. O `aria-labelledby` aponta para a aba selecionada: sem
            isso o leitor de tela não sabe de que família é o conteúdo. */}
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
