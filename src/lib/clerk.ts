import { Platform } from "react-native";

/**
 * Clerk configuration, read once from the environment.
 *
 * Expo only exposes variables prefixed with `EXPO_PUBLIC_`, and only where they
 * are written out as a full `process.env.X` expression — so read them here and
 * import from this file everywhere else.
 *
 * The publishable key is safe to ship inside the app bundle. Secret keys are
 * not, and must never appear anywhere in this project.
 */
function readPublishableKey(): string {
  const key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Fail here, with instructions, rather than let this surface from inside
  // ClerkProvider as a stack trace pointing at the root layout.
  if (!key) {
    throw new Error(
      "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY.\n\n" +
        "1. Copy .env.example to .env, then paste your key from the Clerk " +
        "dashboard (API keys > Publishable key).\n" +
        "2. Restart the dev server: npx expo start --clear\n\n" +
        "Editing .env while the app is running is not enough — in development " +
        "Expo ships these values in the bundle prelude, which only arrives on " +
        "a full reload, not a Fast Refresh update.",
    );
  }

  return key;
}

export const clerkPublishableKey = readPublishableKey();

const googleWebClientId = process.env.EXPO_PUBLIC_CLERK_GOOGLE_WEB_CLIENT_ID;
const googleIosClientId = process.env.EXPO_PUBLIC_CLERK_GOOGLE_IOS_CLIENT_ID;

/**
 * Whether we can show Google's native sign-in sheet.
 *
 * It needs a development build plus the client IDs that
 * `@clerk/expo-google-signin` reads from the environment. Without them we use
 * Clerk's browser OAuth flow instead, which works everywhere including Expo Go.
 */
export const canUseNativeGoogle =
  (Platform.OS === "ios" && Boolean(googleWebClientId && googleIosClientId)) ||
  (Platform.OS === "android" && Boolean(googleWebClientId));

/** Native "Sign in with Apple" is an iOS-only system dialog. */
export const canUseNativeApple = Platform.OS === "ios";

/**
 * Turns a Clerk error into a single line we can show the user.
 *
 * Clerk's `longMessage` is the friendlier, more specific copy when it exists.
 */
export function authErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error && typeof error === "object") {
    const { longMessage, message } = error as {
      longMessage?: unknown;
      message?: unknown;
    };

    if (typeof longMessage === "string" && longMessage) {
      return longMessage;
    }

    if (typeof message === "string" && message) {
      return message;
    }
  }

  return fallback;
}
