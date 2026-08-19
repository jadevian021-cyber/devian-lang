import { useAuth, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * Home — the signed-in route.
 *
 * Anyone who isn't signed in gets sent to onboarding, which is how a fresh
 * install always starts. Real content lands here in a later step.
 */
export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  // Wait for Clerk to read the token cache before deciding anything.
  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="type-h2 text-center text-primary">Lingua</Text>

      <Text className="type-body-lg text-center text-text-secondary">
        Signed in as{" "}
        {user?.primaryEmailAddress?.emailAddress ?? "your account"}
      </Text>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Sign out"
        activeOpacity={0.9}
        onPress={() => signOut()}
        className="btn btn--outline btn--sm"
      >
        <Text className="btn__label btn__label--dark">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
