/**
 * Design tokens — shared Tailwind class strings for consistent glassmorphism UI.
 * Used as reference for FASE 3 visual consistency normalization.
 * Components are NOT refactored to use these yet — that is FASE 3 work.
 */

// Glass card container (primary sections / settings cards)
export const CARD_GLASS = 'bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow';

// Inner card (sub-sections, summary boxes inside panels)
export const CARD_INNER = 'bg-black/30 border border-white/5 rounded-lg p-3';

// Modal / Drawer panel (standard pattern: bottom-sheet mobile, centered desktop)
export const MODAL_PANEL = 'relative w-full sm:max-w-md bg-surface-dark border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-glass p-5 pb-8 sm:pb-5';

// Modal backdrop (semi-transparent overlay with blur)
export const MODAL_BACKDROP = 'absolute inset-0 bg-black/60 backdrop-blur-sm';

// Handle bar visible only on mobile (drag indicator at top of bottom-sheet)
export const MODAL_HANDLE = 'w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden';
