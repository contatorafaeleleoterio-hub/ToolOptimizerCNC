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
    expect(screen.getByText('Potência Máxima (kW)')).toBeInTheDocument();
    expect(screen.getByText('Torque Máximo (Nm)')).toBeInTheDocument();
    expect(screen.getByText('Avanço Máximo (mm/min)')).toBeInTheDocument();
    expect(screen.getByText('Eficiência (η)')).toBeInTheDocument();
  });

  it('navigates to Segurança section when sidebar is clicked', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const segurancaBtn = navButtons.find((b) => b.textContent?.includes('Segurança'));
    expect(segurancaBtn).toBeDefined();
    fireEvent.click(segurancaBtn!);
    expect(screen.getByText('Fator de Segurança')).toBeInTheDocument();
    expect(screen.getByText('Limites L/D (Balanço / Diâmetro)')).toBeInTheDocument();
  });

  it('navigates to Materiais section', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const materiaisBtn = navButtons.find((b) => b.textContent?.includes('Materiais'));
    fireEvent.click(materiaisBtn!);
    expect(screen.getByText('Materiais Base (somente leitura)')).toBeInTheDocument();
    expect(screen.getByText('Materiais Personalizados')).toBeInTheDocument();
  });

  it('navigates to Ferramentas section', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const ferrBtn = navButtons.find((b) => b.textContent?.includes('Ferramentas'));
    fireEvent.click(ferrBtn!);
    expect(screen.getByText('Diâmetros Padrão (mm)')).toBeInTheDocument();
    expect(screen.getByText('Raios de Ponta (mm)')).toBeInTheDocument();
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

  it('updates machine name in preferences', () => {
    renderPage();
    const nameInput = screen.getByPlaceholderText(/Haas/);
    fireEvent.change(nameInput, { target: { value: 'Romi D800' } });
    expect(useMachiningStore.getState().preferences.machineName).toBe('Romi D800');
  });

  it('changes safety factor via slider', () => {
    renderPage();
    const navButtons = screen.getAllByRole('button');
    const segBtn = navButtons.find((b) => b.textContent?.includes('Segurança'));
    fireEvent.click(segBtn!);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.70' } });
    expect(useMachiningStore.getState().safetyFactor).toBe(0.70);
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
