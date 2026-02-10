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

  it('decrease button decrements value', () => {
    render(<FineTunePanel />);
    const initialVc = useMachiningStore.getState().parametros.vc;
    fireEvent.click(screen.getByLabelText('Decrease Vc'));
    expect(useMachiningStore.getState().parametros.vc).toBe(initialVc - 1);
  });

  it('increase button increments value', () => {
    render(<FineTunePanel />);
    const initialVc = useMachiningStore.getState().parametros.vc;
    fireEvent.click(screen.getByLabelText('Increase Vc'));
    expect(useMachiningStore.getState().parametros.vc).toBe(initialVc + 1);
  });

  it('renders editable value inputs', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('Vc value')).toBeInTheDocument();
    expect(screen.getByLabelText('fz value')).toBeInTheDocument();
  });

  it('shows MRR section', () => {
    render(<FineTunePanel />);
    expect(screen.getByText('MRR')).toBeInTheDocument();
  });
});
