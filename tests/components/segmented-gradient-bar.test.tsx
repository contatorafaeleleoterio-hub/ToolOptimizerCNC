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
});
