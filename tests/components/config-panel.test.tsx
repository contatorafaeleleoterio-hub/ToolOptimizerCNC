import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders 3 operation type radio buttons', () => {
    renderPanel();
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(3);
  });

  it('renders tool type buttons', () => {
    renderPanel();
    expect(screen.getAllByText('Toroidal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Topo/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders diameter dropdown with 15 options', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    const diaSelect = selects[1];
    const options = diaSelect.querySelectorAll('option');
    expect(options.length).toBe(15);
  });

  it('renders cutting parameter inputs', () => {
    renderPanel();
    expect(screen.getByText('ap (mm)')).toBeInTheDocument();
    expect(screen.getByText('ae (mm)')).toBeInTheDocument();
    expect(screen.getByText('fz (mm)')).toBeInTheDocument();
    expect(screen.getByText('Vc (m/min)')).toBeInTheDocument();
  });

  it('renders safety factor slider', () => {
    renderPanel();
    expect(screen.getByText('Fator de Segurança')).toBeInTheDocument();
    expect(screen.getByText('0.80')).toBeInTheDocument();
  });

  it('renders tool summary viewer', () => {
    renderPanel();
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  it('shows raio da ponta for toroidal (default)', () => {
    renderPanel();
    expect(screen.getByText('Raio da Ponta')).toBeInTheDocument();
    expect(screen.getByText('R0.2')).toBeInTheDocument();
    expect(screen.getByText('R0.5')).toBeInTheDocument();
    expect(screen.getAllByText('R1').length).toBeGreaterThanOrEqual(1);
  });

  it('hides raio da ponta when switching to topo', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Topo'));
    expect(screen.queryByText('Raio da Ponta')).not.toBeInTheDocument();
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

  it('changes operation type on radio click', () => {
    renderPanel();
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[2]);
    expect(useMachiningStore.getState().tipoOperacao).toBe('acabamento');
  });

  it('changes tool diameter via dropdown', () => {
    renderPanel();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: '10' } });
    expect(useMachiningStore.getState().ferramenta.diametro).toBe(10);
  });

  it('calculates on Simular click', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Simular'));
    expect(useMachiningStore.getState().resultado).not.toBeNull();
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

  it('increases altura on ▲ click', () => {
    renderPanel();
    const initial = useMachiningStore.getState().ferramenta.balanco;
    fireEvent.click(screen.getByLabelText('Increase height'));
    expect(useMachiningStore.getState().ferramenta.balanco).toBe(initial + 0.5);
  });

  it('decreases altura on ▼ click', () => {
    renderPanel();
    const initial = useMachiningStore.getState().ferramenta.balanco;
    fireEvent.click(screen.getByLabelText('Decrease height'));
    expect(useMachiningStore.getState().ferramenta.balanco).toBe(initial - 0.5);
  });
});
