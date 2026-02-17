import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ResultsPanel } from '@/components/results-panel';
import { useMachiningStore } from '@/store';

function renderPanel() {
  return render(<BrowserRouter><ResultsPanel /></BrowserRouter>);
}

/** Setup store with safe explicit params so auto-populate doesn't interfere */
function setupSafeCalc(balanco = 20) {
  const s = useMachiningStore.getState();
  s.setFerramenta({ diametro: 10, balanco });
  s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
  s.calcular();
}

describe('ResultsPanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('shows zeroed results when no simulation yet', () => {
    renderPanel();
    expect(screen.getByText('Spindle')).toBeInTheDocument();
    expect(screen.getByText('Parâmetros Calculados')).toBeInTheDocument();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('renders tool summary viewer', () => {
    renderPanel();
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  it('shows calculated results after calcular()', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByText('Spindle')).toBeInTheDocument();
    expect(screen.getAllByText('Feed Rate').length).toBeGreaterThan(0);
    expect(screen.getByText('Power')).toBeInTheDocument();
  });

  it('shows safety badge', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('shows big numbers section', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getAllByText('Spindle Speed').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Feed Rate').length).toBeGreaterThanOrEqual(2);
  });

  it('shows progress cards', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByText('Power Est.')).toBeInTheDocument();
    expect(screen.getByText('MRR')).toBeInTheDocument();
    expect(screen.getByText('Surface Speed')).toBeInTheDocument();
  });

  it('shows warnings when L/D is critical', () => {
    setupSafeCalc(50); // L/D = 5.0 → vermelho
    renderPanel();
    const resultado = useMachiningStore.getState().resultado;
    expect(resultado?.seguranca.nivel).toBe('vermelho');
    expect(screen.getByText('Avisos')).toBeInTheDocument();
  });

  it('shows RPM values as formatted numbers', () => {
    setupSafeCalc();
    renderPanel();
    const resultado = useMachiningStore.getState().resultado!;
    const rpmFormatted = Math.round(resultado.rpm).toLocaleString('en-US');
    expect(screen.getAllByText(rpmFormatted).length).toBeGreaterThan(0);
  });

  it('shows BLOQUEADO when L/D > 6', () => {
    setupSafeCalc(70); // L/D = 7.0 → bloqueado
    renderPanel();
    expect(screen.getByText('BLOQUEADO')).toBeInTheDocument();
  });

  it('renders bidirectional slider for RPM', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByLabelText('Spindle Speed slider')).toBeInTheDocument();
  });

  it('renders bidirectional slider for Feed', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByLabelText('Feed Rate slider')).toBeInTheDocument();
  });

  it('renders +/- buttons for RPM', () => {
    setupSafeCalc();
    renderPanel();
    expect(screen.getByLabelText('Decrease Spindle Speed')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase Spindle Speed')).toBeInTheDocument();
  });

  it('manual RPM override recalculates', () => {
    setupSafeCalc();
    renderPanel();
    const increaseBtn = screen.getByLabelText('Increase Spindle Speed');
    const initialRpm = useMachiningStore.getState().resultado!.rpm;
    fireEvent.click(increaseBtn);
    const newRpm = useMachiningStore.getState().resultado!.rpm;
    expect(newRpm).toBeGreaterThan(initialRpm);
  });
});
