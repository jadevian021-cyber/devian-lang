/**
 * Lingua typography tokens — Poppins.
 *
 * React Native has no font fallback stack and `font-bold` only changes
 * `fontWeight`, not the family. So each weight is a separate loaded family and
 * every text style pairs an explicit family with its size.
 *
 * `lineHeight` is stored as a ratio (multiplier), matching the design system.
 * Multiply by `fontSize` when you need an absolute RN `lineHeight` value.
 */
export const fontFamilies = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

/** Font files loaded at startup, keyed by the family name used in styles. */
export const fontAssets = {
  "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
} as const;

type TextStyleToken = {
  /** What this style is for, per the design system. */
  usage: string;
  fontFamily: string;
  fontSize: number;
  /** Ratio, not px. */
  lineHeight: number;
};

export const textStyles = {
  h1: {
    usage: "Page / screen title",
    fontFamily: fontFamilies.bold,
    fontSize: 32,
    lineHeight: 1.2,
  },
  h2: {
    usage: "Section title",
    fontFamily: fontFamilies.semibold,
    fontSize: 24,
    lineHeight: 1.3,
  },
  h3: {
    usage: "Card / module title",
    fontFamily: fontFamilies.semibold,
    fontSize: 20,
    lineHeight: 1.3,
  },
  h4: {
    usage: "Subheading",
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    lineHeight: 1.4,
  },
  bodyLarge: {
    usage: "Important content",
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 1.6,
  },
  bodyMedium: {
    usage: "Body text",
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 1.6,
  },
  bodySmall: {
    usage: "Supporting text",
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 1.6,
  },
  caption: {
    usage: "Labels, meta text",
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    lineHeight: 1.4,
  },
} as const satisfies Record<string, TextStyleToken>;

export type TextStyleName = keyof typeof textStyles;

/** Absolute RN line height in px for a given text style. */
export function lineHeightFor(name: TextStyleName): number {
  const style = textStyles[name];
  return Math.round(style.fontSize * style.lineHeight);
}
