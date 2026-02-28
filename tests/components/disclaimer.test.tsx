import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Disclaimer } from '@/components/disclaimer';

describe('Disclaimer', () => {
  it('renders footer element', () => {
    const { container } = render(<Disclaimer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('contains RECOMENDA text', () => {
    render(<Disclaimer />);
    expect(screen.getByText(/RECOMENDA/)).toBeInTheDocument();
  });

  it('contains DECIDE text', () => {
    render(<Disclaimer />);
    expect(screen.getByText(/DECIDE/)).toBeInTheDocument();
  });
});
