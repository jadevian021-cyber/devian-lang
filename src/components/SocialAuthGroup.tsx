import { View } from "react-native";

import { SocialAuthButton } from "@/components/SocialAuthButton";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/icons";

type SocialAuthGroupProps = {
  /** Prefixes each label — "Continue with" on both auth screens today. */
  action?: string;
};

/**
 * The Google / Facebook / Apple stack shared by Sign Up and Sign In.
 *
 * These are UI only. Wiring them to Clerk's OAuth flows comes in a later step.
 */
export function SocialAuthGroup({ action = "Continue with" }: SocialAuthGroupProps) {
  return (
    <View className="gap-3.5">
      <SocialAuthButton
        icon={<GoogleIcon size={24} />}
        label={`${action} Google`}
        onPress={() => {}}
      />
      <SocialAuthButton
        icon={<FacebookIcon size={26} />}
        label={`${action} Facebook`}
        onPress={() => {}}
      />
      <SocialAuthButton
        icon={<AppleIcon size={26} />}
        label={`${action} Apple`}
        onPress={() => {}}
      />
    </View>
  );
}
