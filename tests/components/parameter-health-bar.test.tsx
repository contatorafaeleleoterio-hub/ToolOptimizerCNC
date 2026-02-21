import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  computeVcPosition,
  computeFzPosition,
  computeAePosition,
  computeApPosition,
  ParameterHealthBar,
} from '@/components/parameter-health-bar';
import { useMachiningStore } from '@/store';

// ---------------------------------------------------------------------------
// computeVcPosition — Vc zone uses asymmetric normalization:
//   left of center (rpmRatio < 0.55): divide by 0.55
//   right of center (rpmRatio > 0.55): divide by 0.45
// ---------------------------------------------------------------------------
describe('computeVcPosition', () => {
  it('center of ideal zone (rpmRatio=0.55) → position ≈ 0', () => {
    const { position } = computeVcPosition(6600, 12000);
    expect(Math.abs(position)).toBeLessThan(0.01);
  });

  it('lower ideal boundary (rpmRatio=0.30) → position ≈ -0.45', () => {
    const { position } = computeVcPosition(3600, 12000);
    expect(Math.abs(position - (-0.4545))).toBeLessThan(0.01);
  });

  it('maxRPM (rpmRatio=1.0) → position = 1.0 (exact right edge)', () => {
    const { position } = computeVcPosition(12000, 12000);
    expect(position).toBeCloseTo(1.0, 5);
  });

  it('low rpmRatio (rpmRatio=0.10) → position ≈ -0.82 (sub-ótimo)', () => {
    const { position } = computeVcPosition(1200, 12000);
    expect(Math.abs(position - (-0.8182))).toBeLessThan(0.01);
  });

  it('position is clamped to [-1, 1] when rpm > maxRPM', () => {
    const { position } = computeVcPosition(15000, 12000); // ratio = 1.25
    expect(position).toBe(1.0);
  });

  it('rpmRatio < 30% → zone = amarelo, label = Sub-ótimo', () => {
    const { zone, zoneLabel } = computeVcPosition(1200, 12000); // 10%
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Sub-ótimo');
  });

  it('rpmRatio 30–75% → zone = verde, label = Ideal', () => {
    const { zone, zoneLabel } = computeVcPosition(5400, 12000); // 45%
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Ideal');
  });

  it('rpmRatio 75–90% → zone = amarelo, label = Alerta', () => {
    const { zone, zoneLabel } = computeVcPosition(9600, 12000); // 80%
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Alerta');
  });

  it('rpmRatio > 90% → zone = vermelho, label = Desgaste', () => {
    const { zone, zoneLabel } = computeVcPosition(11400, 12000); // 95%
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Desgaste');
  });
});

// ---------------------------------------------------------------------------
// computeFzPosition — chip load ratio: fzEfetivo / (D × 0.017)
//   chipRatio center = 1.0; symmetric normalization position = chipRatio - 1.0
// ---------------------------------------------------------------------------
describe('computeFzPosition', () => {
  it('fzEfetivo=0.10, D=6 → chipRatio≈0.98, position≈-0.02', () => {
    const { position } = computeFzPosition(0.10, 6, 1.0);
    expect(Math.abs(position - (-0.0196))).toBeLessThan(0.01);
  });

  it('fzEfetivo=0.02, D=6 → chipRatio≈0.196, position≈-0.80 (Atrito)', () => {
    const { position } = computeFzPosition(0.02, 6, 1.0);
    expect(Math.abs(position - (-0.804))).toBeLessThan(0.01);
  });

  it('fzEfetivo=0.30, D=6 → position = 1.0 (clamped, Vibração)', () => {
    const { position } = computeFzPosition(0.30, 6, 1.0);
    expect(position).toBe(1.0);
  });

  it('ctf=1.41 → ctfBadge = "CTF ×1.41"', () => {
    const { ctfBadge } = computeFzPosition(0.10, 6, 1.41);
    expect(ctfBadge).toBe('CTF ×1.41');
  });

  it('ctf=1.0 → ctfBadge = null (no CTF active)', () => {
    const { ctfBadge } = computeFzPosition(0.10, 6, 1.0);
    expect(ctfBadge).toBeNull();
  });

  it('ctf=0.99 → ctfBadge = null (below threshold)', () => {
    const { ctfBadge } = computeFzPosition(0.10, 6, 0.99);
    expect(ctfBadge).toBeNull();
  });

  it('chipRatio < 0.4 → zone = vermelho (Atrito)', () => {
    const { zone, zoneLabel } = computeFzPosition(0.02, 6, 1.0); // chipRatio ≈ 0.196
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Atrito');
  });

  it('chipRatio 0.4–0.7 → zone = amarelo (Leve)', () => {
    const { zone, zoneLabel } = computeFzPosition(0.05, 6, 1.0); // chipRatio ≈ 0.49
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Leve');
  });

  it('chipRatio 0.7–1.4 → zone = verde (Ideal)', () => {
    const { zone } = computeFzPosition(0.10, 6, 1.0); // chipRatio ≈ 0.98
    expect(zone).toBe('verde');
  });

  it('chipRatio > 2.0 → zone = vermelho (Vibração)', () => {
    const { zone, zoneLabel } = computeFzPosition(0.30, 6, 1.0); // chipRatio ≈ 2.94
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Vibração');
  });
});

