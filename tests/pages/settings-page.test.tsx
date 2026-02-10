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

  it('renders page title and back button', () => {
    renderPage();
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('← Voltar')).toBeInTheDocument();
  });

  it('renders machine limit inputs with default values', () => {
    renderPage();
    expect(screen.getByText('RPM Máximo')).toBeInTheDocument();
    expect(screen.getByText('Potência Máxima (kW)')).toBeInTheDocument();
    expect(screen.getByText('Torque Máximo (Nm)')).toBeInTheDocument();
    expect(screen.getByText('Avanço Máximo (mm/min)')).toBeInTheDocument();
  });

  it('updates store when RPM limit changes', () => {
    renderPage();
    const inputs = screen.getAllByRole('spinbutton');
    const rpmInput = inputs[0];
    fireEvent.change(rpmInput, { target: { value: '8000' } });
    expect(useMachiningStore.getState().limitesMaquina.maxRPM).toBe(8000);
  });
});
