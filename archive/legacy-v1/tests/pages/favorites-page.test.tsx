import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesPage } from '@/pages/favorites-page';
import { useFavoritesStore } from '@/store/favorites-store';
import { useMachiningStore } from '@/store/machining-store';
import { TipoUsinagem } from '@/types';
import type { ResultadoUsinagem, Ferramenta, ParametrosUsinagem } from '@/types';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const MOCK_FERRAMENTA: Ferramenta = {
  tipo: 'toroidal', diametro: 10, numeroArestas: 4, balanco: 30, raioQuina: 1.0,
};
const MOCK_PARAMS: ParametrosUsinagem = { ap: 2, ae: 5, fz: 0.1, vc: 100 };
const MOCK_RESULT: ResultadoUsinagem = {
  rpm: 3183, avanco: 1273, potenciaCorte: 0.85, potenciaMotor: 0.68, torque: 2.04,
  mrr: 12.7, vcReal: 100, fzEfetivo: 0.1,
  seguranca: { nivel: 'verde', avisos: [], razaoLD: 3.0, ctf: 1 },
  powerHeadroom: 95, healthScore: 80,
};

function addFav(materialNome = 'Aço 1045', tipoOperacao = TipoUsinagem.DESBASTE, materialId = 2) {
  useFavoritesStore.getState().addFavorite({
    materialId, materialNome, tipoOperacao,
    ferramenta: { ...MOCK_FERRAMENTA },
    parametros: { ...MOCK_PARAMS },
    resultado: { ...MOCK_RESULT },
    safetyFactor: 0.8,
  });
}

function renderPage() {
  return render(<BrowserRouter><FavoritesPage /></BrowserRouter>);
}

