import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ResultsPanel } from '@/components/results-panel';
import { useMachiningStore } from '@/store';

describe('ResultsPanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('shows placeholder when no result', () => {
    render(<ResultsPanel />);
    expect(screen.getByText('Simular')).toBeInTheDocument();
    expect(screen.getByText(/Configure os parâmetros/)).toBeInTheDocument();
  });

  it('shows calculated results after calcular()', () => {
    useMachiningStore.getState().calcular();
    render(<ResultsPanel />);
    expect(screen.getByText('Spindle')).toBeInTheDocument();
    expect(screen.getAllByText('Feed Rate').length).toBeGreaterThan(0);
    expect(screen.getByText('Power')).toBeInTheDocument();
  });

  it('shows safety badge', () => {
    useMachiningStore.getState().calcular();
    render(<ResultsPanel />);
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('shows big numbers section', () => {
    useMachiningStore.getState().calcular();
    render(<ResultsPanel />);
    expect(screen.getByText('Spindle Speed')).toBeInTheDocument();
    expect(screen.getAllByText('Feed Rate').length).toBeGreaterThanOrEqual(2);
  });

  it('shows progress cards', () => {
    useMachiningStore.getState().calcular();
    render(<ResultsPanel />);
    expect(screen.getByText('Power Est.')).toBeInTheDocument();
    expect(screen.getByText('MRR')).toBeInTheDocument();
    expect(screen.getByText('Surface Speed')).toBeInTheDocument();
  });

  it('shows warnings when L/D is critical', () => {
    const store = useMachiningStore.getState();
    store.setFerramenta({ balanco: 50, diametro: 10 }); // L/D = 5
    store.calcular();
    render(<ResultsPanel />);
    const resultado = useMachiningStore.getState().resultado;
    expect(resultado?.seguranca.nivel).toBe('vermelho');
    expect(screen.getByText('Avisos')).toBeInTheDocument();
  });

  it('shows RPM values as formatted numbers', () => {
    useMachiningStore.getState().calcular();
    render(<ResultsPanel />);
    const resultado = useMachiningStore.getState().resultado!;
    const rpmFormatted = Math.round(resultado.rpm).toLocaleString('en-US');
    expect(screen.getAllByText(rpmFormatted).length).toBeGreaterThan(0);
  });

  it('shows BLOQUEADO when L/D > 6', () => {
    const store = useMachiningStore.getState();
    store.setFerramenta({ balanco: 70, diametro: 10 }); // L/D = 7
    store.calcular();
    render(<ResultsPanel />);
    expect(screen.getByText('BLOQUEADO')).toBeInTheDocument();
  });
});
