import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CollapsibleSection } from '@/components/collapsible-section';

describe('CollapsibleSection', () => {
  it('renders title', () => {
    render(<CollapsibleSection title="Configuração Base">content</CollapsibleSection>);
    expect(screen.getByText('Configuração Base')).toBeInTheDocument();
  });

  it('is closed by default', () => {
    render(<CollapsibleSection title="Test">hidden content</CollapsibleSection>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens when header is clicked', () => {
    render(<CollapsibleSection title="Test">content</CollapsibleSection>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes when header is clicked again', () => {
    render(<CollapsibleSection title="Test">content</CollapsibleSection>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn); // open
    fireEvent.click(btn); // close
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders open when defaultOpen=true', () => {
    render(<CollapsibleSection title="Test" defaultOpen>content</CollapsibleSection>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows summary when closed', () => {
    render(
      <CollapsibleSection title="Test" summary="Aço 1045 | Desbaste">content</CollapsibleSection>
    );
    expect(screen.getByText('Aço 1045 | Desbaste')).toBeInTheDocument();
  });

  it('hides summary when open', () => {
    render(
      <CollapsibleSection title="Test" summary="Aço 1045 | Desbaste" defaultOpen>content</CollapsibleSection>
    );
    expect(screen.queryByText('Aço 1045 | Desbaste')).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<CollapsibleSection title="Test" defaultOpen><span>child text</span></CollapsibleSection>);
    expect(screen.getByText('child text')).toBeInTheDocument();
  });
});
