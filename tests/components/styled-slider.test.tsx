import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StyledSlider, BTN_CLS } from '@/components/styled-slider';

describe('StyledSlider', () => {
  const defaultProps = {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    color: 'primary',
    rgb: '0,217,255',
    label: 'Test slider',
    onChange: vi.fn(),
  };

  it('renders without errors', () => {
    render(<StyledSlider {...defaultProps} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<StyledSlider {...defaultProps} label="Vc" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Vc slider');
  });

  it('has correct aria-valuenow', () => {
    render(<StyledSlider {...defaultProps} value={42} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '42');
  });

  it('has correct aria-valuemin', () => {
    render(<StyledSlider {...defaultProps} min={10} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemin', '10');
  });

  it('has correct aria-valuemax', () => {
    render(<StyledSlider {...defaultProps} max={200} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemax', '200');
  });

  it('has tabIndex=0 for keyboard navigation', () => {
    render(<StyledSlider {...defaultProps} />);
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '0');
  });

  it('calls onChange with incremented value on ArrowRight', () => {
    const onChange = vi.fn();
    render(<StyledSlider {...defaultProps} value={50} step={1} max={100} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('calls onChange with decremented value on ArrowLeft', () => {
    const onChange = vi.fn();
    render(<StyledSlider {...defaultProps} value={50} step={1} min={0} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('does not exceed max on ArrowRight', () => {
    const onChange = vi.fn();
    render(<StyledSlider {...defaultProps} value={100} step={1} max={100} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('does not go below min on ArrowLeft', () => {
    const onChange = vi.fn();
    render(<StyledSlider {...defaultProps} value={0} step={1} min={0} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('respects decimal step for ArrowRight', () => {
    const onChange = vi.fn();
    render(<StyledSlider {...defaultProps} value={0.5} step={0.01} max={1} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(Number(onChange.mock.calls[0][0])).toBeCloseTo(0.51, 5);
  });

  it('ignores other keys', () => {
    const onChange = vi.fn();
    render(<StyledSlider {...defaultProps} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('BTN_CLS', () => {
  it('is a non-empty string', () => {
    expect(typeof BTN_CLS).toBe('string');
    expect(BTN_CLS.length).toBeGreaterThan(0);
  });

  it('contains expected button classes', () => {
    expect(BTN_CLS).toContain('w-6');
    expect(BTN_CLS).toContain('h-6');
    expect(BTN_CLS).toContain('rounded');
    expect(BTN_CLS).toContain('active:scale-90');
  });
});
