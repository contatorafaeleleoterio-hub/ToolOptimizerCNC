import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { BugReportButton } from '@/components/bug-report-button';
import { useMachiningStore } from '@/store';

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('BugReportButton — desktop variant', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders button with label text', () => {
    renderWithRouter(<BugReportButton />);
    expect(screen.getByText('Reportar Bug')).toBeInTheDocument();
  });

  it('does not show modal initially', () => {
    renderWithRouter(<BugReportButton />);
    expect(screen.queryByText('Descreva o problema encontrado')).not.toBeInTheDocument();
  });

  it('opens modal on click', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.getByText('Descreva o problema encontrado')).toBeInTheDocument();
  });

  it('modal contains description textarea', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('modal contains include-state checkbox', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('modal contains send and cancel buttons', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Enviar por E-mail')).toBeInTheDocument();
  });

  it('closes modal when cancel is clicked', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    fireEvent.click(screen.getByText('Cancelar'));
    expect(screen.queryByText('Descreva o problema encontrado')).not.toBeInTheDocument();
  });

  it('closes modal when close icon button is clicked', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    fireEvent.click(screen.getByRole('button', { name: /fechar/i }));
    expect(screen.queryByText('Descreva o problema encontrado')).not.toBeInTheDocument();
  });

  it('closes modal when overlay is clicked', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    const overlay = screen.getByText('Descreva o problema encontrado').closest('.fixed');
    if (overlay) fireEvent.click(overlay);
    expect(screen.queryByText('Descreva o problema encontrado')).not.toBeInTheDocument();
  });

  it('checkbox is checked by default', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('shows "sem simulação ativa" when no result', () => {
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.getByText(/sem simulação ativa/i)).toBeInTheDocument();
  });

  it('does not show "sem simulação ativa" when result exists', () => {
    useMachiningStore.getState().calcular();
    renderWithRouter(<BugReportButton />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.queryByText(/sem simulação ativa/i)).not.toBeInTheDocument();
  });
});

describe('BugReportButton — mobile variant', () => {
  beforeEach(() => { useMachiningStore.getState().reset(); });

  it('renders icon-only button without label text', () => {
    renderWithRouter(<BugReportButton variant="mobile" />);
    expect(screen.queryByText('Reportar Bug')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reportar bug/i })).toBeInTheDocument();
  });

  it('opens modal on click', () => {
    renderWithRouter(<BugReportButton variant="mobile" />);
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    expect(screen.getByText('Descreva o problema encontrado')).toBeInTheDocument();
  });
});
