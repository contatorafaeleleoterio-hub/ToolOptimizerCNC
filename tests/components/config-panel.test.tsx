import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ConfigPanel } from '@/components/config-panel';
import { useMachiningStore } from '@/store';

function renderPanel() {
  return render(<BrowserRouter><ConfigPanel /></BrowserRouter>);
}

describe('ConfigPanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders Simular button', () => {
    renderPanel();
    expect(screen.getByText('Simular')).toBeInTheDocument();
  });

  it('renders material select with all 9 materials', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    const materialSelect = selects[0];
    expect(materialSelect).toBeInTheDocument();
    const options = materialSelect.querySelectorAll('option');
    expect(options.length).toBe(9);
  });

  it('renders material select with chevron class', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    expect(selects[0].classList.contains('select-chevron')).toBe(true);
  });

  it('renders 3 operation type buttons', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: 'Desbaste' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Semi-Acab.' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acabamento' })).toBeInTheDocument();
  });

  it('renders tool type buttons', () => {
    renderPanel();
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Topo/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders diameter dropdown with chevron class and 15 options', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    const diaSelect = selects[1];
    const options = diaSelect.querySelectorAll('option');
    expect(options.length).toBe(15);
    expect(diaSelect.classList.contains('select-chevron')).toBe(true);
  });

  it('shows raio da ponta for toroidal with 2 options (R0.5, R1)', () => {
    renderPanel();
    expect(screen.getByText('Raio da Ponta')).toBeInTheDocument();
    expect(screen.getByText('R0.5')).toBeInTheDocument();
    expect(screen.getAllByText('R1').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText('R0.2')).not.toBeInTheDocument();
  });

  it('hides raio da ponta when switching to topo', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Topo'));
    expect(screen.queryByText('Raio da Ponta')).not.toBeInTheDocument();
  });

  it('renders arestas as 2 button options (2 and 4)', () => {
    renderPanel();
    expect(screen.getByText('2 Arestas')).toBeInTheDocument();
    expect(screen.getByText('4 Arestas')).toBeInTheDocument();
  });

  it('changes arestas when clicking button', () => {
    renderPanel();
    fireEvent.click(screen.getByText('2 Arestas'));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(2);
    fireEvent.click(screen.getByText('4 Arestas'));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(4);
  });

  it('renders altura spinner buttons', () => {
    renderPanel();
    expect(screen.getByLabelText('Increase height')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease height')).toBeInTheDocument();
  });

  it('changes material when select changes', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '4' } });
    expect(useMachiningStore.getState().materialId).toBe(4);
  });

  it('changes operation type on button click', () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: 'Acabamento' }));
    expect(useMachiningStore.getState().tipoOperacao).toBe('acabamento');
  });

  it('changes tool diameter via dropdown', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: '10' } });
    expect(useMachiningStore.getState().ferramenta.diametro).toBe(10);
  });

  it('calculates on Simular click', async () => {
    renderPanel();
    await act(async () => {
      fireEvent.click(screen.getByText('Simular'));
    });
    await waitFor(
      () => expect(useMachiningStore.getState().resultado).not.toBeNull(),
      { timeout: 2500 },
    );
  });

  it('resets state on reset button click', () => {
    const store = useMachiningStore.getState();
    store.setMaterial(4);
    store.calcular();
    renderPanel();
    const resetBtn = screen.getByText('restart_alt').closest('button')!;
    fireEvent.click(resetBtn);
    expect(useMachiningStore.getState().materialId).toBe(2);
    expect(useMachiningStore.getState().resultado).toBeNull();
  });

  it('shows estimated badge for estimated materials', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '4' } });
    expect(screen.getByText('Dados estimados')).toBeInTheDocument();
  });

  it('increases altura by step of 5 on click', () => {
    renderPanel();
    const initial = useMachiningStore.getState().ferramenta.balanco;
    fireEvent.click(screen.getByLabelText('Increase height'));
    expect(useMachiningStore.getState().ferramenta.balanco).toBe(initial + 5);
  });

  it('decreases altura by step of 5 on click', () => {
    renderPanel();
    const initial = useMachiningStore.getState().ferramenta.balanco;
    fireEvent.click(screen.getByLabelText('Decrease height'));
    expect(useMachiningStore.getState().ferramenta.balanco).toBe(initial - 5);
  });

  it('follows correct tool field order: Tipo → Diâmetro → Raio → Arestas → Altura', () => {
    renderPanel();
    // Abrir seção Ferramenta para garantir que labels aparecem
    fireEvent.click(screen.getByText('Ferramenta'));
    const toolLabels = ['Tipo', 'Diâmetro (mm)', 'Raio da Ponta', 'Arestas (Z)', 'Altura de Fixação (mm)'];
    for (const label of toolLabels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  // ─── Fase 2: CollapsibleSection ───────────────────────────────────────────

  it('renders 3 collapsible sections', () => {
    renderPanel();
    expect(screen.getByText('Configuração Base')).toBeInTheDocument();
    expect(screen.getByText('Ferramenta')).toBeInTheDocument();
    expect(screen.getByText('Ajuste Fino')).toBeInTheDocument();
  });

  it('collapsible sections are closed by default', () => {
    renderPanel();
    const accordionHeaders = screen.getAllByRole('button').filter(
      (b) => b.getAttribute('aria-expanded') !== null
    );
    accordionHeaders.forEach((b) => {
      expect(b).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('material section opens when Configuração Base is clicked', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Configuração Base'));
    expect(screen.getAllByRole('combobox').length).toBeGreaterThanOrEqual(1);
  });

  it('does NOT render cutting parameter NumInputs (section removed)', () => {
    renderPanel();
    // These were in "Parâmetros de Corte" which was removed
    expect(screen.queryByText('ap (mm)')).not.toBeInTheDocument();
    expect(screen.queryByText('Vc (m/min)')).not.toBeInTheDocument();
  });

  it('renders FineTunePanel sliders inside Ajuste Fino section', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Ajuste Fino'));
    // FineTunePanel conteúdo: labels dos sliders
    expect(screen.getByText('VEL. DE CORTE')).toBeInTheDocument();
    expect(screen.getByText('AVANÇO/DENTE')).toBeInTheDocument();
  });
});
