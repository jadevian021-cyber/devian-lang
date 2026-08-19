import { View } from "react-native";

import { SocialAuthButton } from "@/components/SocialAuthButton";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/icons";
import { useSocialAuth } from "@/hooks/useSocialAuth";

type SocialAuthGroupProps = {
  /** Prefixes each label — "Continue with" on both auth screens today. */
  action?: string;
  /** Dims every provider, e.g. while the email form is submitting. */
  disabled?: boolean;
};

/**
 * The Google / Facebook / Apple stack shared by Sign Up and Sign In.
 *
 * Each button hands its provider to Clerk. Because Clerk treats social auth as
 * a single sign-in-or-up flow, the same three buttons work on both screens.
 */
export function SocialAuthGroup({
  action = "Continue with",
  disabled = false,
}: SocialAuthGroupProps) {
  const { signInWith, pendingProvider } = useSocialAuth();

  const busy = disabled || pendingProvider !== null;

  return (
    <View className="gap-3.5">
      <SocialAuthButton
        icon={<GoogleIcon size={24} />}
        label={`${action} Google`}
        onPress={() => signInWith("google")}
        disabled={busy}
      />
      <SocialAuthButton
        icon={<FacebookIcon size={26} />}
        label={`${action} Facebook`}
        onPress={() => signInWith("facebook")}
        disabled={busy}
      />
      <SocialAuthButton
        icon={<AppleIcon size={26} />}
        label={`${action} Apple`}
        onPress={() => signInWith("apple")}
        disabled={busy}
      />
    </View>
  );
}
