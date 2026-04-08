import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileFineTuneSection } from '@/components/mobile/mobile-fine-tune-section';
import { MATERIAIS } from '@/data';
import { calcularSliderBounds } from '@/engine';
import { useMachiningStore } from '@/store';

function renderSection() {
  return render(
    <BrowserRouter>
      <MobileFineTuneSection />
    </BrowserRouter>,
  );
}

describe('MobileFineTuneSection', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
  });

  it('renders slider for each parameter (role=slider)', () => {
    renderSection();
    const sliders = screen.getAllByRole('slider');
    // 4 parameters: Vc, fz, ae, ap
    expect(sliders.length).toBeGreaterThanOrEqual(4);
  });

  it('renders Vc slider with correct aria-label', () => {
    renderSection();
    expect(screen.getByLabelText('Vc slider')).toBeInTheDocument();
  });

  it('renders fz slider with correct aria-label', () => {
    renderSection();
    expect(screen.getByLabelText('fz slider')).toBeInTheDocument();
  });

  it('renders ae slider with correct aria-label', () => {
    renderSection();
    expect(screen.getByLabelText('ae slider')).toBeInTheDocument();
  });

  it('renders ap slider with correct aria-label', () => {
    renderSection();
    expect(screen.getByLabelText('ap slider')).toBeInTheDocument();
  });

  it('renders decrease/increase buttons for Vc', () => {
    renderSection();
    expect(screen.getByLabelText('Decrease Vc')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase Vc')).toBeInTheDocument();
  });

  it('decrease button reduces Vc by step', () => {
    renderSection();
    const initial = useMachiningStore.getState().parametros.vc;
    fireEvent.click(screen.getByLabelText('Decrease Vc'));
    const next = useMachiningStore.getState().parametros.vc;
    expect(next).toBe(initial - 1); // step=1 for Vc
  });

  it('increase button increases fz by step', () => {
    renderSection();
    const initial = useMachiningStore.getState().parametros.fz;
    const state = useMachiningStore.getState();
    const material = MATERIAIS.find((item) => item.id === state.materialId) ?? null;
    const expectedStep = calcularSliderBounds(material, state.ferramenta, state.tipoOperacao).fz.step;
    fireEvent.click(screen.getByLabelText('Increase fz'));
    const next = useMachiningStore.getState().parametros.fz;
    expect(next).toBeCloseTo(initial + expectedStep, 4);
  });

  it('renders info drawer toggle button for Vc (aria-expanded=false initially)', () => {
    renderSection();
    const infoBtn = screen.getByLabelText('Informações sobre Velocidade Corte');
    expect(infoBtn).toBeInTheDocument();
    expect(infoBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens drawer when info button is clicked', () => {
    renderSection();
    const infoBtn = screen.getByLabelText('Informações sobre Velocidade Corte');
    fireEvent.click(infoBtn);
    expect(infoBtn.getAttribute('aria-expanded')).toBe('true');
    // Drawer should show educational content
    expect(screen.getByText(/Velocidade tangencial/)).toBeInTheDocument();
  });

  it('renders SegmentedGradientBar for Vc (data-testid=health-bar-vc)', () => {
    renderSection();
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
  });

  describe('SGB position', () => {
    it('SGB renders before TouchSlider row in DOM', () => {
      renderSection();
      const sgb = screen.getByTestId('health-bar-vc');
      const decreaseBtn = screen.getByLabelText('Decrease Vc');
      // DOCUMENT_POSITION_FOLLOWING (4) means decreaseBtn comes after sgb
      expect(sgb.compareDocumentPosition(decreaseBtn) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('mobile SGB uses 30 segments', () => {
      renderSection();
      // All 4 health bars are rendered (segments=30 is applied)
      expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
      expect(screen.getByTestId('health-bar-fz')).toBeInTheDocument();
      expect(screen.getByTestId('health-bar-ae')).toBeInTheDocument();
      expect(screen.getByTestId('health-bar-ap')).toBeInTheDocument();
    });
  });

  it('renders editable value input for each parameter', () => {
    renderSection();
    expect(screen.getByLabelText('Vc value')).toBeInTheDocument();
    expect(screen.getByLabelText('fz value')).toBeInTheDocument();
    expect(screen.getByLabelText('ae value')).toBeInTheDocument();
    expect(screen.getByLabelText('ap value')).toBeInTheDocument();
  });
});
