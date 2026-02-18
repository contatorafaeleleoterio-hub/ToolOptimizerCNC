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
    expect(screen.getByText(/ToolOptimizer/)).toBeInTheDocument();
    expect(screen.getByText('CNC')).toBeInTheDocument();
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

  it('renders tool type buttons', () => {
    renderMobile();
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Esférica').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Topo').length).toBeGreaterThanOrEqual(1);
  });

  it('renders fine tune sliders', () => {
    renderMobile();
    expect(screen.getAllByLabelText(/Vc value/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText(/fz value/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders ToolSummaryViewer', () => {
    renderMobile();
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  it('shows placeholder when no results', () => {
    renderMobile();
    expect(screen.getByText(/Configure os parâmetros/)).toBeInTheDocument();
  });

  it('shows results after simulation', async () => {
    renderMobile();
    fireEvent.click(screen.getByRole('button', { name: /simular/i }));
    await waitFor(() => {
      expect(screen.getByText(/SEGURO|ALERTA|CRÍTICO|BLOQUEADO/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('renders operation type radio buttons', () => {
    renderMobile();
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBeGreaterThanOrEqual(3);
  });
});
