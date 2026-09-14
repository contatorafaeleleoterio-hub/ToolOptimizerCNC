// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Mobile Experience — ToolOptimizer CNC Mobile', () => {
  const originalInnerWidth = window.innerWidth;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    // Configura viewport mobile (375x812 - iPhone padrão)
    window.innerWidth = 375;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('max-width'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.matchMedia = originalMatchMedia;
  });

  it('deve renderizar a casca mobile com cabeçalho compacto, abas horizontais e barra fixa', () => {
    render(<App />);

    // Cabeçalho compacto
    const brand = screen.getByRole('img', { name: /marca tooloptimizer/i });
    expect(brand).toBeDefined();
    expect(brand.textContent).toBe('TOOLOPTIMIZER');

    // Botão de configurações mobile
    const btnSettings = document.getElementById('btn-nav-configuracoes-mobile');
    expect(btnSettings).not.toBeNull();

    // Abas de processos móveis
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);
    expect(tabs[0]?.textContent).toContain('Fresar');
    expect(tabs[1]?.textContent).toContain('Furar');
    expect(tabs[2]?.textContent).toContain('Roscar');
    expect(tabs[3]?.textContent).toContain('Mandrilar');

    // Barra fixa de ação na base
    const stickyBar = screen.getByLabelText(/barra de ação e resultados móvel/i);
    expect(stickyBar).toBeDefined();
    expect(screen.getByText(/preencha os campos/i)).toBeDefined();
  });

  it('deve permitir alternar famílias no mobile respeitando WAI-ARIA', () => {
    render(<App />);

    const tabFurar = screen.getByRole('tab', { name: /furar/i });
    fireEvent.click(tabFurar);

    expect(tabFurar.getAttribute('aria-selected')).toBe('true');
    const painel = document.getElementById('view-calculo');
    expect(painel?.getAttribute('aria-labelledby')).toBe(tabFurar.id);
  });

  it('deve habilitar cálculo ao selecionar material e ferramenta, e abrir folha de resultados', async () => {
    render(<App />);

    // 1. Seleciona Material (Aço 1045 tem id '1045')
    const selMat = screen.getByLabelText(/material a usinar/i);
    fireEvent.change(selMat, { target: { value: '1045' } });

    // 2. Seleciona Ferramenta (Fresa Topo Reto)
    const selTool = screen.getByLabelText(/ferramenta a ser usada/i);
    fireEvent.change(selTool, { target: { value: 'fresa-topo-reto' } });

    // 3. Preenche geometria básica D (Z, L, ap, ae, vc, fz são auto-preenchidos como valores de partida)
    const inputD = screen.getByLabelText(/diâmetro nominal/i);
    fireEvent.change(inputD, { target: { value: '10' } });

    // 4. Botão de calcular agora deve estar habilitado na barra fixa
    const btnCalcular = document.getElementById('btn-calcular-mobile') as HTMLButtonElement;
    expect(btnCalcular).not.toBeNull();
    expect(btnCalcular?.disabled).toBe(false);

    // 5. Clica em Calcular
    fireEvent.click(btnCalcular);

    // 6. Folha de resultados abre com os números de comando S e F
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /resultados calculados/i })).toBeDefined();
    });

    // Verifica que os valores calculados de S e F aparecem tanto na barra fixa quanto na folha de resultados
    const sElements = screen.getAllByText(/4\.456/);
    expect(sElements.length).toBeGreaterThanOrEqual(1);

    const fElements = screen.getAllByText(/1\.070/);
    expect(fElements.length).toBeGreaterThanOrEqual(1);

    // 7. Teste de ajuste tátil de +/- 5% em S
    const btnIncS = screen.getByRole('button', { name: /aumentar rotação em 5 por cento/i });
    fireEvent.click(btnIncS);

    // Verifica que offset de ajuste foi registrado
    expect(screen.getByText(/ajuste \+5 %/i)).toBeDefined();

    // 8. Fecha a folha de resultados
    const btnClose = screen.getByRole('button', { name: /fechar resultados/i });
    fireEvent.click(btnClose);

    // Folha fechada, mas barra fixa inferior mantém métricas sincronizadas
    expect(screen.queryByRole('dialog', { name: /resultados calculados/i })).toBeNull();
    expect(screen.getByText(/detalhes/i)).toBeDefined();
  });
});
