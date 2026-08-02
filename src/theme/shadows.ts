import { Platform } from "react-native";

/**
 * Soft shadow tokens.
 *
 * iOS and Android express elevation differently, so shadows live here as
 * ready-to-spread style objects rather than NativeWind classes. Spread them
 * into a `style` prop:
 *
 * ```tsx
 * <View className="rounded-2xl bg-white p-4" style={shadows.card} />
 * ```
 */
type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

function shadow(
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number,
): Shadow {
  return {
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: Platform.OS === "ios" ? opacity : 0,
    shadowRadius: radius,
    elevation,
  };
}

export const shadows = {
  /** Subtle lift for list rows and inputs. */
  sm: shadow(2, 6, 0.06, 2),
  /** Default card shadow. */
  card: shadow(4, 12, 0.08, 4),
  /** Raised sheets, popovers, floating buttons. */
  lg: shadow(8, 20, 0.12, 8),
} as const;

export type ShadowToken = keyof typeof shadows;
