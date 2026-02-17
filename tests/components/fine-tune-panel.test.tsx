import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { FineTunePanel } from '@/components/fine-tune-panel';
import { useMachiningStore } from '@/store';

describe('FineTunePanel', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders Fine Tune heading', () => {
    render(<FineTunePanel />);
    expect(screen.getByText('Fine Tune')).toBeInTheDocument();
  });

  it('renders 4 slider sections', () => {
    render(<FineTunePanel />);
    expect(screen.getByText('CUTTING SPEED')).toBeInTheDocument();
    expect(screen.getByText('FEED PER TOOTH')).toBeInTheDocument();
    expect(screen.getByText('RADIAL ENGAGEMENT')).toBeInTheDocument();
    expect(screen.getByText('AXIAL DEPTH')).toBeInTheDocument();
  });

  it('renders decrease buttons', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('Decrease Vc')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease fz')).toBeInTheDocument();
  });

  it('renders increase buttons', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('Increase Vc')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase fz')).toBeInTheDocument();
  });

  it('decrease button decreases percentage by 10%', () => {
    render(<FineTunePanel />);
    const initialVc = useMachiningStore.getState().parametros.vc;
    fireEvent.click(screen.getByLabelText('Decrease Vc'));
    // After -10%, value should be baseVc * 0.9
    const newVc = useMachiningStore.getState().parametros.vc;
    expect(newVc).toBeLessThan(initialVc);
  });

  it('increase button increases percentage by 10%', () => {
    render(<FineTunePanel />);
    const initialVc = useMachiningStore.getState().parametros.vc;
    fireEvent.click(screen.getByLabelText('Increase Vc'));
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
