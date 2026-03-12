import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileArchitectureView } from '@/components/architecture/mobile-architecture-view';
import { ARCHITECTURE_GRAPH } from '@/data/architecture-graph';

const mockOnBack = vi.fn();

function renderView() {
  return render(
    <BrowserRouter>
      <MobileArchitectureView onBack={mockOnBack} />
    </BrowserRouter>,
  );
}

describe('MobileArchitectureView', () => {
  beforeEach(() => {
    mockOnBack.mockClear();
  });

  it('renders header with title and version', () => {
    renderView();
    expect(screen.getByText('Arquitetura')).toBeInTheDocument();
    // Version appears in both header badge and footer
    const versionElements = screen.getAllByText(`v${ARCHITECTURE_GRAPH.metadata.version}`);
    expect(versionElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all three tab buttons', () => {
    renderView();
    expect(screen.getByText('Visao Geral')).toBeInTheDocument();
    expect(screen.getByText('Modulos')).toBeInTheDocument();
    expect(screen.getByText('Fluxo')).toBeInTheDocument();
  });

  it('renders all 8 group cards in overview tab', () => {
    renderView();
    for (const group of ARCHITECTURE_GRAPH.groups) {
      // Some labelPt values may appear multiple times (e.g. "Hooks" as both label and labelPt)
      const elements = screen.getAllByText(group.labelPt);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('shows footer with metadata stats', () => {
    renderView();
    expect(screen.getByText(`${ARCHITECTURE_GRAPH.metadata.totalFiles} arquivos`)).toBeInTheDocument();
  });

  it('navigates to modules tab on group card tap', () => {
    renderView();
    fireEvent.click(screen.getByText('Entrada'));
    // After clicking group card, should switch to modules tab
    expect(screen.getByText('Mapa')).toBeInTheDocument(); // breadcrumb
  });

  it('shows node list when group is selected in modules tab', () => {
    renderView();
    // Click on Entry group card
    fireEvent.click(screen.getByText('Entrada'));
    // Should show the entry nodes
    expect(screen.getByText('main.tsx')).toBeInTheDocument();
    expect(screen.getByText('App.tsx')).toBeInTheDocument();
  });

  it('navigates back to overview from node list', () => {
    renderView();
    // Navigate to modules
    fireEvent.click(screen.getByText('Entrada'));
    // Click back
    const backButton = screen.getByText('Mapa');
    fireEvent.click(backButton);
    // Should be back to overview (all groups visible)
    expect(screen.getByText('Visao Geral')).toBeInTheDocument();
  });

  it('shows data flow pipeline on flow tab', () => {
    renderView();
    fireEvent.click(screen.getByText('Fluxo'));
    expect(screen.getByText('Fluxo de Dados do calcular()')).toBeInTheDocument();
    expect(screen.getByText('calculateRPM()')).toBeInTheDocument();
    expect(screen.getByText('calculatePower()')).toBeInTheDocument();
  });

  it('calls onBack when back button is pressed', () => {
    renderView();
    const backButtons = screen.getAllByRole('button');
    const headerBack = backButtons.find(
      (btn) => btn.querySelector('.material-symbols-outlined')?.textContent === 'arrow_back',
    );
    if (headerBack) {
      fireEvent.click(headerBack);
      expect(mockOnBack).toHaveBeenCalledOnce();
    }
  });

  it('shows modules selection prompt when no group is selected', () => {
    renderView();
    fireEvent.click(screen.getByText('Modulos'));
    expect(screen.getByText('Selecione um grupo para explorar seus modulos:')).toBeInTheDocument();
  });
});
