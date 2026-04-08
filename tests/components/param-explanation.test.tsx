import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Default mock: desktop (isMobile = false)
const mockUseIsMobile = vi.fn(() => false);
vi.mock('@/hooks/use-is-mobile', () => ({
  useIsMobile: () => mockUseIsMobile(),
}));

import { ParamExplanation } from '@/components/param-explanation';

describe('ParamExplanation', () => {
  beforeEach(() => {
    mockUseIsMobile.mockReturnValue(false);
  });

  it('renders button with correct fullLabel text', () => {
    render(<ParamExplanation fullLabel="VEL. DE CORTE" explanationText="Velocidade tangencial." />);
    expect(screen.getByText('O QUE É VEL. DE CORTE?')).toBeInTheDocument();
  });

  it('button has aria-label with fullLabel', () => {
    render(<ParamExplanation fullLabel="VEL. DE CORTE" explanationText="Velocidade tangencial." />);
    expect(screen.getByLabelText('O que é VEL. DE CORTE?')).toBeInTheDocument();
  });

  it('popover is hidden by default', () => {
    render(<ParamExplanation fullLabel="VEL. DE CORTE" explanationText="Velocidade tangencial." />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows popover on mouseEnter (desktop)', () => {
    render(<ParamExplanation fullLabel="VEL. DE CORTE" explanationText="Velocidade tangencial." />);
    fireEvent.mouseEnter(screen.getByLabelText('O que é VEL. DE CORTE?'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides popover on mouseLeave (desktop)', () => {
    render(<ParamExplanation fullLabel="VEL. DE CORTE" explanationText="Velocidade tangencial." />);
    const btn = screen.getByLabelText('O que é VEL. DE CORTE?');
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('popover contains the explanationText prop', () => {
    render(<ParamExplanation fullLabel="VEL. DE CORTE" explanationText="Velocidade tangencial." />);
    fireEvent.mouseEnter(screen.getByLabelText('O que é VEL. DE CORTE?'));
    expect(screen.getByText('Velocidade tangencial.')).toBeInTheDocument();
  });

  it('popover has role="tooltip"', () => {
    render(<ParamExplanation fullLabel="fz" explanationText="Espessura do cavaco." />);
    fireEvent.mouseEnter(screen.getByLabelText('O que é fz?'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('click does NOT show popover on desktop (hover-only)', () => {
    render(<ParamExplanation fullLabel="VEL. DE CORTE" explanationText="Velocidade tangencial." />);
    fireEvent.click(screen.getByLabelText('O que é VEL. DE CORTE?'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('ParamExplanation — mobile', () => {
  beforeEach(() => {
    mockUseIsMobile.mockReturnValue(true);
  });

  it('shows popover on click (mobile)', () => {
    render(<ParamExplanation fullLabel="fz" explanationText="Espessura do cavaco." />);
    fireEvent.click(screen.getByLabelText('O que é fz?'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('toggles popover on successive clicks (mobile)', () => {
    render(<ParamExplanation fullLabel="fz" explanationText="Espessura do cavaco." />);
    const btn = screen.getByLabelText('O que é fz?');
    fireEvent.click(btn);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('mouseEnter does NOT show popover on mobile', () => {
    render(<ParamExplanation fullLabel="fz" explanationText="Espessura do cavaco." />);
    fireEvent.mouseEnter(screen.getByLabelText('O que é fz?'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
