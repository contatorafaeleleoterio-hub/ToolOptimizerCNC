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

  it('renders info toggle button for each slider', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('Informações sobre VEL. DE CORTE')).toBeInTheDocument();
    expect(screen.getByLabelText('Informações sobre AVANÇO/DENTE')).toBeInTheDocument();
    expect(screen.getByLabelText('Informações sobre ENGAJ. RADIAL')).toBeInTheDocument();
    expect(screen.getByLabelText('Informações sobre PROF. AXIAL')).toBeInTheDocument();
  });

  it('drawer is hidden by default', () => {
    render(<FineTunePanel />);
    expect(screen.queryByText('▲ MAIS')).not.toBeInTheDocument();
  });

  it('clicking label opens drawer with content', () => {
    render(<FineTunePanel />);
    fireEvent.click(screen.getByLabelText('Informações sobre VEL. DE CORTE'));
    expect(screen.getByText('▲ MAIS')).toBeInTheDocument();
    expect(screen.getByText('▼ MENOS')).toBeInTheDocument();
  });

  it('clicking same label again closes drawer', () => {
    render(<FineTunePanel />);
    const btn = screen.getByLabelText('Informações sobre VEL. DE CORTE');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText('▲ MAIS')).not.toBeInTheDocument();
  });

  it('opening one drawer closes the previous', () => {
    render(<FineTunePanel />);
    fireEvent.click(screen.getByLabelText('Informações sobre VEL. DE CORTE'));
    fireEvent.click(screen.getByLabelText('Informações sobre AVANÇO/DENTE'));
    expect(screen.getAllByText('▲ MAIS')).toHaveLength(1);
  });

  // Health bar integration tests
  it('renders health bars for all 4 params', () => {
    render(<FineTunePanel />);
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-fz')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ae')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ap')).toBeInTheDocument();
  });

  it('vc and fz bars inactive before calcular()', () => {
    render(<FineTunePanel />);
    expect(screen.getByTestId('health-bar-vc-inactive')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-fz-inactive')).toBeInTheDocument();
  });

  it('ae and ap bars always active (no resultado needed)', () => {
    render(<FineTunePanel />);
    expect(screen.getByTestId('health-bar-ae-fill')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ap-fill')).toBeInTheDocument();
  });

  it('vc and fz bars activate after calcular()', () => {
    useMachiningStore.getState().calcular();
    render(<FineTunePanel />);
    expect(screen.getByTestId('health-bar-vc-fill')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-fz-fill')).toBeInTheDocument();
  });

  it('health bars visible when educational drawer is open', () => {
    render(<FineTunePanel />);
    fireEvent.click(screen.getByLabelText('Informações sobre VEL. DE CORTE'));
    // Drawer is open, but health bar is still in DOM (rendered before drawer)
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
  });
});
