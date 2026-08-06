import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_PANEL, MODAL_BACKDROP, MODAL_HANDLE } from '../design-tokens';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  overlayTestId?: string;
  panelClassName?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Base modal: portal to body, backdrop-to-close, Escape-to-close, tab-cycling focus trap. */
export function Modal({ onClose, children, ariaLabel, overlayTestId, panelClassName }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className={MODAL_BACKDROP} onClick={onClose} data-testid={overlayTestId} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={panelClassName ? `${MODAL_PANEL} ${panelClassName}` : MODAL_PANEL}
      >
        <div className={MODAL_HANDLE} />
        {children}
      </div>
    </div>,
    document.body,
  );
}
