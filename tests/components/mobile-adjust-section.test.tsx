import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MobileAdjustSection } from '@/components/mobile/mobile-adjust-section';
import { useMachiningStore } from '@/store';

function renderSection() {
  return render(<MobileAdjustSection />);
}

describe('MobileAdjustSection', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
  });

  it('renders the "Indicadores em Tempo Real" title', () => {
    renderSection();
    expect(screen.getByText('Indicadores em Tempo Real')).toBeInTheDocument();
  });

  it('shows an honest empty state (dashes, no zeros) before simulating', () => {
    renderSection();
    expect(screen.getAllByText('—').length).toBe(3);
    expect(screen.getByText('Simule para ativar o feedback em tempo real')).toBeInTheDocument();
  });

  it('renders the 3 real-time gauges after calcular()', () => {
    const state = useMachiningStore.getState();
    state.setFerramenta({ tipo: 'topo', diametro: 10, balanco: 30 });
    state.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    state.calcular();
    renderSection();
    expect(screen.getByText('Avanço')).toBeInTheDocument();
    expect(screen.getByText('MRR')).toBeInTheDocument();
    expect(screen.getByText('Saúde Ferramenta')).toBeInTheDocument();
    expect(screen.queryByText('Simule para ativar o feedback em tempo real')).not.toBeInTheDocument();
  });

  it('renders the fine-tune sliders (Vc/fz/ae/ap) below the indicators', () => {
    renderSection();
    expect(screen.getAllByRole('slider')).toHaveLength(4);
  });
});
