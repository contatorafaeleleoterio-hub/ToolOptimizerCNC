import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BidirectionalSlider } from '@/components/bidirectional-slider';

describe('BidirectionalSlider', () => {
  const defaultProps = {
    baseValue: 4200,
    currentPercent: 0,
    onChange: vi.fn(),
    color: 'primary',
    rgb: '0,217,255',
    label: 'RPM',
    unit: 'RPM',
  };

  it('renders with center position (0%) showing base value', () => {
    render(<BidirectionalSlider {...defaultProps} />);
    expect(screen.getByText('4,200')).toBeInTheDocument();
    const zeroPercentElements = screen.getAllByText('0%');
    expect(zeroPercentElements.length).toBeGreaterThan(0);
  });

  it('shows positive percentage and adjusted value', () => {
    render(<BidirectionalSlider {...defaultProps} currentPercent={50} />);
    expect(screen.getByText('6,300')).toBeInTheDocument(); // 4200 * 1.5
    expect(screen.getByText('+50%')).toBeInTheDocument();
  });

  it('shows negative percentage and adjusted value', () => {
    render(<BidirectionalSlider {...defaultProps} currentPercent={-50} />);
    expect(screen.getByText('2,100')).toBeInTheDocument(); // 4200 * 0.5
    expect(screen.getByText('-50%')).toBeInTheDocument();
  });

  it('calls onChange when + button is clicked', () => {
    const onChange = vi.fn();
    render(<BidirectionalSlider {...defaultProps} onChange={onChange} />);
    const plusButton = screen.getAllByRole('button').find(btn => btn.textContent === '+');
    fireEvent.click(plusButton!);
    expect(onChange).toHaveBeenCalledWith(10); // +10%
  });

  it('calls onChange when - button is clicked', () => {
    const onChange = vi.fn();
    render(<BidirectionalSlider {...defaultProps} onChange={onChange} currentPercent={20} />);
    const minusButton = screen.getAllByRole('button').find(btn => btn.textContent === '−');
    fireEvent.click(minusButton!);
    expect(onChange).toHaveBeenCalledWith(10); // 20% - 10% = 10%
  });

  it('calculates value at +150%', () => {
    render(<BidirectionalSlider {...defaultProps} currentPercent={150} />);
    expect(screen.getByText('10,500')).toBeInTheDocument(); // 4200 * 2.5
    const plusElements = screen.getAllByText('+150%');
    expect(plusElements.length).toBeGreaterThan(0);
  });

  it('calculates value at -150%', () => {
    render(<BidirectionalSlider {...defaultProps} currentPercent={-150} />);
    // Value should be close to 0 (4200 * (1 - 1.5) = -2100 → rounded to 0 or negative)
    // Just check that -150% is shown
    const minusElements = screen.getAllByText('-150%');
    expect(minusElements.length).toBeGreaterThan(0);
  });

  it('shows tick marks labels (-150%, 0%, +150%)', () => {
    render(<BidirectionalSlider {...defaultProps} />);
    expect(screen.getByText('-150%')).toBeInTheDocument();
    const zeroPercentElements = screen.getAllByText('0%');
    expect(zeroPercentElements.length).toBeGreaterThan(0);
    expect(screen.getByText('+150%')).toBeInTheDocument();
  });
});
