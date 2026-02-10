import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Gauge, getSegmentColor } from '@/components/gauge';

describe('Gauge', () => {
  it('renders SVG element with correct viewBox', () => {
    const { container } = render(<Gauge value={1200} maxValue={5000} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 200 200');
  });

  it('shows percentage value', () => {
    render(<Gauge value={2500} maxValue={5000} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('shows label text', () => {
    render(<Gauge value={1000} maxValue={5000} label="Feed Efficiency" />);
    expect(screen.getByText('Feed Efficiency')).toBeInTheDocument();
  });

  it('caps percentage at 150', () => {
    render(<Gauge value={10000} maxValue={5000} />);
    const matches = screen.getAllByText('150');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('shows 0 for zero value', () => {
    render(<Gauge value={0} maxValue={5000} />);
    const matches = screen.getAllByText('0');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders 40 track segments', () => {
    const { container } = render(<Gauge value={1000} maxValue={5000} />);
    const trackPaths = container.querySelectorAll('g.opacity-10 path');
    expect(trackPaths.length).toBe(40);
  });

  it('renders active segments proportional to value', () => {
    const { container } = render(<Gauge value={2500} maxValue={5000} />);
    const activeSegs = container.querySelectorAll('[data-testid="gauge-segment-active"]');
    // 50% of 150 max = 33.3% fill → 40 * (50/150) = ~13 segments
    expect(activeSegs.length).toBeGreaterThan(10);
    expect(activeSegs.length).toBeLessThan(20);
  });

  it('renders scale markers', () => {
    const { container } = render(<Gauge value={1000} maxValue={5000} />);
    expect(container.querySelector('[data-testid="scale-0"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="scale-100"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="scale-150"]')).toBeTruthy();
  });

  it('100% marker has cyan color', () => {
    const { container } = render(<Gauge value={1000} maxValue={5000} />);
    const marker100 = container.querySelector('[data-testid="scale-100"]');
    expect(marker100?.getAttribute('fill')).toBe('#00D9FF');
  });

  it('shows % symbol', () => {
    render(<Gauge value={1000} maxValue={5000} />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('has glow filter', () => {
    const { container } = render(<Gauge value={1000} maxValue={5000} />);
    expect(container.querySelector('filter#gauge-glow')).toBeTruthy();
  });
});

describe('getSegmentColor', () => {
  it('returns green for 0-33% segments (0-50% value range)', () => {
    expect(getSegmentColor(0)).toBe('#39FF14');
    expect(getSegmentColor(10)).toBe('#39FF14');
  });

  it('returns green-cyan for 34-66% segments (51-100% value range)', () => {
    expect(getSegmentColor(15)).toBe('#00FF88');
    expect(getSegmentColor(25)).toBe('#00FF88');
  });

  it('returns cyan for 67-80% segments (101-120% value range)', () => {
    expect(getSegmentColor(28)).toBe('#00D9FF');
    expect(getSegmentColor(31)).toBe('#00D9FF');
  });

  it('returns gold for >80% segments (>120% value range)', () => {
    expect(getSegmentColor(35)).toBe('#FFD700');
    expect(getSegmentColor(39)).toBe('#FFD700');
  });
});
