import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormulaCard, Fraction } from '@/components/formula-card';

const baseProps = {
  title: 'RPM (Rotação)',
  icon: 'speed',
  resultValue: '5,305',
  resultUnit: 'RPM',
  formula: <>N = Vc × 1000 / (π × D)</>,
  substitution: <>N = 100 × 1000 / (3.14159 × 6) = 5305</>,
  variables: [
    { symbol: 'Vc', value: '100 m/min', description: 'velocidade de corte' },
    { symbol: 'D', value: '6 mm', description: 'diâmetro da ferramenta' },
  ],
  tip: 'Para aumentar RPM: aumente Vc ou reduza o diâmetro.',
};

describe('FormulaCard', () => {
  it('renders header with title and result value', () => {
    render(<FormulaCard {...baseProps} />);
    expect(screen.getByText('RPM (Rotação)')).toBeInTheDocument();
    expect(screen.getByText('5,305')).toBeInTheDocument();
    expect(screen.getByText('RPM')).toBeInTheDocument();
  });

  it('is collapsed by default', () => {
    render(<FormulaCard {...baseProps} />);
    expect(screen.queryByText('Como é Calculado')).not.toBeInTheDocument();
  });

  it('expands when header is clicked', () => {
    render(<FormulaCard {...baseProps} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(screen.getByText('Como é Calculado')).toBeInTheDocument();
  });

  it('shows variables when expanded', () => {
    render(<FormulaCard {...baseProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Vc')).toBeInTheDocument();
    expect(screen.getByText('100 m/min')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('6 mm')).toBeInTheDocument();
  });

  it('shows practical tip when expanded', () => {
    render(<FormulaCard {...baseProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Para aumentar RPM/)).toBeInTheDocument();
  });

  it('collapses when clicked again', () => {
    render(<FormulaCard {...baseProps} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(screen.getByText('Como é Calculado')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText('Como é Calculado')).not.toBeInTheDocument();
  });

  it('shows context bar when provided', () => {
    render(<FormulaCard {...baseProps} contextBar={{ value: 5305, min: 0, max: 12000, label: '5,305 / 12,000 RPM', color: '#00D9FF' }} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('5,305 / 12,000 RPM')).toBeInTheDocument();
  });

  it('has correct aria-expanded attribute', () => {
    render(<FormulaCard {...baseProps} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Fraction', () => {
  it('renders numerator and denominator', () => {
    render(<Fraction num="Vc × 1000" den="π × D" />);
    expect(screen.getByText('Vc × 1000')).toBeInTheDocument();
    expect(screen.getByText('π × D')).toBeInTheDocument();
  });
});
