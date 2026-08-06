import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileConfigSection } from '@/components/mobile/mobile-config-section';
import { useMachiningStore } from '@/store';

function renderSection() {
  return render(
    <BrowserRouter>
      <MobileConfigSection />
    </BrowserRouter>,
  );
}

/** Opens the "⚙ Ajuste avançado" accordion — content stays mounted either way,
 *  but tests open it explicitly to mirror real user interaction. */
function openAdvanced() {
  fireEvent.click(screen.getByText(/Ajuste avançado/i));
}

describe('MobileConfigSection', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
    localStorage.clear();
  });

  it('renders material select with 9 options', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    const materialSelect = selects[0];
    expect(materialSelect.querySelectorAll('option').length).toBe(9);
  });

  it('renders 3 operation type radios (Desbaste, Semi-Acab., Acabamento)', () => {
    renderSection();
    expect(screen.getByText('Desbaste')).toBeInTheDocument();
    expect(screen.getByText('Semi-Acab.')).toBeInTheDocument();
    expect(screen.getByText('Acabamento')).toBeInTheDocument();
  });

  it('renders tool type buttons without needing to open an accordion (5 essential inputs)', () => {
    renderSection();
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Topo/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders diameter free input (not dropdown)', () => {
    renderSection();
    expect(screen.getByLabelText('Diâmetro (mm)')).toBeInTheDocument();
  });

  it('renders flute count (Z) stepper with current value', () => {
    renderSection();
    expect(screen.getByLabelText('Número de arestas atual')).toHaveTextContent('4');
    expect(screen.getByLabelText('Aumentar número de arestas')).toBeInTheDocument();
    expect(screen.getByLabelText('Diminuir número de arestas')).toBeInTheDocument();
  });

  it('renders altura de fixação free input', () => {
    renderSection();
    expect(screen.getByLabelText('Altura de Fixação (mm)')).toBeInTheDocument();
  });

  it('renders the 4 cutting-parameter sliders (Vc/fz/ae/ap) always visible, before simulating', () => {
    renderSection();
    const section = screen.getByTestId('cutting-params-section');
    expect(within(section).getByText('Parâmetros de Corte')).toBeInTheDocument();
    expect(within(section).getAllByRole('slider')).toHaveLength(4);
  });

  it('changes fz when its slider value input changes', () => {
    renderSection();
    fireEvent.change(screen.getByLabelText('fz value'), { target: { value: '0.08' } });
    expect(useMachiningStore.getState().parametros.fz).toBeCloseTo(0.08);
  });

  it('shows Raio da Ponta inside Ajuste avançado for toroidal (default)', () => {
    renderSection();
    openAdvanced();
    expect(screen.getByLabelText('Raio da Ponta (mm)')).toBeInTheDocument();
  });

  it('hides Raio da Ponta when switching to topo', () => {
    renderSection();
    openAdvanced();
    const topoBtn = screen.getAllByText(/^Topo/)[0];
    fireEvent.click(topoBtn);
    expect(screen.queryByLabelText('Raio da Ponta (mm)')).not.toBeInTheDocument();
  });

  it('changes material when select value changes', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '3' } });
    expect(useMachiningStore.getState().materialId).toBe(3);
  });

  it('changes flute count when clicking the stepper − button', () => {
    renderSection();
    fireEvent.click(screen.getByLabelText('Diminuir número de arestas'));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(3);
  });

  it('flute count stepper never lands outside [2, 3, 4, 6] — no 5', () => {
    renderSection();
    fireEvent.click(screen.getByLabelText('Aumentar número de arestas'));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(6);
    expect(screen.getByLabelText('Aumentar número de arestas')).toBeDisabled();
  });

  it('flute count stepper − button disables at the bottom of the catalog [2]', () => {
    renderSection();
    fireEvent.click(screen.getByLabelText('Diminuir número de arestas'));
    fireEvent.click(screen.getByLabelText('Diminuir número de arestas'));
    expect(useMachiningStore.getState().ferramenta.numeroArestas).toBe(2);
    expect(screen.getByLabelText('Diminuir número de arestas')).toBeDisabled();
  });

  it('shows estimated badge for estimated material', () => {
    renderSection();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '4' } });
    expect(screen.getByText('Dados estimados')).toBeInTheDocument();
  });

  it('renders Ajuste avançado accordion with safety factor summary', () => {
    renderSection();
    expect(screen.getByText(/Ajuste avançado/i)).toBeInTheDocument();
    expect(screen.getByText('SF 80%')).toBeInTheDocument();
  });

  it('changes safety factor inside Ajuste avançado', () => {
    renderSection();
    openAdvanced();
    fireEvent.click(screen.getByLabelText('Reduzir fator de correção'));
    expect(useMachiningStore.getState().safetyFactor).toBeCloseTo(0.75);
  });

  it('renders saved tools empty state without needing to open an accordion', () => {
    renderSection();
    expect(screen.getByText('Nenhuma ferramenta salva')).toBeInTheDocument();
  });

  it('renders save tool button', () => {
    renderSection();
    expect(screen.getByRole('button', { name: 'Salvar ferramenta' })).toBeInTheDocument();
  });
});
