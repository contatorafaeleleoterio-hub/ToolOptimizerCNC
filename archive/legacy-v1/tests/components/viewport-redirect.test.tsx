import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ViewportRedirect } from '@/components/viewport-redirect';

// Mock react-router-dom hooks so navigation doesn't trigger fetch requests in jsdom
const mockNavigate = vi.fn();
let mockPathname = '/';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: mockPathname }),
  };
});

describe('ViewportRedirect', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    mockNavigate.mockClear();
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
  });

  it('mobile at "/" calls navigate to "/mobile"', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    mockPathname = '/';
    render(<ViewportRedirect />);
    expect(mockNavigate).toHaveBeenCalledWith('/mobile', { replace: true });
  });

  it('desktop at "/mobile" calls navigate to "/"', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true });
    mockPathname = '/mobile';
    render(<ViewportRedirect />);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('desktop at "/" does not navigate', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true });
    mockPathname = '/';
    render(<ViewportRedirect />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('mobile at "/mobile" does not navigate', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    mockPathname = '/mobile';
    render(<ViewportRedirect />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
