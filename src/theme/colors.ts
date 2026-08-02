/**
 * Lingua color tokens.
 *
 * These are the single source of truth for color in the app. The same values
 * are mirrored as CSS variables inside `global.css` so NativeWind can generate
 * utilities (`bg-primary`, `text-text-secondary`, ...).
 *
 * Use these TS tokens only where NativeWind cannot reach: SafeAreaView,
 * StatusBar, shadows, Animated values, and other style-prop-only components.
 */
export const colors = {
  /** Brand purple — primary actions, active states, brand accents. */
  primary: "#6C4EF5",
  /** Deeper purple — pressed states and gradient ends. */
  primaryDeep: "#5B3BF6",
  /** Brand blue — informational accents and secondary actions. */
  blue: "#4D8BFF",
  /** Brand green — progress, correct answers, completion. */
  green: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  /** Streak flame orange. */
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  /** Headings and high-emphasis body text. */
  textPrimary: "#0D132B",
  /** Supporting text, labels, meta text. */
  textSecondary: "#6B7280",
  /** Hairline borders and dividers. */
  border: "#E5E7EB",
  /** Cards and raised sections sitting on the background. */
  surface: "#F6F7FB",
  /** App background. */
  background: "#FFFFFF",
} as const;

export type ColorToken = keyof typeof colors;
