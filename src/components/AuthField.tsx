import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import type { KeyboardTypeOptions } from "react-native";

import { Eye } from "@/components/icons";
import { colors, fontFamilies } from "@/theme";

type AuthFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  /** Renders the eye toggle and masks the input. */
  secure?: boolean;
  autoComplete?: "email" | "password" | "new-password" | "off";
  /** Validation message from Clerk, shown below the card. */
  error?: string | null;
};

/**
 * Labelled input card used on the auth screens.
 *
 * The label sits inside the bordered card, above the input, and the border
 * picks up the brand colour while the field is focused — or the error colour
 * when Clerk rejects the value.
 */
export function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secure = false,
  autoComplete = "off",
  error = null,
}: AuthFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secure);

  return (
    <View>
      <View
        className={`field ${error ? "field--error" : focused ? "field--active" : ""}`}
      >
        <Text className="field__label">{label}</Text>

        <View className="mt-0.5 flex-row items-center">
          <TextInput
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            placeholderTextColor={colors.border}
            keyboardType={keyboardType}
            autoComplete={autoComplete}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={hidden}
            // TextInput needs the font on `style`; className can't reach it here.
            style={{
              flex: 1,
              padding: 0,
              fontFamily: fontFamilies.medium,
              fontSize: 17,
              color: colors.textPrimary,
            }}
          />

          {secure ? (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={hidden ? "Show password" : "Hide password"}
              onPress={() => setHidden((previous) => !previous)}
              hitSlop={12}
              className="pl-3"
            >
              <Eye size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {error ? <Text className="field__error">{error}</Text> : null}
    </View>
  );
}
