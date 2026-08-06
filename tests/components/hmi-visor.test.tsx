import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { HmiVisor } from '@/components/mobile/hmi-visor';
import { useMachiningStore } from '@/store';

function simulate() {
  const state = useMachiningStore.getState();
  state.setFerramenta({ tipo: 'topo', diametro: 10, balanco: 30 });
  state.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
  state.calcular();
}

describe('HmiVisor', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
  });

  it('renders nothing before a simulation exists', () => {
    const { container } = render(<HmiVisor />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the status bar with the safety level and tool diameter', () => {
    simulate();
    render(<HmiVisor />);
    expect(screen.getByText('Status do Processo')).toBeInTheDocument();
    expect(screen.getByText('Ø10 mm')).toBeInTheDocument();
  });

  it('renders the big RPM and Avanço readouts', () => {
    simulate();
    render(<HmiVisor />);
    expect(screen.getByText('Rotação')).toBeInTheDocument();
    expect(screen.getAllByText('Avanço').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the shared real-time indicators block', () => {
    simulate();
    render(<HmiVisor />);
    expect(screen.getByText('Indicadores')).toBeInTheDocument();
    expect(screen.getByText('Saúde Ferramenta')).toBeInTheDocument();
  });

  it('renders secondary data (Vel. Corte and Taxa Remoção)', () => {
    simulate();
    render(<HmiVisor />);
    expect(screen.getByText('Vel. Corte')).toBeInTheDocument();
    expect(screen.getByText('Taxa Remoção')).toBeInTheDocument();
  });
});
