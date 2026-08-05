/**
 * Accent color class maps — static lookups that replace dynamic Tailwind
 * interpolation (`text-${color}`), which is silently purged in production
 * builds because Tailwind cannot see runtime-composed class names.
 *
 * Rule #11 of `.interface-design/system.md`: never interpolate Tailwind
 * classes. Use these maps for classes, or `slider-tokens.ts` for inline styles.
 */

export type AccentColor = 'primary' | 'secondary' | 'accent-purple' | 'accent-orange';

export const ACCENT_TEXT: Record<AccentColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  'accent-purple': 'text-accent-purple',
  'accent-orange': 'text-accent-orange',
};

export const ACCENT_BG: Record<AccentColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  'accent-purple': 'bg-accent-purple',
  'accent-orange': 'bg-accent-orange',
};

export const ACCENT_BG_10: Record<AccentColor, string> = {
  primary: 'bg-primary/10',
  secondary: 'bg-secondary/10',
  'accent-purple': 'bg-accent-purple/10',
  'accent-orange': 'bg-accent-orange/10',
};

export const ACCENT_BG_30: Record<AccentColor, string> = {
  primary: 'bg-primary/30',
  secondary: 'bg-secondary/30',
  'accent-purple': 'bg-accent-purple/30',
  'accent-orange': 'bg-accent-orange/30',
};

export const ACCENT_BORDER: Record<AccentColor, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  'accent-purple': 'border-accent-purple',
  'accent-orange': 'border-accent-orange',
};

/** Card overlay gradient: `bg-gradient-to-br` + this + `to-transparent` */
export const ACCENT_GRADIENT_FROM: Record<AccentColor, string> = {
  primary: 'from-primary/5',
  secondary: 'from-secondary/5',
  'accent-purple': 'from-accent-purple/5',
  'accent-orange': 'from-accent-orange/5',
};

/** Neon glow shadow token matching each accent */
export const ACCENT_SHADOW: Record<AccentColor, string> = {
  primary: 'shadow-neon-cyan',
  secondary: 'shadow-neon-green',
  'accent-purple': 'shadow-neon-purple',
  'accent-orange': 'shadow-neon-orange',
};

/** Narrows an arbitrary string to an AccentColor, defaulting to primary. */
export function toAccentColor(color: string): AccentColor {
  return color in ACCENT_TEXT ? (color as AccentColor) : 'primary';
}
