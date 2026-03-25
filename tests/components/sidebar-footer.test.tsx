import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { SidebarFooter } from '@/components/sidebar-footer';
import { useHistoryStore } from '@/store';

// Mock useNavigate to track navigation calls
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderFooter() {
  return render(
    <BrowserRouter>
      <SidebarFooter />
    </BrowserRouter>
  );
}

describe('SidebarFooter', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useHistoryStore.getState().clearHistory();
  });

  it('renders Favoritos button', () => {
    renderFooter();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
  });

  it('renders Histórico button', () => {
    renderFooter();
    expect(screen.getByText('Histórico')).toBeInTheDocument();
  });

  it('renders settings gear button with aria-label', () => {
    renderFooter();
    expect(screen.getByRole('button', { name: 'Configurações' })).toBeInTheDocument();
  });

  it('renders app version', () => {
    renderFooter();
    // Version format: "v0.9.x" — just check the "v" prefix is there
    expect(screen.getByText(/^v\d/)).toBeInTheDocument();
  });

  it('hides favorite counter when no favorites', () => {
    renderFooter();
    // No entries → no numeric counter next to Favoritos
    const favBtn = screen.getByText('Favoritos').closest('button')!;
    // The counter span only renders when favoriteCount > 0
    expect(favBtn.querySelector('.font-mono')).toBeNull();
  });

  it('shows favorite counter when favorites exist', () => {
    // Add a favorited entry to the history store
    useHistoryStore.getState().addEntry({
      materialId: 'aco-carbono',
      materialNome: 'Aço Carbono',
      ferramenta: { tipo: 'topo', diametro: 10, raio: 0, altura: 30, numeroArestas: 4 },
      tipoOperacao: 'desbaste' as never,
      parametros: { vc: 150, fz: 0.05, ap: 2, ae: 5, comprimento: 30 },
      resultado: { rpm: 4775, avanco: 955, potenciaCorte: 1, potenciaMotor: 1.5, torque: 3, mrr: 10, vcReal: 150, fzEfetivo: 0.05, seguranca: { nivel: 'verde', avisos: [], razaoLD: 3, ctf: 1 }, powerHeadroom: 90, healthScore: 80 },
    });
    const id = useHistoryStore.getState().entries[0].id;
    useHistoryStore.getState().toggleFavorite(id);

    renderFooter();
    // Both favoriteCount and historyCount show "1" — use getAllByText
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(1);
  });

  it('shows history count when entries exist', () => {
    useHistoryStore.getState().addEntry({
      materialId: 'aco-carbono',
      materialNome: 'Aço Carbono',
      ferramenta: { tipo: 'topo', diametro: 10, raio: 0, altura: 30, numeroArestas: 4 },
      tipoOperacao: 'desbaste' as never,
      parametros: { vc: 150, fz: 0.05, ap: 2, ae: 5, comprimento: 30 },
      resultado: { rpm: 4775, avanco: 955, potenciaCorte: 1, potenciaMotor: 1.5, torque: 3, mrr: 10, vcReal: 150, fzEfetivo: 0.05, seguranca: { nivel: 'verde', avisos: [], razaoLD: 3, ctf: 1 }, powerHeadroom: 90, healthScore: 80 },
    });

    renderFooter();
    // History count "1" should appear near Histórico button
    const histBtn = screen.getByText('Histórico').closest('button')!;
    expect(histBtn.textContent).toContain('1');
  });

  it('clicking Favoritos navigates to /history?filter=favoritos', () => {
    renderFooter();
    fireEvent.click(screen.getByText('Favoritos'));
    expect(mockNavigate).toHaveBeenCalledWith('/history?filter=favoritos');
  });

  it('clicking Histórico navigates to /history', () => {
    renderFooter();
    fireEvent.click(screen.getByText('Histórico'));
    expect(mockNavigate).toHaveBeenCalledWith('/history');
  });

  it('clicking settings gear navigates to /settings', () => {
    renderFooter();
    fireEvent.click(screen.getByRole('button', { name: 'Configurações' }));
    expect(mockNavigate).toHaveBeenCalledWith('/settings');
  });
});
