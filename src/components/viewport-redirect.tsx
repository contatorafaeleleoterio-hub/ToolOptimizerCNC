import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-is-mobile';

export function ViewportRedirect() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (isMobile && (path === '/' || path === '')) {
      navigate('/mobile', { replace: true });
    } else if (!isMobile && path === '/mobile') {
      navigate('/', { replace: true });
    }
  }, [isMobile, location.pathname, navigate]);

  return null;
}
