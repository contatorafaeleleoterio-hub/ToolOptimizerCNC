import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SectionTitle, FieldGroup, NumInput } from '@/components/ui-helpers';

describe('SectionTitle', () => {
  it('renders label text', () => {
    render(<SectionTitle color="bg-primary" label="Configuração Base" />);
    expect(screen.getByText('Configuração Base')).toBeInTheDocument();
  });

  it('renders color span with provided class', () => {
    const { container } = render(<SectionTitle color="bg-secondary" label="Test" />);
    const span = container.querySelector('span.bg-secondary');
    expect(span).toBeInTheDocument();
  });

  it('renders as h3 heading', () => {
    render(<SectionTitle color="bg-primary" label="Heading" />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});

describe('FieldGroup', () => {
  it('renders label text', () => {
    render(<FieldGroup label="Material da Peça"><span>child</span></FieldGroup>);
    expect(screen.getByText('Material da Peça')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<FieldGroup label="Test"><span data-testid="child">inner</span></FieldGroup>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('NumInput', () => {
  it('renders input with current value', () => {
    render(<NumInput label="ap (mm)" value={2.5} onChange={vi.fn()} min={0.1} max={50} step={0.1} />);
    const input = screen.getByLabelText('ap (mm)') as HTMLInputElement;
    expect(input.value).toBe('2.5');
  });

  it('renders label text', () => {
    render(<NumInput label="ae (mm)" value={5} onChange={vi.fn()} min={0.1} max={50} step={0.1} />);
    expect(screen.getByText('ae (mm)')).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const onChange = vi.fn();
    render(<NumInput label="Vc (m/min)" value={100} onChange={onChange} min={1} max={1200} step={1} />);
    fireEvent.change(screen.getByLabelText('Vc (m/min)'), { target: { value: '150' } });
    expect(onChange).toHaveBeenCalledWith(150);
  });

  it('increment button calls onChange with value + step', () => {
    const onChange = vi.fn();
    render(<NumInput label="ap (mm)" value={2} onChange={onChange} min={0.1} max={50} step={0.1} />);
    fireEvent.click(screen.getByLabelText('Increase ap (mm)'));
    expect(onChange).toHaveBeenCalledWith(expect.closeTo(2.1, 1));
  });

  it('decrement button calls onChange with value - step', () => {
    const onChange = vi.fn();
    render(<NumInput label="ap (mm)" value={2} onChange={onChange} min={0.1} max={50} step={0.1} />);
    fireEvent.click(screen.getByLabelText('Decrease ap (mm)'));
    expect(onChange).toHaveBeenCalledWith(expect.closeTo(1.9, 1));
  });

  it('increment does not exceed max', () => {
    const onChange = vi.fn();
    render(<NumInput label="ap (mm)" value={50} onChange={onChange} min={0.1} max={50} step={0.1} />);
    fireEvent.click(screen.getByLabelText('Increase ap (mm)'));
    expect(onChange).toHaveBeenCalledWith(50);
  });

  it('decrement does not go below min', () => {
    const onChange = vi.fn();
    render(<NumInput label="ap (mm)" value={0.1} onChange={onChange} min={0.1} max={50} step={0.1} />);
    fireEvent.click(screen.getByLabelText('Decrease ap (mm)'));
    expect(onChange).toHaveBeenCalledWith(0.1);
  });
});
