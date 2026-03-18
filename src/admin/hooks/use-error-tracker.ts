/**
 * use-error-tracker.ts — Global error capture for the admin dashboard
 *
 * Call `installErrorTracker()` once at app startup (before render).
 * Registers window.onerror + unhandledrejection handlers that forward
 * captured errors to the admin store (addError).
 *
 * Errors are deduplicated by message+source inside the store.
 * Returns a cleanup function to remove the handlers (useful in tests).
 */

import { useAdminStore } from '../store/admin-store';
import type { ErrorSeverity } from '../types/admin-types';

// Guard to prevent double-installation (React StrictMode double-invocation)
let installed = false;

export function installErrorTracker(): () => void {
  if (installed) return () => {};
  installed = true;

  function handleWindowError(
    event: ErrorEvent
  ): void {
    useAdminStore.getState().addError({
      message: event.message || 'Unknown error',
      stack: event.error?.stack,
      source: event.filename ? `${event.filename}:${event.lineno}:${event.colno}` : undefined,
      severity: 'error' as ErrorSeverity,
    });
  }

  function handleUnhandledRejection(event: PromiseRejectionEvent): void {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === 'string'
          ? reason
          : 'Unhandled promise rejection';
    const stack = reason instanceof Error ? reason.stack : undefined;

    useAdminStore.getState().addError({
      message,
      stack,
      source: undefined,
      severity: 'fatal' as ErrorSeverity,
    });
  }

  window.addEventListener('error', handleWindowError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);

  return () => {
    window.removeEventListener('error', handleWindowError);
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    installed = false;
  };
}

// Reset guard — used only in tests to allow re-installation
export function _resetErrorTrackerGuard(): void {
  installed = false;
}
