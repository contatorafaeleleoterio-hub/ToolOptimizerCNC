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

/** Switches from the default HMI view to the Educational view (BigNumbers + formula cards). */
function switchToEducational() {
  fireEvent.click(screen.getByText('HMI'));
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

  it('shows an honest dash for timestamp when there is no history entry (no fake "now")', () => {
    renderSection();
    expect(screen.getByText('—', { selector: 'span.font-mono' })).toBeInTheDocument();
  });

  describe('after calcular() — HMI view (default)', () => {
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

    it('shows exactly one SafetyBadge SEGURO (no duplicate with HmiVisor status bar)', () => {
      renderSection();
      expect(screen.getByText('SEGURO')).toBeInTheDocument();
    });

    it('renders the HMI status bar with tool diameter', () => {
      renderSection();
      expect(screen.getByText('Status do Processo')).toBeInTheDocument();
    });

    it('renders the real-time indicators block inside HmiVisor', () => {
      renderSection();
      expect(screen.getByText('Indicadores')).toBeInTheDocument();
      expect(screen.getAllByText('Avanço').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('MRR').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Saúde Ferramenta')).toBeInTheDocument();
    });
  });

  describe('after calcular() — Educational view', () => {
    beforeEach(() => {
      const state = useMachiningStore.getState();
      state.setFerramenta({ tipo: 'topo', diametro: 10, balanco: 30 });
      state.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
      state.calcular();
      renderSection();
      switchToEducational();
    });

    it('shows BigNumber labels for RPM and Feed', () => {
      expect(screen.getAllByText('Rotação (RPM)').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Avanço (mm/min)').length).toBeGreaterThanOrEqual(1);
    });

    it('renders the real-time indicators block between BigNumbers and input params', () => {
      expect(screen.getByText('Indicadores em Tempo Real')).toBeInTheDocument();
      expect(screen.getAllByText('MRR').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Saúde Ferramenta')).toBeInTheDocument();
    });

    it('renders input params Vc fz ap ae (zona 5)', () => {
      expect(screen.getByText('Vc (Vel. Corte)')).toBeInTheDocument();
      expect(screen.getByText('fz (Av. Dente)')).toBeInTheDocument();
      expect(screen.getByText('ap (Prof. Axial)')).toBeInTheDocument();
      expect(screen.getByText('ae (Eng. Radial)')).toBeInTheDocument();
    });

    it('renders zona 6 with potência, vc real, mrr — torque removed from the UI', () => {
      expect(screen.getByText('Potência Est.')).toBeInTheDocument();
      expect(screen.getByText('Vc Real')).toBeInTheDocument();
      expect(screen.getAllByText('MRR').length).toBeGreaterThanOrEqual(1);
      expect(screen.queryByText('Torque')).not.toBeInTheDocument();
    });

    it('renders zona 6 with L/D and CTF', () => {
      expect(screen.getByText('L/D')).toBeInTheDocument();
      expect(screen.getByText('CTF')).toBeInTheDocument();
    });

    it('renders educational formula cards section without a Torque card', () => {
      expect(screen.getByText('Entenda os Cálculos')).toBeInTheDocument();
      expect(screen.getByText('RPM (Rotação)')).toBeInTheDocument();
      expect(screen.getByText('Potência (Motor)')).toBeInTheDocument();
      expect(screen.queryByText('Torque')).not.toBeInTheDocument();
    });

    it('edit button click does not throw (no matching saved tool → no-op)', () => {
      const editBtn = screen.getByLabelText('Editar ferramenta');
      expect(() => fireEvent.click(editBtn)).not.toThrow();
    });
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
});