describe('FavoritesPage', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] });
    mockNavigate.mockClear();
  });

  it('shows empty state when no favorites', () => {
    renderPage();
    expect(screen.getByText(/Nenhum favorito salvo/)).toBeInTheDocument();
  });

  it('shows CTA button when empty', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /Simular agora/ })).toBeInTheDocument();
  });

  it('navigates to / when clicking CTA button', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Simular agora/ }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows favorite count in header', () => {
    addFav();
    addFav('Alumínio 6061');
    renderPage();
    expect(screen.getByText('2 favoritos')).toBeInTheDocument();
  });

  it('shows material name of favorites', () => {
    addFav('Aço 1045');
    renderPage();
    // May appear in both the card and the material dropdown option
    expect(screen.getAllByText('Aço 1045').length).toBeGreaterThanOrEqual(1);
  });

  it('shows safety badge', () => {
    addFav();
    renderPage();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('shows RPM value in summary', () => {
    addFav();
    renderPage();
    expect(screen.getByText('3.183')).toBeInTheDocument();
  });

  it('expands card on click to show details', () => {
    addFav('Aço 1045');
    renderPage();
    // Click the card row (role=button) - the summary div
    const cardButton = screen.getAllByRole('button').find(
      (el) => el.getAttribute('tabindex') === '0',
    );
    fireEvent.click(cardButton!);
    expect(screen.getByText('Usar')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Remover')).toBeInTheDocument();
  });

  it('shows param grid when expanded', () => {
    addFav();
    renderPage();
    const cardButton = screen.getAllByRole('button').find(
      (el) => el.getAttribute('tabindex') === '0',
    );
    fireEvent.click(cardButton!);
    // Vc label and value visible in expanded detail grid
    expect(screen.getByText('Vc')).toBeInTheDocument();
    expect(screen.getAllByText('100 m/min').length).toBeGreaterThanOrEqual(1);
  });

  it('filters by text search — material name', () => {
    addFav('Aço 1045');
    addFav('Alumínio 6061');
    renderPage();
    const input = screen.getByPlaceholderText(/Material ou ferramenta/);
    fireEvent.change(input, { target: { value: 'alumínio' } });
    // Only 1 card visible (1 SEGURO badge) — dropdown options persist but card count drops
    expect(screen.getAllByText('SEGURO')).toHaveLength(1);
    // Alumínio 6061 still visible (in card + option), Aço 1045 still in option but not as card
    expect(screen.getAllByText('Alumínio 6061').length).toBeGreaterThanOrEqual(1);
  });

  it('filters by material dropdown', () => {
    addFav('Aço 1045');
    addFav('Alumínio 6061');
    renderPage();
    const selects = screen.getAllByRole('combobox');
    // Material select is the first combobox
    fireEvent.change(selects[0], { target: { value: 'Aço 1045' } });
    // Only 1 card remains (1 safety badge)
    expect(screen.getAllByText('SEGURO')).toHaveLength(1);
  });

  it('filters by operação dropdown', () => {
    addFav('Aço 1045', TipoUsinagem.DESBASTE);
    addFav('Aço 1045', TipoUsinagem.ACABAMENTO);
    renderPage();
    const selects = screen.getAllByRole('combobox');
    // Operação select is the second combobox
    fireEvent.change(selects[1], { target: { value: TipoUsinagem.ACABAMENTO } });
    // Only the acabamento card remains (1 safety badge)
    expect(screen.getAllByText('SEGURO')).toHaveLength(1);
    // Acabamento label visible in card (appears in card subtitle + dropdown option)
    expect(screen.getAllByText('Acabamento').length).toBeGreaterThanOrEqual(1);
  });

  it('shows filtered empty state when no matches', () => {
    addFav('Aço 1045');
    renderPage();
    const input = screen.getByPlaceholderText(/Material ou ferramenta/);
    fireEvent.change(input, { target: { value: 'titanio' } });
    expect(screen.getByText(/Nenhum favorito com os filtros/)).toBeInTheDocument();
  });

  it('shows inline confirmation when clicking Remover (not window.confirm)', () => {
    // Ensure window.confirm is NOT called
    const confirmSpy = vi.spyOn(window, 'confirm');
    addFav();
    renderPage();
    const cardButton = screen.getAllByRole('button').find(
      (el) => el.getAttribute('tabindex') === '0',
    );
    fireEvent.click(cardButton!);
    fireEvent.click(screen.getByText('Remover'));
    expect(screen.getByText(/Confirmar remoção/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sim' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Não' })).toBeInTheDocument();
    expect(confirmSpy).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });

  it('removes favorite after confirming', () => {
    addFav('Aço 1045');
    renderPage();
    const cardButton = screen.getAllByRole('button').find(
      (el) => el.getAttribute('tabindex') === '0',
    );
    fireEvent.click(cardButton!);
    fireEvent.click(screen.getByText('Remover'));
    fireEvent.click(screen.getByRole('button', { name: 'Sim' }));
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
    expect(screen.getByText(/Nenhum favorito salvo/)).toBeInTheDocument();
  });

  it('cancels removal when clicking Não', () => {
    addFav('Aço 1045');
    renderPage();
    const cardButton = screen.getAllByRole('button').find(
      (el) => el.getAttribute('tabindex') === '0',
    );
    fireEvent.click(cardButton!);
    fireEvent.click(screen.getByText('Remover'));
    fireEvent.click(screen.getByRole('button', { name: 'Não' }));
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    expect(screen.queryByText(/Confirmar remoção/)).not.toBeInTheDocument();
  });

  it('loads params to machining store and navigates when clicking Usar', () => {
    addFav('Aço 1045');
    renderPage();
    const cardButton = screen.getAllByRole('button').find(
      (el) => el.getAttribute('tabindex') === '0',
    );
    fireEvent.click(cardButton!);
    fireEvent.click(screen.getByText('Usar'));
    const state = useMachiningStore.getState();
    expect(state.parametros.vc).toBe(100);
    expect(state.parametros.fz).toBe(0.1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('opens FavoriteEditModal when clicking Editar', () => {
    addFav('Aço 1045');
    renderPage();
    const cardButton = screen.getAllByRole('button').find(
      (el) => el.getAttribute('tabindex') === '0',
    );
    fireEvent.click(cardButton!);
    fireEvent.click(screen.getByText('Editar'));
    expect(screen.getByText('Editar Favorito')).toBeInTheDocument();
  });

  it('navigates back to / when clicking Voltar', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Voltar/ }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows singular "favorito" when count is 1', () => {
    addFav();
    renderPage();
    expect(screen.getByText('1 favorito')).toBeInTheDocument();
  });
});
