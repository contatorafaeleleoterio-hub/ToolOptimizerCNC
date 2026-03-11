/**
 * use-plausible — Privacy-first analytics hook (Plausible.io)
 *
 * Wraps window.plausible() with TypeScript types.
 * Silently no-ops when Plausible script is not loaded (dev, test, offline).
 * LGPD-safe: no cookies, no personal data, no fingerprinting.
 */

// Extend Window to include the Plausible global function
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number> }
    ) => void;
  }
}

export type PlausibleEvent =
  | 'Simulacao_Executada'
  | 'Material_Selecionado'
  | 'Historico_Acessado'
  | 'Settings_Acessado'
  | 'Resultado_Copiado'
  | 'Bug_Reportado';

export function usePlausible() {
  /**
   * Track a custom event with optional properties.
   * No-op when window.plausible is not available (dev / test).
   */
  const track = (
    event: PlausibleEvent,
    props?: Record<string, string | number>
  ): void => {
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible(event, props ? { props } : undefined);
    }
  };

  return { track };
}
