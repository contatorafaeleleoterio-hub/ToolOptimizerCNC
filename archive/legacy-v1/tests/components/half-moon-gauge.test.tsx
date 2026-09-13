import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HalfMoonGauge } from '@/components/half-moon-gauge';

describe('HalfMoonGauge', () => {
  it('renders gauge container with data-testid', () => {
    const { container } = render(<HalfMoonGauge value={1000} maxValue={5000} />);
    expect(container.querySelector('[data-testid="gauge-svg"]')).toBeTruthy();
  });

  it('renders 41 bars (inner colored rects with border-radius: 2px)', () => {
    const { container } = render(<HalfMoonGauge value={0} maxValue={5000} />);
    const gaugeSvg = container.querySelector('[data-testid="gauge-svg"]');
    // Each bar has an inner colored div with borderRadius: 2px
    const barRects = gaugeSvg?.querySelectorAll('[style*="border-radius: 2px"]');
    expect(barRects?.length).toBe(41);
  });

  it('renders active segments proportional to value', () => {
    const { container } = render(<HalfMoonGauge value={2500} maxValue={5000} />);
    const activeSegs = container.querySelectorAll('[data-testid="gauge-segment-active"]');
    // pct = 50/150 * 41 ≈ 14 active bars
    expect(activeSegs.length).toBeGreaterThan(10);
    expect(activeSegs.length).toBeLessThan(20);
  });

  it('renders 0 active segments when value is 0', () => {
    const { container } = render(<HalfMoonGauge value={0} maxValue={5000} />);
    const activeSegs = container.querySelectorAll('[data-testid="gauge-segment-active"]');
    expect(activeSegs.length).toBe(0);
  });

  it('renders all 41 active segments when value exceeds maxValue * 1.5', () => {
    const { container } = render(<HalfMoonGauge value={10000} maxValue={5000} />);
    const activeSegs = container.querySelectorAll('[data-testid="gauge-segment-active"]');
    expect(activeSegs.length).toBe(41);
  });

  it('renders needle element', () => {
    const { container } = render(<HalfMoonGauge value={1000} maxValue={5000} />);
    expect(container.querySelector('[data-testid="gauge-needle"]')).toBeTruthy();
  });

  it('needle angle is -90deg at value=0', () => {
    const { container } = render(<HalfMoonGauge value={0} maxValue={5000} />);
    const needle = container.querySelector('[data-testid="gauge-needle"]') as HTMLElement;
    expect(needle?.style.transform).toContain('rotate(-90deg)');
  });

  it('needle angle is 90deg when value >= maxValue * 1.5', () => {
    const { container } = render(<HalfMoonGauge value={10000} maxValue={5000} />);
    const needle = container.querySelector('[data-testid="gauge-needle"]') as HTMLElement;
    expect(needle?.style.transform).toContain('rotate(90deg)');
  });

  it('shows percentage value in center display', () => {
    render(<HalfMoonGauge value={2500} maxValue={5000} />);
    // pct = (2500/5000)*100 = 50, displayed as Math.round(50/150 * 100... wait no
    // pct = Math.min((2500/5000)*100, 150) = 50
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('shows % symbol without badge', () => {
    render(<HalfMoonGauge value={1000} maxValue={5000} />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('shows badge text when provided', () => {
    render(<HalfMoonGauge value={1000} maxValue={5000} badge="12.5 cm³/min" />);
    expect(screen.getByText('12.5 cm³/min')).toBeInTheDocument();
  });

  it('shows label when provided', () => {
    render(<HalfMoonGauge value={1000} maxValue={5000} label="Eficiência de Avanço" />);
    expect(screen.getByText('Eficiência de Avanço')).toBeInTheDocument();
  });

  it('caps display at 150 when value is very large', () => {
    render(<HalfMoonGauge value={99999} maxValue={5000} />);
    const matches = screen.getAllByText('150');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── size="sm" (mobile) ──────────────────────────────────────────────────────

  it('size="sm" still renders 41 bars', () => {
    const { container } = render(<HalfMoonGauge value={0} maxValue={5000} size="sm" />);
    const gaugeSvg = container.querySelector('[data-testid="gauge-svg"]');
    const barRects = gaugeSvg?.querySelectorAll('[style*="border-radius: 2px"]');
    expect(barRects?.length).toBe(41);
  });

  it('size="sm" arc container has width 160px', () => {
    const { container } = render(<HalfMoonGauge value={0} maxValue={5000} size="sm" />);
    const gaugeSvg = container.querySelector('[data-testid="gauge-svg"]') as HTMLElement;
    expect(gaugeSvg?.style.width).toBe('160px');
  });

  it('size="md" (default) arc container has width 240px', () => {
    const { container } = render(<HalfMoonGauge value={0} maxValue={5000} />);
    const gaugeSvg = container.querySelector('[data-testid="gauge-svg"]') as HTMLElement;
    expect(gaugeSvg?.style.width).toBe('240px');
  });
});
