import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MobilePage } from '@/pages/mobile-page';
import { useMachiningStore } from '@/store';

function renderMobile() {
  return render(
    <BrowserRouter>
      <MobilePage />
    </BrowserRouter>,
  );
}

describe('MobilePage', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
    document.body.classList.remove('mobile-active');
  });

  it('renders mobile header with title', () => {
    renderMobile();
    expect(screen.getByAltText('ToolOptimizer CNC')).toBeInTheDocument();
  });

  it('adds mobile-active class to body on mount', () => {
    renderMobile();
    expect(document.body.classList.contains('mobile-active')).toBe(true);
  });

  it('removes mobile-active class from body on unmount', () => {
    const { unmount } = renderMobile();
    expect(document.body.classList.contains('mobile-active')).toBe(true);
    unmount();
    expect(document.body.classList.contains('mobile-active')).toBe(false);
  });

  it('renders disclaimer text', () => {
    renderMobile();
    expect(screen.getByText(/RECOMENDA/)).toBeInTheDocument();
    expect(screen.getByText(/DECIDE/)).toBeInTheDocument();
  });

  it('renders Simular button', () => {
    renderMobile();
    expect(screen.getByRole('button', { name: /simular/i })).toBeInTheDocument();
  });

  it('renders material select with 9 materials', () => {
    renderMobile();
    const selects = screen.getAllByRole('combobox');
    const materialSelect = selects[0];
    expect(materialSelect.querySelectorAll('option').length).toBe(9);
  });

  it('renders tool type buttons (inside Ferramenta accordion)', () => {
    renderMobile();
    fireEvent.click(screen.getByText('Ferramenta'));
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Esférica/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Topo/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders fine tune sliders (Ajustar tab)', () => {
    renderMobile();
    fireEvent.click(screen.getByRole('tab', { name: /ajustar/i }));
    expect(screen.getAllByLabelText(/Vc value/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText(/fz value/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders ToolSummaryViewer (Resultados tab)', () => {
    renderMobile();
    fireEvent.click(screen.getByRole('tab', { name: /resultados/i }));
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  it('shows placeholder when no results (Resultados tab)', () => {
    renderMobile();
    fireEvent.click(screen.getByRole('tab', { name: /resultados/i }));
    expect(screen.getByText(/Configure os parâmetros/)).toBeInTheDocument();
  });

  it('shows results after simulation (auto-switches to Resultados tab)', async () => {
    renderMobile();
    fireEvent.click(screen.getByRole('button', { name: /simular/i }));
    await waitFor(() => {
      expect(screen.getByText(/SEGURO|ALERTA|CRÍTICO|BLOQUEADO/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('renders operation type radio buttons', () => {
    renderMobile();
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBeGreaterThanOrEqual(3);
  });

  // Health bar integration — mobile parity (Ajustar tab)
  it('renders health bars for ae and ap in mobile fine tune (Ajustar tab)', () => {
    renderMobile();
    fireEvent.click(screen.getByRole('tab', { name: /ajustar/i }));
    expect(screen.getByTestId('health-bar-ae')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ap')).toBeInTheDocument();
  });

  it('vc bar always active; fz bar shows inactive state before simulation (Ajustar tab)', () => {
    renderMobile();
    fireEvent.click(screen.getByRole('tab', { name: /ajustar/i }));
    // vc is now always active (value-based, no simulation needed)
    expect(screen.queryByTestId('health-bar-vc-inactive')).not.toBeInTheDocument();
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
    // fz still requires simulation
    expect(screen.getByTestId('health-bar-fz-inactive')).toBeInTheDocument();
  });
});
