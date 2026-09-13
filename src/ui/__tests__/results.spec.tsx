// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React, { useEffect } from 'react';
import { CalculatorProvider, useCalculator } from '../context/CalculatorContext';
import ResultsPanel from '../components/ResultsPanel';

function TestContainer({ scenario }: { scenario?: 'nominal' | 'critico' }) {
  const { selectMaterial, selectTool, updateField, calculate } = useCalculator();

  useEffect(() => {
    selectMaterial('1045');
    selectTool('fresa-toroidal');
    updateField('D', 10);
    updateField('Z', 4);
    updateField('L', 45);
    updateField('ap', 2.0);
    updateField('fz', 0.06);
    updateField('r', 1.0);

    if (scenario === 'critico') {
      // Cenário 3: ae = 12 > D = 10 (CRÍTICO)
      updateField('ae', 12);
    } else {
      // Nominal: ae = 2.5
      updateField('ae', 2.5);
    }

    calculate();
  }, [scenario]);

  return <ResultsPanel />;
}

describe('ResultsPanel — Hero Numbers, Verificação Física e Alertas (TASK-012)', () => {
  it('AC-001: Deve exibir os Hero Numbers S e F formatados e os cartões físicos', () => {
    render(
      <CalculatorProvider>
        <TestContainer scenario="nominal" />
      </CalculatorProvider>
    );

    // Hero S (4.456 rpm) e Hero F (1.070 mm/min)
    expect(screen.getByText(/4\.456/)).toBeDefined();
    expect(screen.getByText(/1\.070/)).toBeDefined();

    // Verificação de grandezas físicas
    expect(screen.getByText(/0,029/)).toBeDefined(); // hm
    expect(screen.getByText(/0,28/)).toBeDefined();  // Pc
    expect(screen.getByText(/0,60/)).toBeDefined();  // Mc
  });

  it('Gatilho 5: Balanço L/D = 4.5 deve acionar nível ATENÇÃO', () => {
    render(
      <CalculatorProvider>
        <TestContainer scenario="nominal" />
      </CalculatorProvider>
    );

    const alertBanner = screen.getByRole('alert');
    expect(alertBanner).toBeDefined();
    expect(alertBanner.textContent).toContain('ATENÇÃO');
  });

  it('Cenário 3 (ae > D): Deve acionar nível CRÍTICO sem bloquear o cálculo', () => {
    render(
      <CalculatorProvider>
        <TestContainer scenario="critico" />
      </CalculatorProvider>
    );

    const alertBanner = screen.getByRole('alert');
    expect(alertBanner).toBeDefined();
    expect(alertBanner.textContent).toContain('CRÍTICO');
    expect(alertBanner.textContent).toMatch(/remoção fora da aresta física/i);
  });

  it('Ajuste tátil de S: clicar no botão − aplica offset de −5%', () => {
    render(
      <CalculatorProvider>
        <TestContainer scenario="nominal" />
      </CalculatorProvider>
    );

    const minusBtn = screen.getByRole('button', { name: /reduzir rotação/i });
    act(() => {
      fireEvent.click(minusBtn);
    });

    // Badge com -5% deve aparecer
    expect(screen.getByText(/−5\s*%/)).toBeDefined();
    // Valor de S reduzido de 4.456 para 4.234
    expect(screen.getByText(/4\.234/)).toBeDefined();
  });
});
