import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  computeVcByValue,
  computeFzByValue,
  computeAeByValue,
  computeApByValue,
  ParameterHealthBar,
} from '@/components/parameter-health-bar';
import { useMachiningStore } from '@/store';

// ---------------------------------------------------------------------------
// computeVcByValue — zone based on vc/vcRecomendado ratio:
//   < 0.50 → vermelho/Baixo | 0.50–0.75 → amarelo/Sub-ótimo
//   0.75–1.20 → verde/Recomendado | 1.20–1.50 → amarelo/Alerta | > 1.50 → vermelho/Desgaste
// position [0, 1] = vc / vcMax
// ---------------------------------------------------------------------------
describe('computeVcByValue', () => {
  it('vc=0, vcRec=100, vcMax=260 → position = 0', () => {
    const { position } = computeVcByValue(0, 100, 260);
    expect(position).toBe(0);
  });

  it('vc=vcMax=260, vcRec=100 → position = 1.0', () => {
    const { position } = computeVcByValue(260, 100, 260);
    expect(position).toBeCloseTo(1.0, 5);
  });

  it('vc > vcMax → position clamped to 1.0', () => {
    const { position } = computeVcByValue(300, 100, 260);
    expect(position).toBe(1.0);
  });

  it('vc=100, vcRec=100 → position = 100/260 ≈ 0.385', () => {
    const { position } = computeVcByValue(100, 100, 260);
    expect(Math.abs(position - 100 / 260)).toBeLessThan(0.001);
  });

  it('ratio < 0.50 → zone = vermelho, label = Baixo', () => {
    const { zone, zoneLabel } = computeVcByValue(40, 100, 260); // ratio = 0.40
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Baixo');
  });

  it('ratio = 0.50 → zone = amarelo, label = Sub-ótimo (boundary inclusive)', () => {
    const { zone, zoneLabel } = computeVcByValue(50, 100, 260); // ratio = 0.50
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Sub-ótimo');
  });

  it('ratio 0.50–0.75 → zone = amarelo, label = Sub-ótimo', () => {
    const { zone, zoneLabel } = computeVcByValue(60, 100, 260); // ratio = 0.60
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Sub-ótimo');
  });

  it('ratio = 0.75 → zone = verde, label = Recomendado (boundary inclusive)', () => {
    const { zone, zoneLabel } = computeVcByValue(75, 100, 260); // ratio = 0.75
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Recomendado');
  });

  it('ratio 0.75–1.20 → zone = verde, label = Recomendado', () => {
    const { zone, zoneLabel } = computeVcByValue(100, 100, 260); // ratio = 1.00
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Recomendado');
  });

  it('ratio = 1.20 → zone = verde, label = Recomendado (boundary inclusive)', () => {
    const { zone, zoneLabel } = computeVcByValue(120, 100, 260); // ratio = 1.20
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Recomendado');
  });

  it('ratio 1.20–1.50 → zone = amarelo, label = Alerta', () => {
    const { zone, zoneLabel } = computeVcByValue(135, 100, 260); // ratio = 1.35
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Alerta');
  });

  it('ratio > 1.50 → zone = vermelho, label = Desgaste', () => {
    const { zone, zoneLabel } = computeVcByValue(160, 100, 260); // ratio = 1.60
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Desgaste');
  });

  it('vcMax = 0 → position = 0 (divisão por zero segura)', () => {
    const { position } = computeVcByValue(0, 100, 0);
    expect(position).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// computeFzByValue — unidirectional [0, 1]
//   position = fzEfetivo / fzMax; zone based on fzEfetivo / fzRecomendado ratio
// ---------------------------------------------------------------------------
describe('computeFzByValue', () => {
  it('fzEfetivo=0 → position = 0', () => {
    const { position } = computeFzByValue(0, 0.1, 0.2, 1.0);
    expect(position).toBe(0);
  });

  it('fzEfetivo=fzMax → position = 1.0', () => {
    const { position } = computeFzByValue(0.2, 0.1, 0.2, 1.0);
    expect(position).toBeCloseTo(1.0, 5);
  });

  it('fzEfetivo > fzMax → position clamped to 1.0', () => {
    const { position } = computeFzByValue(0.3, 0.1, 0.2, 1.0);
    expect(position).toBe(1.0);
  });

  it('fzMax = 0 → position = 0 (safe division)', () => {
    const { position } = computeFzByValue(0.1, 0.1, 0, 1.0);
    expect(position).toBe(0);
  });

  it('fzRecomendado = 0 → ratio = 0, zone = vermelho', () => {
    const { zone } = computeFzByValue(0.1, 0, 0.2, 1.0);
    expect(zone).toBe('vermelho');
  });

  it('ratio < 0.50 → zone = vermelho (Atrito)', () => {
    // fzEfetivo=0.04, fzRec=0.1 → ratio = 0.4
    const { zone, zoneLabel } = computeFzByValue(0.04, 0.1, 0.2, 1.0);
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Atrito');
  });

  it('ratio 0.50–0.75 → zone = amarelo (Leve)', () => {
    // fzEfetivo=0.06, fzRec=0.1 → ratio = 0.6
    const { zone, zoneLabel } = computeFzByValue(0.06, 0.1, 0.2, 1.0);
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Leve');
  });

  it('ratio ≈ 0.76 → zone = verde (Ideal, just above lower boundary)', () => {
    // 0.076 / 0.1 = 0.76 → not < 0.75 → falls into verde
    const { zone, zoneLabel } = computeFzByValue(0.076, 0.1, 0.2, 1.0);
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Ideal');
  });

  it('ratio = 1.0 → zone = verde (Ideal, center)', () => {
    const { zone, zoneLabel } = computeFzByValue(0.1, 0.1, 0.2, 1.0);
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Ideal');
  });

  it('ratio = 1.20 → zone = verde (Ideal, upper boundary)', () => {
    const { zone } = computeFzByValue(0.12, 0.1, 0.2, 1.0);
    expect(zone).toBe('verde');
  });

  it('ratio 1.20–1.50 → zone = amarelo (Agressivo)', () => {
    // fzEfetivo=0.13, fzRec=0.1 → ratio = 1.3
    const { zone, zoneLabel } = computeFzByValue(0.13, 0.1, 0.2, 1.0);
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Agressivo');
  });

  it('ratio > 1.50 → zone = vermelho (Vibração)', () => {
    // fzEfetivo=0.16, fzRec=0.1 → ratio = 1.6
    const { zone, zoneLabel } = computeFzByValue(0.16, 0.1, 0.2, 1.0);
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Vibração');
  });

  it('ctf > 1.0 → ctfBadge = "CTF ×1.41"', () => {
    const { ctfBadge } = computeFzByValue(0.1, 0.1, 0.2, 1.41);
    expect(ctfBadge).toBe('CTF ×1.41');
  });

  it('ctf = 1.0 → ctfBadge = null (no CTF active)', () => {
    const { ctfBadge } = computeFzByValue(0.1, 0.1, 0.2, 1.0);
    expect(ctfBadge).toBeNull();
  });

  it('ctf = 0.99 → ctfBadge = null (below threshold)', () => {
    const { ctfBadge } = computeFzByValue(0.1, 0.1, 0.2, 0.99);
    expect(ctfBadge).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// computeAeByValue — unidirectional [0, 1]
//   position = ae / aeMax; zone based on ae / aeRecomendado ratio
// ---------------------------------------------------------------------------
describe('computeAeByValue', () => {
  it('ae=0 → position = 0', () => {
    const { position } = computeAeByValue(0, 3, 6, 6);
    expect(position).toBe(0);
  });

  it('ae=aeMax → position = 1.0', () => {
    const { position } = computeAeByValue(6, 3, 6, 6);
    expect(position).toBeCloseTo(1.0, 5);
  });

  it('ae > aeMax → position clamped to 1.0', () => {
    const { position } = computeAeByValue(7, 3, 6, 6);
    expect(position).toBe(1.0);
  });

  it('aeMax = 0 → position = 0 (safe division)', () => {
    const { position } = computeAeByValue(3, 3, 0, 6);
    expect(position).toBe(0);
  });

  it('ratio < 0.50 → zone = amarelo (CTF Alto)', () => {
    // ae=1, aeRec=3 → ratio = 0.33
    const { zone, zoneLabel } = computeAeByValue(1, 3, 6, 6);
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('CTF Alto');
  });

  it('ratio = 0.50 → zone = verde (Ideal, boundary)', () => {
    // ae=1.5, aeRec=3 → ratio = 0.50
    const { zone, zoneLabel } = computeAeByValue(1.5, 3, 6, 6);
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Ideal');
  });

  it('ratio = 1.0 → zone = verde (Ideal, center)', () => {
    const { zone, zoneLabel } = computeAeByValue(3, 3, 6, 6);
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Ideal');
  });

  it('ratio = 1.20 → zone = verde (Ideal, upper boundary)', () => {
    // ae=3.6, aeRec=3 → ratio = 1.20
    const { zone } = computeAeByValue(3.6, 3, 6, 6);
    expect(zone).toBe('verde');
  });

  it('ratio 1.20–1.50 → zone = amarelo (Pesado)', () => {
    // ae=4, aeRec=3 → ratio ≈ 1.33
    const { zone, zoneLabel } = computeAeByValue(4, 3, 6, 6);
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Pesado');
  });

  it('ratio > 1.50 → zone = vermelho (Excessivo)', () => {
    // ae=5, aeRec=3 → ratio ≈ 1.67
    const { zone, zoneLabel } = computeAeByValue(5, 3, 6, 6);
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Excessivo');
  });

  it('displays ae/D ratio correctly — ae=3, D=6 → "50% D"', () => {
    const { aeDRatioDisplay } = computeAeByValue(3, 3, 6, 6);
    expect(aeDRatioDisplay).toBe('50% D');
  });

  it('displays ae/D ratio correctly — ae=1.2, D=6 → "20% D"', () => {
    const { aeDRatioDisplay } = computeAeByValue(1.2, 3, 6, 6);
    expect(aeDRatioDisplay).toBe('20% D');
  });

  it('diametro = 0 → aeDRatio display = "0% D" (safe)', () => {
    const { aeDRatioDisplay } = computeAeByValue(3, 3, 6, 0);
    expect(aeDRatioDisplay).toBe('0% D');
  });
});

// ---------------------------------------------------------------------------
// computeApByValue — unidirectional [0, 1], L/D safety
//   position = ap / apMax; zone based on ap / apRecomendado ratio
//   L/D > 6 → forced vermelho/BLOQUEADO
// ---------------------------------------------------------------------------
describe('computeApByValue', () => {
  it('ap=0 → position = 0', () => {
    const { position } = computeApByValue(0, 1, 3, 6, 18);
    expect(position).toBe(0);
  });

  it('ap=apMax → position = 1.0', () => {
    const { position } = computeApByValue(3, 1, 3, 6, 18);
    expect(position).toBeCloseTo(1.0, 5);
  });

  it('ap > apMax → position clamped to 1.0', () => {
    const { position } = computeApByValue(5, 1, 3, 6, 18);
    expect(position).toBe(1.0);
  });

  it('apMax = 0 → position = 0 (safe division)', () => {
    const { position } = computeApByValue(1, 1, 0, 6, 18);
    expect(position).toBe(0);
  });

  it('ratio < 0.50 → zone = amarelo (Leve)', () => {
    // ap=0.4, apRec=1 → ratio = 0.4
    const { zone, zoneLabel } = computeApByValue(0.4, 1, 3, 6, 18);
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Leve');
  });

  it('ratio = 0.50 → zone = verde (Padrão, boundary)', () => {
    const { zone, zoneLabel } = computeApByValue(0.5, 1, 3, 6, 18);
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Padrão');
  });

  it('ratio = 1.0 → zone = verde (Padrão, center)', () => {
    const { zone, zoneLabel } = computeApByValue(1, 1, 3, 6, 18);
    expect(zone).toBe('verde');
    expect(zoneLabel).toBe('Padrão');
  });

  it('ratio = 1.20 → zone = verde (Padrão, upper boundary)', () => {
    const { zone } = computeApByValue(1.2, 1, 3, 6, 18);
    expect(zone).toBe('verde');
  });

  it('ratio 1.20–1.50 → zone = amarelo (Agressivo)', () => {
    // ap=1.3, apRec=1 → ratio = 1.3
    const { zone, zoneLabel } = computeApByValue(1.3, 1, 3, 6, 18);
    expect(zone).toBe('amarelo');
    expect(zoneLabel).toBe('Agressivo');
  });

  it('ratio > 1.50 → zone = vermelho (Deflexão)', () => {
    // ap=2, apRec=1 → ratio = 2.0
    const { zone, zoneLabel } = computeApByValue(2, 1, 3, 6, 18);
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('Deflexão');
  });

  it('L/D > 6 → zone = vermelho (BLOQUEADO), overrides ratio', () => {
    // balanco=42, D=6 → L/D = 7.0; even with good ratio, should be BLOQUEADO
    const { zone, zoneLabel } = computeApByValue(1, 1, 3, 6, 42);
    expect(zone).toBe('vermelho');
    expect(zoneLabel).toBe('BLOQUEADO');
  });

  it('L/D = 6 (exact) → NOT bloqueado (only > 6 triggers block)', () => {
    // balanco=36, D=6 → L/D = 6.0
    const { zoneLabel } = computeApByValue(1, 1, 3, 6, 36);
    expect(zoneLabel).not.toBe('BLOQUEADO');
  });

  it('L/D ≤ 3 → ldColorClass = text-seg-verde', () => {
    const { ldColorClass } = computeApByValue(1, 1, 3, 6, 18); // L/D = 3
    expect(ldColorClass).toBe('text-seg-verde');
  });

  it('3 < L/D < 4 → ldColorClass = text-seg-amarelo', () => {
    const { ldColorClass } = computeApByValue(1, 1, 3, 6, 21); // L/D = 3.5
    expect(ldColorClass).toBe('text-seg-amarelo');
  });

  it('L/D ≥ 4 → ldColorClass = text-seg-vermelho', () => {
    const { ldColorClass } = computeApByValue(1, 1, 3, 6, 30); // L/D = 5
    expect(ldColorClass).toBe('text-seg-vermelho');
  });

  it('ldDisplay shows formatted L/D ratio', () => {
    const { ldDisplay } = computeApByValue(1, 1, 3, 6, 18); // L/D = 3.0
    expect(ldDisplay).toBe('L/D: 3.0');
  });

  it('diametro = 0 → ldRatio = 0, ldDisplay safe', () => {
    // diametro=0 → ldRatio = 0; but apMax=3 still valid → position = ap/apMax = 1/3
    const { ldDisplay } = computeApByValue(1, 1, 3, 0, 18);
    expect(ldDisplay).toBe('L/D: 0.0');
  });

  it('apMax = 0 AND diametro = 0 → position = 0 (fully safe)', () => {
    const { position } = computeApByValue(1, 1, 0, 0, 18);
    expect(position).toBe(0);
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

  it('vc bar is always active even when resultado = null', () => {
    render(<ParameterHealthBar paramKey="vc" />);
    expect(screen.queryByTestId('health-bar-vc-inactive')).not.toBeInTheDocument();
    expect(screen.getByTestId('health-bar-vc-fill')).toBeInTheDocument();
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

  it('vc bar shows recommended tick mark', () => {
    render(<ParameterHealthBar paramKey="vc" />);
    expect(screen.getByTestId('health-bar-vc-rec-tick')).toBeInTheDocument();
  });

  it('ae bar shows recommended tick mark', () => {
    render(<ParameterHealthBar paramKey="ae" />);
    expect(screen.getByTestId('health-bar-ae-rec-tick')).toBeInTheDocument();
  });

  it('ap bar shows recommended tick mark', () => {
    render(<ParameterHealthBar paramKey="ap" />);
    expect(screen.getByTestId('health-bar-ap-rec-tick')).toBeInTheDocument();
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
