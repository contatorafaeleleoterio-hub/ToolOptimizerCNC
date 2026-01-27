import { useState, useEffect } from 'react';

/**
 * Hook para detectar se é dispositivo mobile
 * Breakpoint: 768px
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar no resize
    window.addEventListener('resize', checkIsMobile);

    // Verificar inicial
    checkIsMobile();

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

export default useIsMobile;
