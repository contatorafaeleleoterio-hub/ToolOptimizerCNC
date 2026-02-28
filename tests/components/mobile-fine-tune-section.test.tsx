import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileFineTuneSection } from '@/components/mobile/mobile-fine-tune-section';
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
    fireEvent.click(screen.getByLabelText('Increase fz'));
    const next = useMachiningStore.getState().parametros.fz;
    expect(next).toBeCloseTo(initial + 0.01, 4); // step=0.01 for fz
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

  it('renders Material Removal section', () => {
    renderSection();
    expect(screen.getByText('Material Removal')).toBeInTheDocument();
  });

  it('shows MRR as — when resultado is null', () => {
    renderSection();
    // The MRR display should show '—' when no resultado
    expect(screen.getByText(/^—/)).toBeInTheDocument();
  });

  it('renders ParameterHealthBar for Vc (data-testid=health-bar-vc)', () => {
    renderSection();
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
  });
});
