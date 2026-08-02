import earth from "@/assets/images/earth.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import mascotLogo from "@/assets/images/moscot-logo.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";

/**
 * Every app image goes through here. Import from this object instead of
 * requiring assets inside screens and components.
 *
 * ```tsx
 * <Image source={images.mascotWelcome} />
 * ```
 */
export const images = {
  mascotLogo,
  mascotWelcome,
  mascotAuth,
  streakFire,
  earth,
  palace,
  treasure,
} as const;

export type ImageName = keyof typeof images;
