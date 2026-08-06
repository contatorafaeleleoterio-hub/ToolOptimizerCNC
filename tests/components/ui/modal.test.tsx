import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from '@/components/ui/modal';

describe('Modal', () => {
  it('renders children inside a dialog with aria-modal', () => {
    render(
      <Modal onClose={vi.fn()} ariaLabel="Teste">
        <p>Conteúdo do modal</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Teste' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose} ariaLabel="Teste" overlayTestId="modal-overlay">
        <p>Conteúdo</p>
      </Modal>,
    );
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when panel content is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose} ariaLabel="Teste">
        <button>Ação interna</button>
      </Modal>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Ação interna' }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose} ariaLabel="Teste">
        <p>Conteúdo</p>
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('tab focus trap does not throw when there are no focusable elements', () => {
    render(
      <Modal onClose={vi.fn()} ariaLabel="Teste">
        <p>Sem botões nem inputs</p>
      </Modal>,
    );
    expect(() => fireEvent.keyDown(document, { key: 'Tab' })).not.toThrow();
  });

  it('wraps focus from last to first focusable element on Tab', () => {
    render(
      <Modal onClose={vi.fn()} ariaLabel="Teste">
        <button>Primeiro</button>
        <button>Último</button>
      </Modal>,
    );
    const last = screen.getByRole('button', { name: 'Último' });
    const first = screen.getByRole('button', { name: 'Primeiro' });
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
  });

  it('wraps focus from first to last focusable element on Shift+Tab', () => {
    render(
      <Modal onClose={vi.fn()} ariaLabel="Teste">
        <button>Primeiro</button>
        <button>Último</button>
      </Modal>,
    );
    const first = screen.getByRole('button', { name: 'Primeiro' });
    const last = screen.getByRole('button', { name: 'Último' });
    first.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });
});