// ---------------------------------------------------------------------------
// computeAePosition — ae/D ratio; center = 0.50
// ---------------------------------------------------------------------------
describe('computeAePosition', () => {
  it('ae=3, D=6 → ae/D = 0.50, position = 0 (exact center)', () => {
    const { position } = computeAePosition(3, 6);
    expect(Math.abs(position)).toBeLessThan(0.001);
  });

  it('ae=1.5, D=6 → ae/D = 0.25, position = -0.5 (CTF Ativo)', () => {
    const { position } = computeAePosition(1.5, 6);
    expect(Math.abs(position - (-0.5))).toBeLessThan(0.001);
  });

  it('ae=4.5, D=6 → ae/D = 0.75, position = +0.5 (Engaj. Pleno)', () => {
    const { position } = computeAePosition(4.5, 6);
    expect(Math.abs(position - 0.5)).toBeLessThan(0.001);
  });

  it('ae=3, D=6 → aeDRatioDisplay = "50.0%"', () => {
    const { aeDRatioDisplay } = computeAePosition(3, 6);
    expect(aeDRatioDisplay).toBe('50.0%');
  });

  it('ae=2.4, D=6 → aeDRatioDisplay = "40.0%"', () => {
    const { aeDRatioDisplay } = computeAePosition(2.4, 6);
    expect(aeDRatioDisplay).toBe('40.0%');
  });

  it('clamp: ae=6.1, D=6 → ae/D=1.017 → position = 1.0', () => {
    const { position } = computeAePosition(6.1, 6);
    expect(position).toBe(1.0);
  });

  it('ae/D < 20% → zone = amarelo (CTF Alto)', () => {
    const { zone, zoneLabel } = computeAePosition(1.0, 6); // ae/D ≈ 16.7%
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('CTF Alto');
  });

  it('ae/D = 25% → zone = verde (CTF Ativo)', () => {
    const { zone, zoneLabel } = computeAePosition(1.5, 6); // ae/D = 25%
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('CTF Ativo');
  });

  it('ae/D = 50% → zone = verde (CTF Ativo, at boundary)', () => {
    const { zone } = computeAePosition(3, 6); // ae/D = 50%
    expect(zone).toBe('verde');
  });

  it('ae/D = 66% → zone = verde (Engaj. Pleno)', () => {
    const { zone, zoneLabel } = computeAePosition(4, 6); // ae/D ≈ 66.7%
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Engaj. Pleno');
  });

  it('ae/D > 75% → zone = amarelo (Pesado)', () => {
    const { zone, zoneLabel } = computeAePosition(5, 6); // ae/D ≈ 83%
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Pesado');
  });
});

// ---------------------------------------------------------------------------
// computeApPosition — ap/D ratio, L/D modulates threshold
// ---------------------------------------------------------------------------
describe('computeApPosition', () => {
  it('L/D=3, ap=9, D=6 → position = 0 (at limiar, Padrão center)', () => {
    const { position } = computeApPosition(9, 6, 18); // balanco=18 → L/D=3
    expect(Math.abs(position)).toBeLessThan(0.001);
  });

  it('L/D=3, ap=15, D=6 → position ≈ +0.667 (Agressivo)', () => {
    const { position } = computeApPosition(15, 6, 18);
    expect(Math.abs(position - 0.667)).toBeLessThan(0.005);
  });

  it('L/D=4, ap=6, D=6 → position = 0 (limiarAgressivo=1.0, at center)', () => {
    const { position } = computeApPosition(6, 6, 24); // balanco=24 → L/D=4
    expect(Math.abs(position)).toBeLessThan(0.001);
  });

  it('L/D=5, ap=6, D=6 → position > 0 (limiarAgressivo=0.6, agressivo)', () => {
    const { position } = computeApPosition(6, 6, 30); // balanco=30 → L/D=5
    expect(position).toBeGreaterThan(0);
  });

  it('L/D=3 → ldColorClass = text-seg-verde', () => {
    const { ldColorClass } = computeApPosition(9, 6, 18);
    expect(ldColorClass).toBe('text-seg-verde');
  });

  it('3 < L/D ≤ 4 (L/D=3.5) → ldColorClass = text-seg-amarelo', () => {
    const { ldColorClass } = computeApPosition(6, 6, 21); // balanco=21 → L/D=3.5
    expect(ldColorClass).toBe('text-seg-amarelo');
  });

  it('L/D=4 (exact) → ldColorClass = text-seg-amarelo', () => {
    const { ldColorClass } = computeApPosition(6, 6, 24); // balanco=24 → L/D=4
    expect(ldColorClass).toBe('text-seg-amarelo');
  });

  it('4 < L/D ≤ 6 (L/D=5) → ldColorClass = text-seg-vermelho', () => {
    const { ldColorClass } = computeApPosition(6, 6, 30); // balanco=30 → L/D=5
    expect(ldColorClass).toBe('text-seg-vermelho');
  });

  it('ldDisplay shows formatted L/D ratio', () => {
    const { ldDisplay } = computeApPosition(9, 6, 18); // L/D=3.0
    expect(ldDisplay).toBe('L/D: 3.0');
  });

  it('position clamped to 1.0 when ap >> limiar', () => {
    const { position } = computeApPosition(30, 6, 18); // ap=30, D=6, limiar=1.5 → apDRatio=5 → (5/1.5)-1=2.33 clamped
    expect(position).toBe(1.0);
  });

  it('position clamped to -1.0 when ap = 0 (edge case)', () => {
    const { position } = computeApPosition(0, 6, 18); // apDRatio=0 → (0/1.5)-1=-1
    expect(position).toBe(-1.0);
  });
});

