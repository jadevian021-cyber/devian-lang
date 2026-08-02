/**
 * Design system entry point.
 *
 * Import tokens from here rather than reaching into individual files:
 *
 * ```ts
 * import { colors, shadows } from "@/theme";
 * ```
 *
 * Reminder: style with NativeWind classes first. Reach for these tokens only
 * for components that don't accept `className` (SafeAreaView, StatusBar,
 * Modal) or for runtime/animated values.
 */
export { colors, type ColorToken } from "./colors";
export {
  fontAssets,
  fontFamilies,
  lineHeightFor,
  textStyles,
  type TextStyleName,
} from "./typography";
export { shadows, type ShadowToken } from "./shadows";
export { radii, type RadiusToken } from "./radii";
