import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

/**
 * Guard for the auth screens.
 *
 * Someone who is already signed in has no reason to see Sign In or Sign Up, so
 * send them home. `isLoaded` has to come first — until Clerk has read the token
 * cache, `isSignedIn` is false for everyone.
 */
export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
