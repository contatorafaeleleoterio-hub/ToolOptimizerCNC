import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MobileHeader } from '@/components/mobile/mobile-header';

function renderHeader(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<MobileHeader />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('MobileHeader', () => {
  it('renders the logo', () => {
    renderHeader();
    expect(screen.getByAltText('ToolOptimizer CNC')).toBeInTheDocument();
  });

  it('renders bug report, history and settings controls with accessible labels', () => {
    renderHeader();
    expect(screen.getByLabelText('Reportar bug')).toBeInTheDocument();
    expect(screen.getByLabelText('Histórico de simulações')).toBeInTheDocument();
    expect(screen.getByLabelText('Configurações')).toBeInTheDocument();
  });

  it('navigates to /history when the history button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MobileHeader />} />
          <Route path="/history" element={<div>Histórico page</div>} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByLabelText('Histórico de simulações'));
    expect(screen.getByText('Histórico page')).toBeInTheDocument();
  });

  it('navigates to /settings when the settings button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MobileHeader />} />
          <Route path="/settings" element={<div>Settings page</div>} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByLabelText('Configurações'));
    expect(screen.getByText('Settings page')).toBeInTheDocument();
  });
});
