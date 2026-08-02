/**
 * Corner radius tokens.
 *
 * Derived from the design system: color swatches use `lg`, cards use `xl`,
 * and pill buttons use `full`. Mirrored in `global.css` as `--radius-*`.
 */
export const radii = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radii;
