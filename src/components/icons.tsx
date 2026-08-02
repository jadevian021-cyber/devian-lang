import { View } from "react-native";

import { colors } from "@/theme";

/**
 * Small icons drawn with plain Views.
 *
 * The app has no SVG dependency, so each shape is composed from borders,
 * rotations, and border radii. Every icon accepts a `size` so it can scale with
 * its surrounding text.
 */

type IconProps = {
  size?: number;
  color?: string;
};

/** `<` — back navigation. A square with two borders, rotated 45°. */
export function ChevronLeft({ size = 14, color = colors.textPrimary }: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderLeftWidth: 2.5,
        borderBottomWidth: 2.5,
        borderColor: color,
        transform: [{ rotate: "45deg" }],
      }}
    />
  );
}

/** Outlined eye — toggles password visibility. */
export function Eye({ size = 22, color = colors.textPrimary }: IconProps) {
  // The lens is a square with two opposite corners fully rounded. Rotating it
  // 45° puts the sharp corners left and right, giving the pointed eye shape.
  const lens = size * 0.72;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: lens,
          height: lens,
          borderWidth: 1.8,
          borderColor: color,
          borderTopLeftRadius: lens,
          borderBottomRightRadius: lens,
          transform: [{ rotate: "45deg" }],
        }}
      />
      {/* Pupil */}
      <View
        style={{
          position: "absolute",
          width: size * 0.2,
          height: size * 0.2,
          borderRadius: size * 0.1,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/** Four-pointed sparkle used around the mascot. */
export function Sparkle({ size = 14, color = colors.warning }: IconProps) {
  const arm = size * 0.28;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          position: "absolute",
          width: arm,
          height: size,
          borderRadius: arm,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: size,
          height: arm,
          borderRadius: arm,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/** ✕ — closes the verification sheet. Two bars crossed at 45°. */
export function Close({ size = 16, color = colors.textSecondary }: IconProps) {
  const bar = {
    position: "absolute" as const,
    width: size,
    height: 2,
    borderRadius: 1,
    backgroundColor: color,
  };

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View style={[bar, { transform: [{ rotate: "45deg" }] }]} />
      <View style={[bar, { transform: [{ rotate: "-45deg" }] }]} />
    </View>
  );
}

/**
 * Google "G".
 *
 * A four-colour ring, rotated so each colour lands in the right quadrant, with
 * the right-middle notched out and replaced by the blue crossbar.
 */
export function GoogleIcon({ size = 22 }: { size?: number }) {
  const stroke = size * 0.23;

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: stroke,
          borderTopColor: "#EA4335",
          borderRightColor: "#4285F4",
          borderBottomColor: "#34A853",
          borderLeftColor: "#FBBC05",
          transform: [{ rotate: "-45deg" }],
        }}
      />
      {/* Notch: hides the ring on the right so the G opens up. */}
      <View
        style={{
          position: "absolute",
          right: 0,
          top: size * 0.36,
          width: size * 0.5,
          height: size * 0.28,
          backgroundColor: colors.background,
        }}
      />
      {/* Crossbar */}
      <View
        style={{
          position: "absolute",
          right: 0,
          top: size * 0.42,
          width: size * 0.46,
          height: stroke,
          backgroundColor: "#4285F4",
        }}
      />
    </View>
  );
}

/** Facebook — white "f" on the brand blue circle. */
export function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#1877F2",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* The "f" is drawn rather than typed so it renders identically on both
          platforms regardless of the loaded font. */}
      <View style={{ width: size * 0.42, height: size * 0.72, marginTop: size * 0.16 }}>
        {/* Stem */}
        <View
          style={{
            position: "absolute",
            right: size * 0.06,
            top: 0,
            bottom: 0,
            width: size * 0.13,
            backgroundColor: "#FFFFFF",
          }}
        />
        {/* Hook at the top of the stem */}
        <View
          style={{
            position: "absolute",
            right: size * 0.06,
            top: 0,
            width: size * 0.2,
            height: size * 0.24,
            borderTopLeftRadius: size * 0.12,
            borderLeftWidth: size * 0.13,
            borderTopWidth: size * 0.13,
            borderColor: "#FFFFFF",
          }}
        />
        {/* Crossbar */}
        <View
          style={{
            position: "absolute",
            left: 0,
            top: size * 0.26,
            width: size * 0.38,
            height: size * 0.12,
            backgroundColor: "#FFFFFF",
          }}
        />
      </View>
    </View>
  );
}

/** Apple — solid black mark. Two lobes, a top dip, and the leaf. */
export function AppleIcon({ size = 24 }: { size?: number }) {
  const black = "#0B0B0B";
  const lobe = size * 0.58;

  return (
    <View style={{ width: size, height: size }}>
      {/* Leaf */}
      <View
        style={{
          position: "absolute",
          left: size * 0.5,
          top: 0,
          width: size * 0.2,
          height: size * 0.22,
          borderTopRightRadius: size * 0.2,
          borderBottomLeftRadius: size * 0.2,
          backgroundColor: black,
          transform: [{ rotate: "12deg" }],
        }}
      />
      {/* Left lobe */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: size * 0.24,
          width: lobe,
          height: size * 0.76,
          borderRadius: lobe / 2,
          backgroundColor: black,
        }}
      />
      {/* Right lobe */}
      <View
        style={{
          position: "absolute",
          right: 0,
          top: size * 0.24,
          width: lobe,
          height: size * 0.76,
          borderRadius: lobe / 2,
          backgroundColor: black,
        }}
      />
      {/* Dip between the lobes */}
      <View
        style={{
          position: "absolute",
          left: size * 0.34,
          top: size * 0.2,
          width: size * 0.32,
          height: size * 0.16,
          borderBottomLeftRadius: size * 0.16,
          borderBottomRightRadius: size * 0.16,
          backgroundColor: colors.background,
        }}
      />
    </View>
  );
}
