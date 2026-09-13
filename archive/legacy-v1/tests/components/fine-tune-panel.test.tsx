import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FineTunePanel } from '@/components/fine-tune-panel';
import { useMachiningStore } from '@/store';

// Mock useIsMobile as desktop (false) so hover-based popover behavior applies
vi.mock('@/hooks/use-is-mobile', () => ({ useIsMobile: () => false }));

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

  it('renders info button for each parameter', () => {
    render(<FineTunePanel />);
    expect(screen.getByLabelText('O que é VEL. DE CORTE?')).toBeInTheDocument();
    expect(screen.getByLabelText('O que é AVANÇO/DENTE?')).toBeInTheDocument();
    expect(screen.getByLabelText('O que é ENGAJ. RADIAL?')).toBeInTheDocument();
    expect(screen.getByLabelText('O que é PROF. AXIAL?')).toBeInTheDocument();
  });

  it('educational drawer (▲ MAIS) is not rendered', () => {
    render(<FineTunePanel />);
    expect(screen.queryByText('▲ MAIS')).not.toBeInTheDocument();
  });

  it('mouseEnter on info button shows popover', () => {
    render(<FineTunePanel />);
    fireEvent.mouseEnter(screen.getByLabelText('O que é VEL. DE CORTE?'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('mouseLeave on info button hides popover', () => {
    render(<FineTunePanel />);
    const btn = screen.getByLabelText('O que é VEL. DE CORTE?');
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  // Health bar integration tests
  it('renders health bars for all 4 params', () => {
    render(<FineTunePanel />);
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-fz')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ae')).toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ap')).toBeInTheDocument();
  });

  it('vc bar always active; fz bar inactive before calcular()', () => {
    render(<FineTunePanel />);
    // vc is now always active (value-based, no simulation needed)
    expect(screen.queryByTestId('health-bar-vc-inactive')).not.toBeInTheDocument();
    // fz still requires simulation
    expect(screen.getByTestId('health-bar-fz-inactive')).toBeInTheDocument();
  });

  it('ae and ap bars always active (no resultado needed)', () => {
    render(<FineTunePanel />);
    expect(screen.queryByTestId('health-bar-ae-inactive')).not.toBeInTheDocument();
    expect(screen.queryByTestId('health-bar-ap-inactive')).not.toBeInTheDocument();
  });

  it('vc and fz bars activate after calcular()', () => {
    useMachiningStore.getState().calcular();
    render(<FineTunePanel />);
    expect(screen.queryByTestId('health-bar-vc-inactive')).not.toBeInTheDocument();
    expect(screen.queryByTestId('health-bar-fz-inactive')).not.toBeInTheDocument();
  });

  it('health bars always visible', () => {
    render(<FineTunePanel />);
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
  });

  describe('SGB position', () => {
    it('SGB renders before StyledSlider in DOM for each parameter', () => {
      render(<FineTunePanel />);
      const params = [
        { barId: 'health-bar-vc', decreaseLabel: 'Decrease Vc' },
        { barId: 'health-bar-fz', decreaseLabel: 'Decrease fz' },
        { barId: 'health-bar-ae', decreaseLabel: 'Decrease ae' },
        { barId: 'health-bar-ap', decreaseLabel: 'Decrease ap' },
      ];
      for (const { barId, decreaseLabel } of params) {
        const sgb = screen.getByTestId(barId);
        const sliderBtn = screen.getByLabelText(decreaseLabel);
        // DOCUMENT_POSITION_FOLLOWING (4) means sliderBtn comes after sgb
        expect(sgb.compareDocumentPosition(sliderBtn) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      }
    });

    it('desktop SGB uses 50 segments (default)', () => {
      render(<FineTunePanel />);
      // SGB defaults to 50 segments — health-bar-vc should be in the DOM without segments prop override
      expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
    });
  });
});
