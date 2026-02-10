import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ResultsPanel } from '@/components/results-panel';
import { useMachiningStore } from '@/store';

function renderPanel() {
  return render(<BrowserRouter><ResultsPanel /></BrowserRouter>);
}

describe('ResultsPanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('shows placeholder when no result', () => {
    renderPanel();
    expect(screen.getByText('Simular')).toBeInTheDocument();
    expect(screen.getByText(/Configure os parâmetros/)).toBeInTheDocument();
  });

  it('shows calculated results after calcular()', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    expect(screen.getByText('Spindle')).toBeInTheDocument();
    expect(screen.getAllByText('Feed Rate').length).toBeGreaterThan(0);
    expect(screen.getByText('Power')).toBeInTheDocument();
  });

  it('shows safety badge', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('shows big numbers section', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    expect(screen.getByText('Spindle Speed')).toBeInTheDocument();
    expect(screen.getAllByText('Feed Rate').length).toBeGreaterThanOrEqual(2);
  });

  it('shows progress cards', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    expect(screen.getByText('Power Est.')).toBeInTheDocument();
    expect(screen.getByText('MRR')).toBeInTheDocument();
    expect(screen.getByText('Surface Speed')).toBeInTheDocument();
  });

  it('shows warnings when L/D is critical', () => {
    const store = useMachiningStore.getState();
    store.setFerramenta({ balanco: 50, diametro: 10 });
    store.calcular();
    renderPanel();
    const resultado = useMachiningStore.getState().resultado;
    expect(resultado?.seguranca.nivel).toBe('vermelho');
    expect(screen.getByText('Avisos')).toBeInTheDocument();
  });

  it('shows RPM values as formatted numbers', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    const resultado = useMachiningStore.getState().resultado!;
    const rpmFormatted = Math.round(resultado.rpm).toLocaleString('en-US');
    expect(screen.getAllByText(rpmFormatted).length).toBeGreaterThan(0);
  });

  it('shows BLOQUEADO when L/D > 6', () => {
    const store = useMachiningStore.getState();
    store.setFerramenta({ balanco: 70, diametro: 10 });
    store.calcular();
    renderPanel();
    expect(screen.getByText('BLOQUEADO')).toBeInTheDocument();
  });

  it('renders editable RPM input', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    expect(screen.getByLabelText('Edit Spindle Speed')).toBeInTheDocument();
  });

  it('renders editable Feed input', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    expect(screen.getByLabelText('Edit Feed Rate')).toBeInTheDocument();
  });

  it('renders +/- buttons for RPM', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    expect(screen.getByLabelText('Decrease Spindle Speed')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase Spindle Speed')).toBeInTheDocument();
  });

  it('manual RPM override recalculates', () => {
    useMachiningStore.getState().setFerramenta({ diametro: 10, balanco: 20 });
    useMachiningStore.getState().calcular();
    renderPanel();
    const increaseBtn = screen.getByLabelText('Increase Spindle Speed');
    const initialRpm = useMachiningStore.getState().resultado!.rpm;
    fireEvent.click(increaseBtn);
    const newRpm = useMachiningStore.getState().resultado!.rpm;
    expect(newRpm).toBeGreaterThan(initialRpm);
  });
});
