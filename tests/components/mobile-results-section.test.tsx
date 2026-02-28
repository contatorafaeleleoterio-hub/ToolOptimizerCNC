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
      expect(screen.getByText('Rotação')).toBeInTheDocument();
      expect(screen.getByText('Avanço')).toBeInTheDocument();
      expect(screen.getByText('Potência')).toBeInTheDocument();
      expect(screen.getByText('Vc Real')).toBeInTheDocument();
    });

    it('shows BigNumber labels for RPM and Feed', () => {
      renderSection();
      expect(screen.getByText('Rotação (RPM)')).toBeInTheDocument();
      expect(screen.getByText('Avanço (mm/min)')).toBeInTheDocument();
    });

    it('renders ProgressCard labels', () => {
      renderSection();
      expect(screen.getByText('Potência Est.')).toBeInTheDocument();
      expect(screen.getByText('MRR')).toBeInTheDocument();
    });

    it('renders Vel. Superficial progress card', () => {
      renderSection();
      expect(screen.getByText('Vel. Superficial')).toBeInTheDocument();
    });
  });
});