// ---------------------------------------------------------------------------
// ParameterHealthBar — Component render tests
// ---------------------------------------------------------------------------
describe('ParameterHealthBar', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders wrapper with correct data-testid for vc', () => {
    render(<ParameterHealthBar paramKey="vc" />);
    expect(screen.getByTestId('health-bar-vc')).toBeInTheDocument();
  });

  it('renders wrapper with correct data-testid for fz', () => {
    render(<ParameterHealthBar paramKey="fz" />);
    expect(screen.getByTestId('health-bar-fz')).toBeInTheDocument();
  });

  it('renders wrapper with correct data-testid for ae', () => {
    render(<ParameterHealthBar paramKey="ae" />);
    expect(screen.getByTestId('health-bar-ae')).toBeInTheDocument();
  });

  it('renders wrapper with correct data-testid for ap', () => {
    render(<ParameterHealthBar paramKey="ap" />);
    expect(screen.getByTestId('health-bar-ap')).toBeInTheDocument();
  });

  it('vc bar shows inactive state when resultado = null', () => {
    // resultado is null after reset()
    render(<ParameterHealthBar paramKey="vc" />);
    expect(screen.getByTestId('health-bar-vc-inactive')).toBeInTheDocument();
  });

  it('fz bar shows inactive state when resultado = null', () => {
    render(<ParameterHealthBar paramKey="fz" />);
    expect(screen.getByTestId('health-bar-fz-inactive')).toBeInTheDocument();
  });

  it('ae bar is always active (no inactive state) even when resultado = null', () => {
    render(<ParameterHealthBar paramKey="ae" />);
    expect(screen.queryByTestId('health-bar-ae-inactive')).not.toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ae-fill')).toBeInTheDocument();
  });

  it('ap bar is always active (no inactive state) even when resultado = null', () => {
    render(<ParameterHealthBar paramKey="ap" />);
    expect(screen.queryByTestId('health-bar-ap-inactive')).not.toBeInTheDocument();
    expect(screen.getByTestId('health-bar-ap-fill')).toBeInTheDocument();
  });

  it('vc bar shows fill after calcular()', () => {
    useMachiningStore.getState().calcular();
    render(<ParameterHealthBar paramKey="vc" />);
    expect(screen.queryByTestId('health-bar-vc-inactive')).not.toBeInTheDocument();
    expect(screen.getByTestId('health-bar-vc-fill')).toBeInTheDocument();
  });

  it('fz bar shows fill after calcular()', () => {
    useMachiningStore.getState().calcular();
    render(<ParameterHealthBar paramKey="fz" />);
    expect(screen.queryByTestId('health-bar-fz-inactive')).not.toBeInTheDocument();
    expect(screen.getByTestId('health-bar-fz-fill')).toBeInTheDocument();
  });

  it('ae bar shows ae/D readout', () => {
    render(<ParameterHealthBar paramKey="ae" />);
    expect(screen.getByTestId('ae-ratio-display')).toBeInTheDocument();
  });

  it('ap bar shows L/D readout', () => {
    render(<ParameterHealthBar paramKey="ap" />);
    expect(screen.getByTestId('ap-ld-display')).toBeInTheDocument();
  });

  it('fz bar shows CTF badge when ctf > 1.0 and resultado defined', () => {
    // ae=2mm (33% of D=6) → CTF = 1/sqrt(2/6) ≈ 1.73 > 1.0
    useMachiningStore.getState().setParametros({ ae: 2 });
    useMachiningStore.getState().calcular();
    const resultado = useMachiningStore.getState().resultado;
    expect(resultado).not.toBeNull();
    expect(resultado!.seguranca.ctf).toBeGreaterThan(1.0);

    render(<ParameterHealthBar paramKey="fz" />);
    expect(screen.getByTestId('ctf-badge')).toBeInTheDocument();
  });

  it('fz bar has no CTF badge when resultado = null', () => {
    render(<ParameterHealthBar paramKey="fz" />);
    expect(screen.queryByTestId('ctf-badge')).not.toBeInTheDocument();
  });

  it('fz bar has no CTF badge when ae=50%D (ctf=1.0)', () => {
    // ae=3 = 50% of D=6 → CTF = 1.0 (boundary, no CTF)
    useMachiningStore.getState().setParametros({ ae: 3 });
    useMachiningStore.getState().calcular();
    render(<ParameterHealthBar paramKey="fz" />);
    expect(screen.queryByTestId('ctf-badge')).not.toBeInTheDocument();
  });
});
