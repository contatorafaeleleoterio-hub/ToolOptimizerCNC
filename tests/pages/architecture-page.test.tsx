import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ArchitecturePage from '@/pages/architecture-page';

function renderPage() {
  return render(
    <BrowserRouter>
      <ArchitecturePage />
    </BrowserRouter>,
  );
}

describe('ArchitecturePage', () => {
  beforeEach(() => {
    window.innerWidth = 1440;
    window.dispatchEvent(new Event('resize'));
  });

  it('renders header and level buttons', () => {
    renderPage();
    expect(screen.getByText('Arquitetura do Sistema')).toBeInTheDocument();
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Visao Geral')).toBeInTheDocument();
    expect(screen.getByText('Modulos')).toBeInTheDocument();
    expect(screen.getByText('Fluxo de Dados')).toBeInTheDocument();
  });

  it('expands a group and shows its files', () => {
    renderPage();
    fireEvent.click(screen.getByText('Components'));
    expect(screen.getByText('config-panel.tsx')).toBeInTheDocument();
    expect(screen.getAllByText('32 arquivos').length).toBeGreaterThanOrEqual(1);
  });

  it('opens and closes the data flow overlay', () => {
    renderPage();
    fireEvent.click(screen.getByText('Fluxo de Dados'));
    expect(screen.getByText('Fluxo de Dados do calcular()')).toBeInTheDocument();
    expect(screen.getByText('calculateRPM()')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fechar fluxo de dados' }));
    expect(screen.queryByText('Fluxo de Dados do calcular()')).not.toBeInTheDocument();
  });
});
