import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { useAppFonts } from "@/hooks/useAppFonts";
import { clerkPublishableKey } from "@/lib/clerk";
import { colors } from "@/theme";

import "../../global.css";

// Hold the splash screen until Poppins is ready so text doesn't reflow.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    // `tokenCache` keeps the session in the device keychain, so a signed-in
    // user stays signed in across app restarts.
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <StatusBar style="dark" />
      <AppNavigator />
    </ClerkProvider>
  );
}

/**
 * Navigator, gated on the two things every screen depends on: the fonts and the
 * session Clerk restores from the keychain.
 *
 * Waiting for `isLoaded` here means a returning user goes straight from the
 * splash screen to their home screen, with no flash of the signed-out state.
 */
function AppNavigator() {
  const fontsLoaded = useAppFonts();
  const { isLoaded: authLoaded } = useAuth();

  const ready = fontsLoaded && authLoaded;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
