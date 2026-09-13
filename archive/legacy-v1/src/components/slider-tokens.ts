/**
 * Slider color tokens — static map from Tailwind color name to { hex, rgb }.
 * Used by StyledSlider and BidirectionalSlider to resolve inline styles
 * without requiring callers to pass rgb strings.
 */

export const SLIDER_TOKENS: Record<string, { hex: string; rgb: string }> = {
  primary:          { hex: '#00D9FF', rgb: '0,217,255' },
  secondary:        { hex: '#39FF14', rgb: '57,255,20' },
  'accent-purple':  { hex: '#A855F7', rgb: '168,85,247' },
  'accent-orange':  { hex: '#F97316', rgb: '249,115,22' },
};

/** Returns the rgb string for a Tailwind color name. Falls back to primary. */
export function getSliderRgb(color: string): string {
  return SLIDER_TOKENS[color]?.rgb ?? '0,217,255';
}
