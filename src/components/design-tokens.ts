/**
 * Design tokens — shared Tailwind class strings and color constants.
 *
 * Single source of truth for repeated visual patterns. Color values live in the
 * `@theme` block of `src/index.css`; this module only composes them into the
 * class combinations documented in `.interface-design/system.md`.
 *
 * Rule: never interpolate Tailwind classes at runtime — see `accent-tokens.ts`.
 */

// ---------------------------------------------------------------------------
// Surfaces (glassmorphism hierarchy — max 2 levels deep)
// ---------------------------------------------------------------------------

/** Level 2 — outer surface card (page sections, main panels) */
export const CARD_SURFACE = 'bg-surface-dark backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-glass';

/** Level 3 — glass card container (primary sections / settings cards) */
export const CARD_GLASS = 'bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow';

/** Level 3 — same as CARD_GLASS with page-section padding and bottom margin */
export const CARD_PAGE = 'bg-card-dark rounded-xl p-6 border border-white/5 shadow-inner-glow mb-6';

/** Inner card (sub-sections, summary boxes inside panels) */
export const CARD_INNER = 'bg-black/30 border border-white/5 rounded-lg p-3';

/** Level 4 — nested/inset container (inputs, track backgrounds) */
export const CARD_NESTED = 'bg-black/40 rounded-lg p-3 border border-white/5';

// ---------------------------------------------------------------------------
// Modals
// ---------------------------------------------------------------------------

/** Modal / Drawer panel (standard pattern: bottom-sheet mobile, centered desktop) */
export const MODAL_PANEL = 'relative w-full sm:max-w-md bg-surface-dark border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-glass p-5 pb-8 sm:pb-5';

/** Modal backdrop (semi-transparent overlay with blur) */
export const MODAL_BACKDROP = 'absolute inset-0 bg-black/60 backdrop-blur-sm';

/** Full-screen modal root (fixed positioning + centering + backdrop styling) */
export const MODAL_ROOT = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm';

/** Handle bar visible only on mobile (drag indicator at top of bottom-sheet) */
export const MODAL_HANDLE = 'w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden';

// ---------------------------------------------------------------------------
// Typography / structure
// ---------------------------------------------------------------------------

/** Section header — uppercase + tracking-widest is reserved for these only */
export const SECTION_HEADER = 'text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2';

/** Empty-state container (no results / no favorites / no history) */
export const EMPTY_STATE = 'flex flex-col items-center justify-center h-48 gap-3 text-center';

/** Max content width for full-page layouts */
export const PAGE_MAX = 'max-w-[1200px] mx-auto';

// ---------------------------------------------------------------------------
// Form controls
// ---------------------------------------------------------------------------

/** WCAG 2.5.5 minimum touch target */
export const TOUCH_TARGET = 'min-h-[44px] min-w-[44px]';

/** Text / number input */
export const INPUT_BASE = 'w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white outline-none transition-all focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-600';

/** Compact variant of INPUT_BASE (dense grids, inline editing) */
export const INPUT_COMPACT = 'w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none transition-all focus:ring-1 focus:ring-primary focus:border-primary';

/** Select / dropdown (pair with the `select-chevron` utility for the arrow) */
export const SELECT_BASE = 'w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white outline-none appearance-none transition-all focus:ring-1 focus:ring-primary focus:border-primary select-chevron';

/** Square icon button */
export const BTN_ICON = 'w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center';

/** Micro increment/decrement button (base classes — size comes from the caller) */
export const BTN_STEPPER = 'rounded bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center shrink-0';

// ---------------------------------------------------------------------------
// Safety semaphore — the ONLY definition of these colors in the repo.
// Mirrors --color-seg-* / --color-gauge-empty in src/index.css.
// ---------------------------------------------------------------------------

export const SEMAPHORE_HEX = {
  verde: '#2ecc71',
  amarelo: '#f39c12',
  vermelho: '#e74c3c',
  vazio: '#313742',
} as const;

/** Neutral gray for disabled series / missing data (= --color-text-muted) */
export const COLOR_MUTED = '#6b7280';

/** Favorite star + gauge "attention" band (= --color-accent-gold) */
export const ACCENT_GOLD = '#facc15';

/** Gauge "optimal" band, between neon green and cyan (= --color-accent-mint) */
export const ACCENT_MINT = '#00FF88';

/** Changelog "polish" category (= --color-accent-pink) */
export const ACCENT_PINK = '#f472b6';

/** Opaque variant of surface-dark, for non-glass surfaces (= --color-surface-solid) */
export const SURFACE_SOLID = '#161b22';
