import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HistoryPage } from '@/pages/history-page';
import { useHistoryStore } from '@/store/history-store';
import { TipoUsinagem } from '@/types';
import type { ResultadoUsinagem, Ferramenta, ParametrosUsinagem } from '@/types';

const MOCK_FERRAMENTA: Ferramenta = {
  tipo: 'toroidal', diametro: 10, numeroArestas: 4, balanco: 30, raioQuina: 1.0,
};
const MOCK_PARAMS: ParametrosUsinagem = { ap: 2, ae: 5, fz: 0.1, vc: 100 };
const MOCK_RESULT: ResultadoUsinagem = {
  rpm: 3183, avanco: 1273, potenciaCorte: 0.85, potenciaMotor: 0.68, torque: 2.04,
  mrr: 12.7, vcReal: 100, fzEfetivo: 0.1, forcaCorte: 2000,
  seguranca: { nivel: 'verde', avisos: [], razaoLD: 3.0, ctf: 1 },
};

function addTestEntry(materialNome = 'Aço 1045') {
  useHistoryStore.getState().addEntry({
    materialNome, materialId: 2,
    ferramenta: { ...MOCK_FERRAMENTA },
    tipoOperacao: TipoUsinagem.DESBASTE,
    parametros: { ...MOCK_PARAMS },
    resultado: { ...MOCK_RESULT },
  });
}

function renderPage() {
  return render(<BrowserRouter><HistoryPage /></BrowserRouter>);
}

describe('HistoryPage', () => {
  beforeEach(() => {
    useHistoryStore.getState().clearHistory();
    useHistoryStore.getState().resetFilters();
  });

  it('shows empty state when no history', () => {
    renderPage();
    expect(screen.getByText(/Nenhum cálculo registrado/)).toBeInTheDocument();
  });

  it('shows history header', () => {
    renderPage();
    expect(screen.getByText('Histórico de Cálculos')).toBeInTheDocument();
  });

  it('shows entry count', () => {
    addTestEntry();
    addTestEntry();
    renderPage();
    expect(screen.getByText('2 registros')).toBeInTheDocument();
  });

  it('shows entry material name', () => {
    addTestEntry('Aço 1045');
    renderPage();
    expect(screen.getByText('Aço 1045')).toBeInTheDocument();
  });

  it('shows entry RPM value', () => {
    addTestEntry();
    renderPage();
    expect(screen.getByText('3,183')).toBeInTheDocument();
  });

  it('shows safety badge', () => {
    addTestEntry();
    renderPage();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('expands entry on click to show details', () => {
    addTestEntry();
    renderPage();
    // Click the entry row to expand
    fireEvent.click(screen.getByText('Aço 1045'));
    expect(screen.getByText('Restaurar Parâmetros')).toBeInTheDocument();
    expect(screen.getByText('Remover')).toBeInTheDocument();
  });

  it('shows feedback buttons when expanded', () => {
    addTestEntry();
    renderPage();
    fireEvent.click(screen.getByText('Aço 1045'));
    // Feedback labels appear in both filter dropdown and expanded buttons
    expect(screen.getAllByText('Sucesso').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Quebra').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Acabamento Ruim').length).toBeGreaterThanOrEqual(2);
  });

  it('removes an entry', () => {
    addTestEntry();
    renderPage();
    fireEvent.click(screen.getByText('Aço 1045'));
    fireEvent.click(screen.getByText('Remover'));
    expect(screen.getByText(/Nenhum cálculo registrado/)).toBeInTheDocument();
  });

  it('filters section exists', () => {
    renderPage();
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar material...')).toBeInTheDocument();
  });
});
