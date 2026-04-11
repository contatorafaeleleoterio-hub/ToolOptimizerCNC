import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileResultsSection } from '@/components/mobile/mobile-results-section';
import { useMachiningStore } from '@/store';

function renderSection() {
  return render(
    <BrowserRouter>
      <MobileResultsSection />
    </BrowserRouter>,
  );
}

describe('MobileResultsSection', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
  });

  it('renders tool row (data-testid=tool-summary)', () => {
    renderSection();
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  it('renders edit tool button in tool row', () => {
    renderSection();
    expect(screen.getByLabelText('Editar ferramenta')).toBeInTheDocument();
  });

  it('shows placeholder when resultado is null', () => {
    renderSection();
    expect(screen.getByText(/Configure os parâmetros/)).toBeInTheDocument();
  });

  it('renders lcd with aguardando message when resultado is null', () => {
    renderSection();
    expect(screen.getByText(/AGUARDANDO SIMULAÇÃO/)).toBeInTheDocument();
  });

  it('renders header with operação label', () => {
    renderSection();
    expect(screen.getByText('Desbaste')).toBeInTheDocument();
  });

  it('renders SafetyBadge in header even before simulation (default verde)', () => {
    // Header is always visible — badge shows default 'verde' state before simulation
    renderSection();
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  describe('after calcular()', () => {
    beforeEach(() => {
      const state = useMachiningStore.getState();
      state.setFerramenta({ tipo: 'topo', diametro: 10, balanco: 30 });
      state.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      state.calcular();
    });

    it('hides placeholder after simulation', () => {
      renderSection();
      expect(screen.queryByText(/Configure os parâmetros/)).not.toBeInTheDocument();
    });

    it('shows SafetyBadge SEGURO', () => {
      renderSection();
      expect(screen.getByText('SEGURO')).toBeInTheDocument();
    });

    it('shows BigNumber labels for RPM and Feed', () => {
      renderSection();
      expect(screen.getAllByText('Rotação (RPM)').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Avanço (mm/min)').length).toBeGreaterThanOrEqual(1);
    });

    it('renders input params Vc fz ap ae (zona 5)', () => {
      renderSection();
      expect(screen.getByText('Vc (Vel. Corte)')).toBeInTheDocument();
      expect(screen.getByText('fz (Av. Dente)')).toBeInTheDocument();
      expect(screen.getByText('ap (Prof. Axial)')).toBeInTheDocument();
      expect(screen.getByText('ae (Eng. Radial)')).toBeInTheDocument();
    });

    it('renders zona 6 with potência torque vc real mrr', () => {
      renderSection();
      expect(screen.getByText('Potência Est.')).toBeInTheDocument();
      expect(screen.getAllByText('Torque').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Vc Real')).toBeInTheDocument();
      expect(screen.getByText('MRR')).toBeInTheDocument();
    });

    it('renders zona 6 with L/D and CTF', () => {
      renderSection();
      expect(screen.getByText('L/D')).toBeInTheDocument();
      expect(screen.getByText('CTF')).toBeInTheDocument();
    });

    it('renders 3 gauges (parity with desktop)', () => {
      renderSection();
      expect(screen.getByText('Eficiência de Avanço')).toBeInTheDocument();
      expect(screen.getByText('Produtividade MRR')).toBeInTheDocument();
      expect(screen.getByText('Saúde da Ferramenta')).toBeInTheDocument();
    });

    it('renders Favoritar button after simular()', () => {
      // Favoritar requires a history entry — simular() creates one
      const state = useMachiningStore.getState();
      state.setFerramenta({ tipo: 'topo', diametro: 10, balanco: 30 });
      state.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      state.simular();
      renderSection();
      expect(screen.getByLabelText(/Favoritar simulação/)).toBeInTheDocument();
    });

    it('renders educational formula cards section', () => {
      renderSection();
      expect(screen.getByText('Entenda os Cálculos')).toBeInTheDocument();
    });

    it('edit button click does not throw (no matching saved tool → no-op)', () => {
      renderSection();
      const editBtn = screen.getByLabelText('Editar ferramenta');
      expect(() => fireEvent.click(editBtn)).not.toThrow();
    });
  });
});
