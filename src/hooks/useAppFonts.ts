import { useFonts } from "expo-font";

import { fontAssets } from "@/theme";

/**
 * Loads the Poppins family used across the app.
 *
 * Returns `true` once every weight is registered. Keep the splash screen up
 * until then, otherwise text renders in the system font and reflows.
 */
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts(fontAssets);

  if (error) {
    // Don't block the app on a font failure — render with the system font.
    console.warn("Failed to load Poppins fonts:", error);
    return true;
  }

  return loaded;
}
