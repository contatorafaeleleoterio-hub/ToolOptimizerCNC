import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { useMachiningStore } from '@/store';

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders the header nav', () => {
    renderApp();
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument();
    expect(screen.getByText('Calcular')).toBeInTheDocument();
  });

  it('renders the flow step with Material/Ferramenta/Simular', () => {
    renderApp();
    const flowStep = within(screen.getByTestId('flow-step'));
    expect(flowStep.getByText('Material')).toBeInTheDocument();
    expect(flowStep.getByText('Ferramenta')).toBeInTheDocument();
    expect(flowStep.getByText('Simular')).toBeInTheDocument();
  });

  it('flow step shows Simular as pending before any calculation', () => {
    renderApp();
    const flowStep = within(screen.getByTestId('flow-step'));
    expect(flowStep.getByText('3')).toBeInTheDocument();
  });

  it('flow step shows Simular as done after calcular()', () => {
    const s = useMachiningStore.getState();
    s.setFerramenta({ diametro: 10, balanco: 20 });
    s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    s.calcular();
    renderApp();
    const flowStep = within(screen.getByTestId('flow-step'));
    expect(flowStep.queryByText('3')).not.toBeInTheDocument();
  });
});
