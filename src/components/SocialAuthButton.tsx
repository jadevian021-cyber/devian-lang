import type { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

type SocialAuthButtonProps = {
  icon: ReactNode;
  label: string;
  onPress: () => void;
  /** Dimmed and unpressable while another provider flow is running. */
  disabled?: boolean;
};

/** Outlined row button for a social provider — icon on the left, label beside it. */
export function SocialAuthButton({
  icon,
  label,
  onPress,
  disabled = false,
}: SocialAuthButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      className={`social-btn ${disabled ? "opacity-50" : ""}`}
    >
      {icon}
      <Text className="social-btn__label">{label}</Text>
    </TouchableOpacity>
  );
}
