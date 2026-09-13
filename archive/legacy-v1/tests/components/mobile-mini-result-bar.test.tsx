import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MiniResultBar } from '@/components/mobile/mobile-mini-result-bar';

describe('MiniResultBar', () => {
  it('renders the label and formatted value', () => {
    render(<MiniResultBar label="Avanço" value={955} maxValue={2000} unit="mm/min" />);
    expect(screen.getByText('Avanço')).toBeInTheDocument();
    expect(screen.getByText('955')).toBeInTheDocument();
    expect(screen.getByText('mm/min')).toBeInTheDocument();
  });

  it('formats values >= 1000 with a "k" suffix', () => {
    render(<MiniResultBar label="Avanço" value={1500} maxValue={2000} unit="mm/min" />);
    expect(screen.getByText('1.5k')).toBeInTheDocument();
  });

  it('formats values >= 100 with no decimals', () => {
    render(<MiniResultBar label="Avanço" value={182.7} maxValue={2000} unit="mm/min" />);
    expect(screen.getByText('183')).toBeInTheDocument();
  });

  it('formats values < 100 with 1 decimal', () => {
    render(<MiniResultBar label="MRR" value={45.3} maxValue={100} unit="cm³/min" />);
    expect(screen.getByText('45.3')).toBeInTheDocument();
  });

  it('prefers an explicit badge over the computed display value', () => {
    render(<MiniResultBar label="MRR" value={80} maxValue={100} unit="%" badge="12.3 cm³/min" />);
    expect(screen.getByText('12.3 cm³/min')).toBeInTheDocument();
    expect(screen.queryByText('80')).not.toBeInTheDocument();
  });

  it('handles maxValue = 0 without dividing by zero', () => {
    expect(() =>
      render(<MiniResultBar label="Saúde" value={0} maxValue={0} unit="%" />)
    ).not.toThrow();
  });
});
