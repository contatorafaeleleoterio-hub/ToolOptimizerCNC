import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SegmentedGradientBar } from '@/components/segmented-gradient-bar';
import { useMachiningStore } from '@/store';

describe('SegmentedGradientBar', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  // ── Wrapper data-testids ────────────────────────────────────────────────────

  it('renders wrapper with correct data-testid for vc', () => {
    render(<SegmentedGradientBar paramKey="vc" />);
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
  });

  it('renders wrapper with correct data-testid for ae', () => {
    render(<SegmentedGradientBar paramKey="ae" />);
    expect(screen.getByTestId('health-bar-ae')).toBeInTheDocument();
  });

  it('renders wrapper with correct data-testid for ap', () => {
    render(<SegmentedGradientBar paramKey="ap" />);
    expect(screen.getByTestId('health-bar-ap')).toBeInTheDocument();
  });

  it('renders wrapper with correct data-testid for fz', () => {
    render(<SegmentedGradientBar paramKey="fz" />);
    expect(screen.getByTestId('health-bar-fz')).toBeInTheDocument();
  });

  // ── Segment count ──────────────────────────────────────────────────────────

  it('renders exactly 50 segments for vc', () => {
    const { container } = render(<SegmentedGradientBar paramKey="vc" />);
    const wrapper = container.querySelector('[data-testid="health-bar-vc"]');
    // Segments are immediate children of the segment track div (flex row)
    // The track div has flex display. Count children inside the track.
    // Structure: wrapper → relative div → [idealHighlight, trackDiv, cursor], trackDiv → 50 segments
    // Each segment has flex:1 and borderRadius: 2px — query by inline style
    const segments = wrapper?.querySelectorAll('[style*="flex: 1"]');
    expect(segments?.length).toBe(50);
  });

  it('renders exactly 50 segments for ae', () => {
    const { container } = render(<SegmentedGradientBar paramKey="ae" />);
    const wrapper = container.querySelector('[data-testid="health-bar-ae"]');
    const segments = wrapper?.querySelectorAll('[style*="flex: 1"]');
    expect(segments?.length).toBe(50);
  });

  it('renders exactly 30 segments when segments={30} (mobile)', () => {
    const { container } = render(<SegmentedGradientBar paramKey="vc" segments={30} />);
    const wrapper = container.querySelector('[data-testid="health-bar-vc"]');
    const segs = wrapper?.querySelectorAll('[style*="flex: 1"]');
    expect(segs?.length).toBe(30);
  });

  it('inactive fz with segments={30} renders 30 segments', () => {
    const { container } = render(<SegmentedGradientBar paramKey="fz" segments={30} />);
    const wrapper = container.querySelector('[data-testid="health-bar-fz-inactive"]');
    const segs = wrapper?.querySelectorAll('[style*="flex: 1"]');
    expect(segs?.length).toBe(30);
  });

  // ── Inactive state (fz before simular) ────────────────────────────────────

  it('fz shows inactive bar when resultado is null', () => {
    render(<SegmentedGradientBar paramKey="fz" />);
    expect(screen.getByTestId('health-bar-fz-inactive')).toBeInTheDocument();
  });

  it('fz shows inactive text message', () => {
    render(<SegmentedGradientBar paramKey="fz" />);
    expect(screen.getByText('Simular para ativar')).toBeInTheDocument();
  });

  it('vc is always active (no inactive state) even when resultado = null', () => {
    render(<SegmentedGradientBar paramKey="vc" />);
    expect(screen.queryByTestId('health-bar-vc-inactive')).not.toBeInTheDocument();
  });

  it('ae is always active (no inactive state) even when resultado = null', () => {
    render(<SegmentedGradientBar paramKey="ae" />);
    expect(screen.queryByTestId('health-bar-ae-inactive')).not.toBeInTheDocument();
  });

  it('ap is always active (no inactive state) even when resultado = null', () => {
    render(<SegmentedGradientBar paramKey="ap" />);
    expect(screen.queryByTestId('health-bar-ap-inactive')).not.toBeInTheDocument();
  });

  // ── fz becomes active after calcular() ────────────────────────────────────

  it('fz shows segments after calcular()', () => {
    useMachiningStore.getState().calcular();
    const { container } = render(<SegmentedGradientBar paramKey="fz" />);
    expect(screen.queryByTestId('health-bar-fz-inactive')).not.toBeInTheDocument();
    const wrapper = container.querySelector('[data-testid="health-bar-fz"]');
    const segments = wrapper?.querySelectorAll('[style*="flex: 1"]');
    expect(segments?.length).toBe(50);
  });

  // ── CTF badge (fz) ─────────────────────────────────────────────────────────

  it('shows ae-ratio-display for ae', () => {
    render(<SegmentedGradientBar paramKey="ae" />);
    expect(screen.getByTestId('ae-ratio-display')).toBeInTheDocument();
  });

  it('shows ap-ld-display for ap', () => {
    render(<SegmentedGradientBar paramKey="ap" />);
    expect(screen.getByTestId('ap-ld-display')).toBeInTheDocument();
  });

  // ── Zone labels ────────────────────────────────────────────────────────────

  it('shows leftLabel for vc', () => {
    render(<SegmentedGradientBar paramKey="vc" />);
    expect(screen.getAllByText('Baixo').length).toBeGreaterThanOrEqual(1);
  });

  it('shows leftLabel for ae', () => {
    render(<SegmentedGradientBar paramKey="ae" />);
    expect(screen.getAllByText('CTF Alto').length).toBeGreaterThanOrEqual(1);
  });

  it('shows rightLabel for ae', () => {
    render(<SegmentedGradientBar paramKey="ae" />);
    expect(screen.getAllByText('Excessivo').length).toBeGreaterThanOrEqual(1);
  });

  it('shows leftLabel for ap', () => {
    render(<SegmentedGradientBar paramKey="ap" />);
    expect(screen.getAllByText('Leve').length).toBeGreaterThanOrEqual(1);
  });

  // ── idealRange — Zona Verde Dinâmica (ITEM-11) ────────────────────────────

  it('renders normally without idealRange (regression)', () => {
    const { container } = render(<SegmentedGradientBar paramKey="vc" />);
    const segs = container.querySelectorAll('[style*="flex: 1"]');
    expect(segs.length).toBe(50);
  });

  it('accepts idealRange prop without throwing', () => {
    expect(() =>
      render(<SegmentedGradientBar paramKey="vc" idealRange={{ start: 0.3, end: 0.7 }} />)
    ).not.toThrow();
  });

  it('segments inside idealRange have full opacity (1)', () => {
    // idealRange covers entire bar → all 50 segments in zone → opacity 1
    const { container } = render(
      <SegmentedGradientBar paramKey="vc" idealRange={{ start: 0.0, end: 1.0 }} />
    );
    const segs = Array.from(container.querySelectorAll('[style*="flex: 1"]')) as HTMLElement[];
    const fullyOpaque = segs.filter((el) => el.style.opacity === '1');
    expect(fullyOpaque.length).toBe(50);
  });

  it('segments outside idealRange have dimmed opacity (0.65)', () => {
    // idealRange covers second half only → first half is dimmed
    const { container } = render(
      <SegmentedGradientBar paramKey="vc" idealRange={{ start: 0.5, end: 1.0 }} />
    );
    const segs = Array.from(container.querySelectorAll('[style*="flex: 1"]')) as HTMLElement[];
    // Segment 0 (segPct = 0/50 = 0) is outside zone → 0.65
    expect(segs[0].style.opacity).toBe('0.65');
  });

  it('without idealRange, active segments keep opacity 1 (no dimming)', () => {
    // cursor at 50% → segments to the left of cursor are active
    useMachiningStore.getState().setParametros({ vc: 150 }); // push vc toward max
    const { container } = render(<SegmentedGradientBar paramKey="vc" />);
    const segs = Array.from(container.querySelectorAll('[style*="flex: 1"]')) as HTMLElement[];
    // At least some active segments should have opacity 1
    const fullyOpaque = segs.filter((el) => el.style.opacity === '1');
    expect(fullyOpaque.length).toBeGreaterThan(0);
  });

  it('works with 50 segments (desktop) and idealRange', () => {
    const { container } = render(
      <SegmentedGradientBar paramKey="vc" segments={50} idealRange={{ start: 0.4, end: 0.6 }} />
    );
    const segs = container.querySelectorAll('[style*="flex: 1"]');
    expect(segs.length).toBe(50);
  });

  it('works with 30 segments (mobile) and idealRange', () => {
    const { container } = render(
      <SegmentedGradientBar paramKey="vc" segments={30} idealRange={{ start: 0.4, end: 0.6 }} />
    );
    const segs = container.querySelectorAll('[style*="flex: 1"]');
    expect(segs.length).toBe(30);
  });

  it('zone overlay at 40% by default, moves to idealRange.start when provided', () => {
    // Static position (no idealRange)
    const { container: c1 } = render(<SegmentedGradientBar paramKey="vc" />);
    const overlay1 = c1.querySelector('[data-testid="zone-overlay"]') as HTMLElement;
    expect(overlay1.style.left).toBe('40%');
    expect(overlay1.style.width).toBe('20%');
  });

  it('zone overlay shifts to dynamic position when idealRange provided', () => {
    // Use exact binary fractions: start=0.25, end=0.75 → left=25%, width=50%
    const { container } = render(
      <SegmentedGradientBar paramKey="vc" idealRange={{ start: 0.25, end: 0.75 }} />
    );
    const overlay = container.querySelector('[data-testid="zone-overlay"]') as HTMLElement;
    expect(overlay.style.left).toBe('25%');
    expect(overlay.style.width).toBe('50%');
  });
});
