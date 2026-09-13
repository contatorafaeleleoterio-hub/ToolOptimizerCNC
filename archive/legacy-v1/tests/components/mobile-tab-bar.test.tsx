import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MobileTabBar } from '@/components/mobile/mobile-tab-bar';

describe('MobileTabBar', () => {
  it('renders 3 tabs (Configurar, Resultados, Ajustar)', () => {
    render(<MobileTabBar active="config" onChange={() => {}} />);
    expect(screen.getByText('Configurar')).toBeInTheDocument();
    expect(screen.getByText('Resultados')).toBeInTheDocument();
    expect(screen.getByText('Ajustar')).toBeInTheDocument();
  });

  it('exposes tablist/tab roles for accessibility', () => {
    render(<MobileTabBar active="config" onChange={() => {}} />);
    expect(screen.getByRole('tablist', { name: 'Navegação principal' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks the active tab via aria-selected', () => {
    render(<MobileTabBar active="results" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /Resultados/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /Configurar/i })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the clicked tab id', () => {
    const onChange = vi.fn();
    render(<MobileTabBar active="config" onChange={onChange} />);
    screen.getByRole('tab', { name: /Ajustar/i }).click();
    expect(onChange).toHaveBeenCalledWith('adjust');
  });

  it('shows the new-result badge on Resultados only when hasNewResult is true and it is not the active tab', () => {
    const { rerender } = render(<MobileTabBar active="config" onChange={() => {}} hasNewResult />);
    const resultsTab = screen.getByRole('tab', { name: /Resultados/i });
    expect(resultsTab.querySelector('.animate-pulse')).toBeInTheDocument();

    rerender(<MobileTabBar active="results" onChange={() => {}} hasNewResult />);
    expect(screen.getByRole('tab', { name: /Resultados/i }).querySelector('.animate-pulse')).not.toBeInTheDocument();
  });

  it('hides the badge by default (hasNewResult omitted)', () => {
    render(<MobileTabBar active="config" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /Resultados/i }).querySelector('.animate-pulse')).not.toBeInTheDocument();
  });
});
