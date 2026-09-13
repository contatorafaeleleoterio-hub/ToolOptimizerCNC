import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  fmt,
  MetricCell,
  SafetyBadge,
  ProgressCard,
  WarningsSection,
  BigNumber,
} from '@/components/shared-result-parts';

describe('fmt', () => {
  it('formats 10000 as 10.000 (pt-BR locale)', () => {
    expect(fmt(10000)).toBe('10.000');
  });

  it('formats 1273 as 1.273', () => {
    expect(fmt(1273)).toBe('1.273');
  });

  it('rounds to nearest integer', () => {
    expect(fmt(3183.1)).toBe('3.183');
  });

  it('formats 100 as 100', () => {
    expect(fmt(100)).toBe('100');
  });
});

describe('MetricCell', () => {
  it('renders label, value and unit', () => {
    render(<MetricCell label="Rotação" value="3.183" unit="RPM" unitColor="text-primary" />);
    expect(screen.getByText('Rotação')).toBeInTheDocument();
    expect(screen.getByText('3.183')).toBeInTheDocument();
    expect(screen.getByText('RPM')).toBeInTheDocument();
  });

  it('applies unitColor class to unit span', () => {
    const { container } = render(
      <MetricCell label="Avanço" value="1.273" unit="mm/min" unitColor="text-secondary" />,
    );
    const unitSpan = container.querySelector('span.text-secondary');
    expect(unitSpan).toBeInTheDocument();
    expect(unitSpan?.textContent).toBe('mm/min');
  });
});

describe('SafetyBadge', () => {
  it('shows SEGURO for verde', () => {
    render(<SafetyBadge nivel="verde" avisosCount={0} />);
    expect(screen.getByText('SEGURO')).toBeInTheDocument();
  });

  it('shows ALERTA for amarelo', () => {
    render(<SafetyBadge nivel="amarelo" avisosCount={1} />);
    expect(screen.getByText('ALERTA')).toBeInTheDocument();
  });

  it('shows CRÍTICO for vermelho', () => {
    render(<SafetyBadge nivel="vermelho" avisosCount={2} />);
    expect(screen.getByText('CRÍTICO')).toBeInTheDocument();
  });

  it('shows BLOQUEADO for bloqueado', () => {
    render(<SafetyBadge nivel="bloqueado" avisosCount={1} />);
    expect(screen.getByText('BLOQUEADO')).toBeInTheDocument();
  });

  it('shows avisos count when > 0', () => {
    render(<SafetyBadge nivel="amarelo" avisosCount={2} />);
    expect(screen.getByText('(2 avisos)')).toBeInTheDocument();
  });

  it('shows singular aviso when count is 1', () => {
    render(<SafetyBadge nivel="vermelho" avisosCount={1} />);
    expect(screen.getByText('(1 aviso)')).toBeInTheDocument();
  });

  it('hides avisos count when 0', () => {
    render(<SafetyBadge nivel="verde" avisosCount={0} />);
    expect(screen.queryByText(/aviso/)).not.toBeInTheDocument();
  });
});

describe('WarningsSection', () => {
  it('renders list of warnings', () => {
    render(<WarningsSection avisos={['RPM acima do limite', 'Vibração elevada']} />);
    expect(screen.getByText('RPM acima do limite')).toBeInTheDocument();
    expect(screen.getByText('Vibração elevada')).toBeInTheDocument();
  });

  it('returns null for empty avisos', () => {
    const { container } = render(<WarningsSection avisos={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Avisos heading', () => {
    render(<WarningsSection avisos={['Teste']} />);
    expect(screen.getByText('Avisos')).toBeInTheDocument();
  });
});

describe('ProgressCard', () => {
  it('renders label, value and unit', () => {
    render(
      <ProgressCard label="Potência Est." value="1.23" unit="kW"
        pct={50} barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" />,
    );
    expect(screen.getByText('Potência Est.')).toBeInTheDocument();
    expect(screen.getByText('1.23')).toBeInTheDocument();
    expect(screen.getByText('kW')).toBeInTheDocument();
  });
});

describe('BigNumber', () => {
  it('renders label, value and unit', () => {
    render(
      <BigNumber label="Rotação (RPM)" value="3.183" unit="RPM"
        pct={80} color="primary" glow="rgba(0,217,255,0.4)"
        barGlow="rgba(0,217,255,1)" icon="speed" />,
    );
    expect(screen.getByText('Rotação (RPM)')).toBeInTheDocument();
    expect(screen.getByText('3.183')).toBeInTheDocument();
    expect(screen.getByText('RPM')).toBeInTheDocument();
  });
});
