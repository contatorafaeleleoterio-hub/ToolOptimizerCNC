import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToolEditModal } from '@/components/modals/tool-edit-modal';
import type { SavedTool } from '@/types';

const BASE_TOOL: SavedTool = {
  id: 'test-id-1',
  nome: 'Topo Ø10 - H20 - A4',
  tipo: 'topo',
  diametro: 10,
  numeroArestas: 4,
  balanco: 20,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const TOROIDAL_TOOL: SavedTool = {
  id: 'test-id-2',
  nome: 'Toroidal Ø12 - R1 - H25 - A4',
  tipo: 'toroidal',
  diametro: 12,
  raioQuina: 1,
  anguloHelice: 45,
  numeroArestas: 4,
  balanco: 25,
  createdAt: '2026-01-01T00:00:00.000Z',
};

function renderModal(tool: SavedTool = BASE_TOOL, onSave = vi.fn(), onClose = vi.fn()) {
  render(<ToolEditModal tool={tool} onSave={onSave} onClose={onClose} />);
  return { onSave, onClose };
}

describe('ToolEditModal', () => {
  it('renders with pre-filled data from tool prop', () => {
    renderModal();
    expect(screen.getByRole('heading', { name: /editar ferramenta/i })).toBeInTheDocument();
    // diametro field pre-filled
    const diametroInput = screen.getByLabelText(/diâmetro/i);
    expect((diametroInput as HTMLInputElement).value).toBe('10');
    // balanco field pre-filled
    const balancoInput = screen.getByLabelText(/fixação/i);
    expect((balancoInput as HTMLInputElement).value).toBe('20');
    // tipo button active
    expect(screen.getByRole('button', { name: /topo/i })).toBeInTheDocument();
  });

  it('shows raio field only when tipo is toroidal', () => {
    renderModal(TOROIDAL_TOOL);
    expect(screen.getByLabelText(/raio de quina/i)).toBeInTheDocument();
  });

  it('does not show raio field when tipo is topo', () => {
    renderModal(BASE_TOOL);
    expect(screen.queryByLabelText(/raio de quina/i)).not.toBeInTheDocument();
  });

  it('hides raio field when tipo changes from toroidal to topo', () => {
    renderModal(TOROIDAL_TOOL);
    expect(screen.getByLabelText(/raio de quina/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /topo/i }));
    expect(screen.queryByLabelText(/raio de quina/i)).not.toBeInTheDocument();
  });

  it('disables save button when diametro is 0', () => {
    renderModal();
    const diametroInput = screen.getByLabelText(/diâmetro/i);
    fireEvent.change(diametroInput, { target: { value: '0' } });
    const saveBtn = screen.getByRole('button', { name: /salvar/i });
    expect(saveBtn).toBeDisabled();
  });

  it('closes without changes when cancel is clicked', () => {
    const { onSave, onClose } = renderModal();
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('closes without changes when overlay is clicked', () => {
    const { onSave, onClose } = renderModal();
    const overlay = screen.getByTestId('tool-edit-modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onSave with updated data when save is clicked', () => {
    const { onSave } = renderModal();
    // Change arestas to 3
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    // Change helice to 30°
    fireEvent.click(screen.getByRole('button', { name: /30°/i }));
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    expect(onSave).toHaveBeenCalledOnce();
    const updates = onSave.mock.calls[0][0];
    expect(updates.numeroArestas).toBe(3);
    expect(updates.anguloHelice).toBe(30);
    expect(updates.tipo).toBe('topo');
    expect(updates.raioQuina).toBeUndefined();
  });

  it('clears raioQuina when tipo changes from toroidal to topo', () => {
    const { onSave } = renderModal(TOROIDAL_TOOL);
    fireEvent.click(screen.getByRole('button', { name: /topo/i }));
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    expect(onSave).toHaveBeenCalledOnce();
    expect(onSave.mock.calls[0][0].raioQuina).toBeUndefined();
  });
});
