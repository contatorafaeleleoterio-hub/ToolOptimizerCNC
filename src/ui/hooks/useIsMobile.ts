import { useState, useEffect } from 'react';

/**
 * Hook para detecção de viewport móvel baseado em matchMedia.
 * Por padrão considera móvel qualquer largura <= 768px (smartphones e tablets compactos).
 * Seguro para SSR e ambientes de teste (JSDOM sem matchMedia mockado).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (typeof window.matchMedia === 'function') {
      try {
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
      } catch {
        // Fallback
      }
    }
    return typeof window.innerWidth === 'number' ? window.innerWidth <= breakpoint : false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    try {
      const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches);
      };

      setIsMobile(mql.matches);

      if (mql.addEventListener) {
        mql.addEventListener('change', handleChange);
        return () => mql.removeEventListener('change', handleChange);
      } else if ('addListener' in mql) {
        (mql as any).addListener(handleChange);
        return () => (mql as any).removeListener(handleChange);
      }
    } catch {
      // Ignora erro em ambientes sem matchMedia
    }
  }, [breakpoint]);

  return isMobile;
}
