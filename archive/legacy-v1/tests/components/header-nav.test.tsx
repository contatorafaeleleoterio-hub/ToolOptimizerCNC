import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HeaderNav } from '@/components/header-nav';
import { useHistoryStore } from '@/store';

function renderNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <HeaderNav />
    </MemoryRouter>
  );
}

describe('HeaderNav', () => {
  beforeEach(() => {
    useHistoryStore.getState().clearHistory();
  });

  it('renders all 4 nav items', () => {
    renderNav();
    expect(screen.getByText('Calcular')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Histórico')).toBeInTheDocument();
    expect(screen.getByText('Config')).toBeInTheDocument();
  });

  it('links point to the correct routes', () => {
    renderNav();
    expect(screen.getByText('Calcular').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Favoritos').closest('a')).toHaveAttribute('href', '/favoritos');
    expect(screen.getByText('Histórico').closest('a')).toHaveAttribute('href', '/history');
    expect(screen.getByText('Config').closest('a')).toHaveAttribute('href', '/settings');
  });

  it('marks Calcular as active on "/" and nothing else', () => {
    renderNav('/');
    expect(screen.getByText('Calcular').closest('a')).toHaveClass('text-primary');
    expect(screen.getByText('Favoritos').closest('a')).not.toHaveClass('text-primary');
  });

  it('marks Histórico as active on "/history"', () => {
    renderNav('/history');
    expect(screen.getByText('Histórico').closest('a')).toHaveClass('text-primary');
    expect(screen.getByText('Calcular').closest('a')).not.toHaveClass('text-primary');
  });

  it('hides history badge when there are no entries', () => {
    renderNav();
    const link = screen.getByText('Histórico').closest('a')!;
    expect(within(link).queryByTestId('count-badge')).not.toBeInTheDocument();
  });

  it('shows history badge count when entries exist', () => {
    useHistoryStore.getState().addEntry({
      materialId: 'aco-carbono',
      materialNome: 'Aço Carbono',
      ferramenta: { tipo: 'topo', diametro: 10, raio: 0, altura: 30, numeroArestas: 4 },
      tipoOperacao: 'desbaste' as never,
      parametros: { vc: 150, fz: 0.05, ap: 2, ae: 5, comprimento: 30 },
      resultado: { rpm: 4775, avanco: 955, potenciaCorte: 1, potenciaMotor: 1.5, torque: 3, mrr: 10, vcReal: 150, fzEfetivo: 0.05, seguranca: { nivel: 'verde', avisos: [], razaoLD: 3, ctf: 1 }, powerHeadroom: 90, healthScore: 80 },
    });
    renderNav();
    const link = screen.getByText('Histórico').closest('a')!;
    expect(link.textContent).toContain('1');
  });
});
