import { useEffect } from 'react';

/**
 * Sets document.title for the current page.
 * Cleans up by restoring base title on unmount.
 */
export function usePageTitle(title: string): void {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
