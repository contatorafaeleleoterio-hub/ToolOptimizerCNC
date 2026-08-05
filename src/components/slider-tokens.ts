/**
 * Slider color tokens — static map from Tailwind color name to { hex, rgb }.
 * Used by StyledSlider and BidirectionalSlider to resolve inline styles
 * without requiring callers to pass rgb strings.
 *
 * Inline styles (not classes) are the correct tool here: the value is genuinely
 * dynamic. For class names use `accent-tokens.ts` instead.
 */

import { ACCENT_HEX, ACCENT_RGB, type AccentColor } from './accent-tokens';

export const SLIDER_TOKENS: Record<string, { hex: string; rgb: string }> = Object.fromEntries(
  (Object.keys(ACCENT_HEX) as AccentColor[]).map((k) => [k, { hex: ACCENT_HEX[k], rgb: ACCENT_RGB[k] }]),
);

/** Returns the rgb string for a Tailwind color name. Falls back to primary. */
export function getSliderRgb(color: string): string {
  return SLIDER_TOKENS[color]?.rgb ?? ACCENT_RGB.primary;
}

/** Returns the hex value for a Tailwind color name. Falls back to primary. */
export function getSliderHex(color: string): string {
  return SLIDER_TOKENS[color]?.hex ?? ACCENT_HEX.primary;
}

/**
 * Neon glow box-shadow for an accent color.
 * Replaces the hand-written `0 0 Npx rgba(${rgb},α)` repeated across sliders.
 */
export function glow(color: AccentColor | string, px: number, alpha: number): string {
  return `0 0 ${px}px rgba(${getSliderRgb(color)},${alpha})`;
}

/** Standard filled-track glow (8px @ 0.6) used by every slider variant. */
export function trackGlow(color: AccentColor | string): string {
  return glow(color, 8, 0.6);
}

/** Slider thumb glow — stronger while pressed. */
export function thumbGlow(color: AccentColor | string, pressed: boolean): string {
  return pressed
    ? `${glow(color, 20, 0.9)}, ${glow(color, 8, 0.5)}`
    : glow(color, 10, 0.4);
}

/** Slider thumb interior — background-dark (#0F1419) at 90% opacity. */
export const THUMB_FILL = 'rgba(15,20,25,0.9)';

/** drop-shadow() filter for big numbers and colored headings. */
export function dropGlow(color: AccentColor | string, px: number, alpha: number): string {
  return `drop-shadow(0 0 ${px}px rgba(${getSliderRgb(color)},${alpha}))`;
}
