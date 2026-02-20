import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { FineTunePanel } from '@/components/fine-tune-panel';
import { useMachiningStore } from '@/store';

describe('FineTunePanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders Ajuste Fino heading', () => {
    render(<FineTunePanel />);
    expect(screen.getByText('Ajuste Fino')).toBeInTheDocument();
  });

  it('renders 4 slider sections', () => {
    render(<FineTunePanel />);
    expect(screen.getByText('VEL. DE CORTE')).toBeInTheDocument();
    expect(screen.getByText('AVANÇO/DENTE')).toBeInTheDocument();
    expect(screen.getByText('ENGAJ. RADIAL')).toBeInTheDocument();
    expect(screen.getByText('PROF. AXIAL')).toBeInTheDocument();
  });

  it('renders decrease buttons', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('Diminuir Vc')).toBeInTheDocument();
    expect(screen.getByLabelText('Diminuir fz')).toBeInTheDocument();
  });

  it('renders increase buttons', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('Aumentar Vc')).toBeInTheDocument();
    expect(screen.getByLabelText('Aumentar fz')).toBeInTheDocument();
  });

  it('decrease button decreases percentage by 10%', () => {
    render(<FineTunePanel />);
    const initialVc = useMachiningStore.getState().parametros.vc;
    fireEvent.click(screen.getByLabelText('Diminuir Vc'));
    // After -10%, value should be baseVc * 0.9
    const newVc = useMachiningStore.getState().parametros.vc;
    expect(newVc).toBeLessThan(initialVc);
  });

  it('increase button increases percentage by 10%', () => {
    render(<FineTunePanel />);
    const initialVc = useMachiningStore.getState().parametros.vc;
    fireEvent.click(screen.getByLabelText('Aumentar Vc'));
    // After +10%, value should be baseVc * 1.1
    const newVc = useMachiningStore.getState().parametros.vc;
    expect(newVc).toBeGreaterThan(initialVc);
  });

  it('renders bidirectional sliders', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('Vc slider')).toBeInTheDocument();
    expect(screen.getByLabelText('fz slider')).toBeInTheDocument();
  });

  it('shows MRR section', () => {
    render(<FineTunePanel />);
    expect(screen.getByText('MRR')).toBeInTheDocument();
  });
});
