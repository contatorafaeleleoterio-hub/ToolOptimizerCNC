import { render, screen } from '@testing-library/react';
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

  it('renders ToolSummaryViewer (data-testid=tool-summary)', () => {
    renderSection();
    expect(screen.getByTestId('tool-summary')).toBeInTheDocument();
  });

  it('shows placeholder when resultado is null', () => {
    renderSection();
    expect(screen.getByText(/Configure os parâmetros/)).toBeInTheDocument();
  });

  it('does not render SafetyBadge before simulation', () => {
    renderSection();
    expect(screen.queryByText('SEGURO')).not.toBeInTheDocument();
    expect(screen.queryByText('ALERTA')).not.toBeInTheDocument();
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

    it('shows metric labels: Rotação, Avanço, Potência, Vc Real', () => {
      renderSection();
      expect(screen.getAllByText('Rotação').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Avanço').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Potência').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Vc Real').length).toBeGreaterThanOrEqual(1);
    });

    it('shows BigNumber labels for RPM and Feed', () => {
      renderSection();
      expect(screen.getAllByText('Rotação (RPM)').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Avanço (mm/min)').length).toBeGreaterThanOrEqual(1);
    });

    it('renders ProgressCard labels', () => {
      renderSection();
      expect(screen.getByText('Potência Est.')).toBeInTheDocument();
      expect(screen.getByText('MRR')).toBeInTheDocument();
    });

    it('renders Torque progress card (parity with desktop)', () => {
      renderSection();
      expect(screen.getAllByText('Torque').length).toBeGreaterThanOrEqual(1);
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
  });
});
