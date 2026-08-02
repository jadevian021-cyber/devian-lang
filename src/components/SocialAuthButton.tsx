import type { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

type SocialAuthButtonProps = {
  icon: ReactNode;
  label: string;
  onPress: () => void;
};

/** Outlined row button for a social provider — icon on the left, label beside it. */
export function SocialAuthButton({ icon, label, onPress }: SocialAuthButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      activeOpacity={0.7}
      onPress={onPress}
      className="social-btn"
    >
      {icon}
      <Text className="social-btn__label">{label}</Text>
    </TouchableOpacity>
  );
}
