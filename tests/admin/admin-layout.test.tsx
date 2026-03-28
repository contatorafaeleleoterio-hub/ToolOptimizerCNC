import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AdminLayout } from '@/admin/layout/admin-layout';

function renderLayout() {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <AdminLayout />
    </MemoryRouter>
  );
}

describe('AdminLayout', () => {
  it('renders sidebar and header', () => {
    renderLayout();
    expect(screen.getByText('Central de Gestão')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders all 9 sidebar nav items', () => {
    renderLayout();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Inbox de Bugs')).toBeInTheDocument();
    expect(screen.getByText('Erros')).toBeInTheDocument();
    expect(screen.getByText('Uso')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Feature Flags')).toBeInTheDocument();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
    expect(screen.getByText('Saúde')).toBeInTheDocument();
  });

  it('renders "Voltar ao App" link', () => {
    renderLayout();
    expect(screen.getByText('Voltar ao App')).toBeInTheDocument();
  });

  it('uses scrollable main area for long admin pages', () => {
    const { container } = renderLayout();
    const layoutRoot = container.firstElementChild as HTMLElement | null;
    const main = container.querySelector('main');

    expect(layoutRoot?.className).toContain('h-screen');
    expect(layoutRoot?.className).toContain('overflow-hidden');
    expect(main?.className).toContain('overflow-y-auto');
    expect(main?.className).toContain('min-h-0');
  });
});

describe('AdminDashboardPage — renders via KpiCards', () => {
  it('renders dashboard title and KPI cards', async () => {
    const { default: AdminDashboardPage } = await import('@/admin/pages/admin-dashboard-page');
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AdminDashboardPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tarefas Abertas')).toBeInTheDocument();
    expect(screen.getByText('Bugs Novos')).toBeInTheDocument();
    expect(screen.getByText('Erros (24h)')).toBeInTheDocument();
    expect(screen.getByText('Simulações Hoje')).toBeInTheDocument();
  });
});
