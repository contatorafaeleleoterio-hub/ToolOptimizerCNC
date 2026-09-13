import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { SettingsPage } from '@/pages/settings-page';
import { useMachiningStore } from '@/store';

function renderPage() {
  return render(<BrowserRouter><SettingsPage /></BrowserRouter>);
}

describe('SettingsPage', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders header with back button and title', () => {
    renderPage();
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });

  it('renders all 6 sidebar navigation items', () => {
    renderPage();
    // Sidebar items share text with section headers, so use getAllByText
    expect(screen.getAllByText('Máquina').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Segurança').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Materiais').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Ferramentas').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Exibição').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Dados').length).toBeGreaterThanOrEqual(1);
  });

  it('shows Máquina section by default with limit inputs', () => {
    renderPage();
    expect(screen.getByText('RPM Máximo')).toBeInTheDocument();
    expect(screen.getByText('Avanço Máximo (mm/min)')).toBeInTheDocument();
    // Simplified: maxPotencia, maxTorque, eficiencia hidden (use factory defaults)
    expect(screen.queryByText('Potência Máxima (kW)')).not.toBeInTheDocument();
    expect(screen.queryByText('Torque Máximo (Nm)')).not.toBeInTheDocument();
    expect(screen.queryByText('Eficiência (η)')).not.toBeInTheDocument();
  });

  it('navigates to Segurança section when sidebar is clicked', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const segurancaBtn = navButtons.find((b) => b.textContent?.includes('Segurança'));
    expect(segurancaBtn).toBeDefined();
    fireEvent.click(segurancaBtn!);
    expect(screen.getByText('Fator de Correção')).toBeInTheDocument();
    expect(screen.getByText('Limites L/D (Balanço / Diâmetro)')).toBeInTheDocument();
  });

  it('navigates to Materiais section', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const materiaisBtn = navButtons.find((b) => b.textContent?.includes('Materiais'));
    fireEvent.click(materiaisBtn!);
    expect(screen.getByText('Todos os Materiais')).toBeInTheDocument();
    expect(screen.getByText('Aço 1020')).toBeInTheDocument();
  });

  it('navigates to Ferramentas section', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const ferrBtn = navButtons.find((b) => b.textContent?.includes('Ferramentas'));
    fireEvent.click(ferrBtn!);
    // v0.9.4: Diâmetros/Raios/Kc removed — shows Ferramentas Salvas instead
    expect(screen.getByText('Ferramentas Salvas')).toBeInTheDocument();
    expect(screen.queryByText('Diâmetros Padrão (mm)')).not.toBeInTheDocument();
    expect(screen.queryByText('Raios de Ponta (mm)')).not.toBeInTheDocument();
  });

  it('navigates to Exibição section', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const exibBtn = navButtons.find((b) => b.textContent?.includes('Exibição'));
    fireEvent.click(exibBtn!);
    expect(screen.getByText('Precisão Decimal')).toBeInTheDocument();
  });

  it('navigates to Dados section', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const dadosBtn = navButtons.find((b) => b.textContent?.includes('Dados'));
    fireEvent.click(dadosBtn!);
    expect(screen.getByText('Exportar Configurações (JSON)')).toBeInTheDocument();
    expect(screen.getByText('Importar Configurações (JSON)')).toBeInTheDocument();
    expect(screen.getByText('Restaurar Padrões de Fábrica')).toBeInTheDocument();
  });

  it('updates store when RPM limit changes', () => {
    renderPage();
    const inputs = screen.getAllByRole('spinbutton');
    const rpmInput = inputs[0];
    fireEvent.change(rpmInput, { target: { value: '8000' } });
    expect(useMachiningStore.getState().limitesMaquina.maxRPM).toBe(8000);
  });

  it('machine name input is not shown (simplified settings)', () => {
    renderPage();
    // machineName field removed from UI in Phase 14 simplification
    expect(screen.queryByPlaceholderText(/Haas/)).not.toBeInTheDocument();
  });

  it('changes safety factor via − button (styled slider)', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const segBtn = navButtons.find((b) => b.textContent?.includes('Segurança'));
    fireEvent.click(segBtn!);
    // Default safetyFactor is 0.80 — click − twice to reach 0.70
    const minusBtn = screen.getByRole('button', { name: /Decrease Fator de Corre/i });
    fireEvent.click(minusBtn);
    fireEvent.click(minusBtn);
    expect(useMachiningStore.getState().safetyFactor).toBeCloseTo(0.70, 2);
  });

  it('changes decimal precision in Exibição section', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const exibBtn = navButtons.find((b) => b.textContent?.includes('Exibição'));
    fireEvent.click(exibBtn!);
    const btn3 = screen.getByText('1.234');
    fireEvent.click(btn3);
    expect(useMachiningStore.getState().preferences.decimals).toBe(3);
  });

  it('factory reset confirmation requires double click', () => {
    renderPage();
    // Navigate to Dados
    const navButtons = screen.getAllByRole('button');
    const dadosBtn = navButtons.find((b) => b.textContent?.includes('Dados'));
    fireEvent.click(dadosBtn!);
    // First click shows confirmation
    const resetBtn = screen.getByText('Restaurar Padrões de Fábrica');
    fireEvent.click(resetBtn);
    expect(screen.getByText('Clique novamente para confirmar o reset')).toBeInTheDocument();
  });
});
