import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Gauge, getQualityLabel } from '@/components/gauge';

describe('Gauge', () => {
  it('renders SVG element', () => {
    const { container } = render(<Gauge value={1200} maxValue={5000} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 100 50');
  });

  it('shows percentage value', () => {
    render(<Gauge value={2500} maxValue={5000} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('shows label text', () => {
    render(<Gauge value={1000} maxValue={5000} label="Feed Efficiency" />);
    expect(screen.getByText('Feed Efficiency')).toBeInTheDocument();
  });

  it('caps percentage at 100', () => {
    render(<Gauge value={6000} maxValue={5000} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('shows 0 for zero value', () => {
    render(<Gauge value={0} maxValue={5000} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders gradient definition', () => {
    const { container } = render(<Gauge value={1000} maxValue={5000} />);
    const gradient = container.querySelector('linearGradient');
    expect(gradient).toBeTruthy();
  });

  it('renders both background and foreground arcs', () => {
    const { container } = render(<Gauge value={2500} maxValue={5000} />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(2);
  });
});

describe('getQualityLabel', () => {
  it('returns Low for 0-40%', () => {
    expect(getQualityLabel(0)).toBe('Low');
    expect(getQualityLabel(20)).toBe('Low');
    expect(getQualityLabel(39)).toBe('Low');
  });

  it('returns Good for 40-70%', () => {
    expect(getQualityLabel(40)).toBe('Good');
    expect(getQualityLabel(55)).toBe('Good');
    expect(getQualityLabel(69)).toBe('Good');
  });

  it('returns High for 70-90%', () => {
    expect(getQualityLabel(70)).toBe('High');
    expect(getQualityLabel(80)).toBe('High');
    expect(getQualityLabel(89)).toBe('High');
  });

  it('returns Max for 90-100%', () => {
    expect(getQualityLabel(90)).toBe('Max');
    expect(getQualityLabel(100)).toBe('Max');
  });
});
