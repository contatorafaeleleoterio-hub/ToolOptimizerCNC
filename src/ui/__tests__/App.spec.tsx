// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component — Inicialização da Toolchain UI (TASK-009)', () => {
  it('deve renderizar a casca principal com a marca TOOLOPTIMIZER', () => {
    render(<App />);
    const brandElement = screen.getByRole('img', { name: /marca tooloptimizer/i });
    expect(brandElement).toBeDefined();
    expect(brandElement.textContent).toBe('TOOLOPTIMIZER');
  });

  it('deve conter a navegação das 4 famílias canônicas', () => {
    render(<App />);
    expect(screen.getByRole('tab', { name: /fresar/i })).toBeDefined();
    expect(screen.getByRole('tab', { name: /furar/i })).toBeDefined();
    expect(screen.getByRole('tab', { name: /roscar/i })).toBeDefined();
    expect(screen.getByRole('tab', { name: /mandrilar/i })).toBeDefined();
  });

  // Defeito K da especificação estrutural do painel, reproduzido na casca:
  // havia role="tablist" e quatro role="tab", e faltava tudo que faz o padrão
  // funcionar — o tabpanel, o aria-controls que liga aba e painel, a navegação
  // por seta e o título de documento. R10 do brief: tudo que se faz com o
  // ponteiro se faz pelo teclado.
  it('Defeito K: o padrão ARIA de abas está completo e há título de documento', () => {
    render(<App />);

    // um h1, para o leitor de tela ter onde ancorar
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);

    // cada aba aponta para o painel que ela controla
    const painel = document.getElementById('view-calculo');
    expect(painel).not.toBeNull();
    expect(painel?.getAttribute('role')).toBe('tabpanel');
    tabs.forEach((t) => expect(t.getAttribute('aria-controls')).toBe('view-calculo'));

    // o painel diz qual aba o nomeia
    const selecionada = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    expect(selecionada).toBeDefined();
    expect(painel?.getAttribute('aria-labelledby')).toBe(selecionada?.id);

    // roving tabindex: só a selecionada entra na ordem de foco
    expect(selecionada?.getAttribute('tabindex')).toBe('0');
    tabs.filter((t) => t !== selecionada)
        .forEach((t) => expect(t.getAttribute('tabindex')).toBe('-1'));

    // seta direita anda para a próxima família
    fireEvent.keyDown(selecionada!, { key: 'ArrowRight' });
    const depois = screen.getAllByRole('tab').find((t) => t.getAttribute('aria-selected') === 'true');
    expect(depois?.id).not.toBe(selecionada?.id);

    // e a seta esquerda volta
    fireEvent.keyDown(depois!, { key: 'ArrowLeft' });
    const voltou = screen.getAllByRole('tab').find((t) => t.getAttribute('aria-selected') === 'true');
    expect(voltou?.id).toBe(selecionada?.id);
  });
});
