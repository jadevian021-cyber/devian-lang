import { useSSO } from "@clerk/expo";
import { useSignInWithApple } from "@clerk/expo/apple";
import { useSignInWithGoogle } from "@clerk/expo/google";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import {
  authErrorMessage,
  canUseNativeApple,
  canUseNativeGoogle,
} from "@/lib/clerk";

export type SocialProvider = "google" | "facebook" | "apple";

/** Clerk names its OAuth strategies `oauth_<provider>`. */
const OAUTH_STRATEGIES = {
  google: "oauth_google",
  facebook: "oauth_facebook",
  apple: "oauth_apple",
} as const;

/**
 * Social sign-in for the three provider buttons on the auth screens.
 *
 * Google and Apple open their native system sheets when the app can (a
 * development build with the Google client IDs configured; iOS for Apple).
 * Everything else — Facebook, Expo Go, web — goes through Clerk's browser OAuth
 * flow.
 *
 * Both paths end the same way: Clerk hands back a session id, we make it the
 * active session, and the user lands on the home route. Note that social auth
 * uses `setActive()` rather than the `finalize()` used by the email flows.
 */
export function useSocialAuth() {
  const router = useRouter();

  const { startSSOFlow } = useSSO();
  const { startGoogleAuthenticationFlow } = useSignInWithGoogle();
  const { startAppleAuthenticationFlow } = useSignInWithApple();

  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
    null,
  );

  /** Prefers the native sheet, falls back to the browser flow. */
  async function startFlow(provider: SocialProvider) {
    try {
      if (provider === "google" && canUseNativeGoogle) {
        return await startGoogleAuthenticationFlow();
      }

      if (provider === "apple" && canUseNativeApple) {
        return await startAppleAuthenticationFlow();
      }
    } catch {
      // The native module isn't there (Expo Go, or no development build yet).
      // The browser flow below works everywhere, so fall through to it.
    }

    return startSSOFlow({ strategy: OAUTH_STRATEGIES[provider] });
  }

  async function signInWith(provider: SocialProvider) {
    if (pendingProvider) {
      return;
    }

    setPendingProvider(provider);

    try {
      const { createdSessionId, setActive, signUp } = await startFlow(provider);

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
        return;
      }

      // Clerk authenticated the provider account but couldn't finish the
      // sign-up, because the instance asks for fields the provider doesn't
      // supply. Without this branch the button would just quietly do nothing.
      if (signUp?.status === "missing_requirements") {
        Alert.alert(
          "Sign in failed",
          `Clerk needs ${signUp.missingFields.join(", ")} to finish creating this account. ` +
            "Make those fields optional in the Clerk dashboard, or collect them on a follow-up screen.",
        );
        return;
      }

      // Anything else means the user dismissed the provider's dialog.
    } catch (error) {
      Alert.alert("Sign in failed", authErrorMessage(error));
    } finally {
      setPendingProvider(null);
    }
  }

  return { signInWith, pendingProvider };
}
