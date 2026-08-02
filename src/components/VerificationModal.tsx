import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Close } from "@/components/icons";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  /** Shown in the body copy so the user knows where the code went. */
  email: string;
  onClose: () => void;
  /** Fires once the final digit is entered. */
  onComplete: (code: string) => void;
};

/**
 * Bottom sheet asking for the 6-digit email verification code.
 *
 * The boxes are display-only: a single transparent TextInput sits on top and
 * captures every keystroke, which keeps backspace and paste working the way
 * users expect. Completing the code calls `onComplete` automatically — there is
 * no submit button.
 */
export function VerificationModal({
  visible,
  email,
  onClose,
  onComplete,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  // Reset and focus each time the sheet opens.
  useEffect(() => {
    if (visible) {
      setCode("");
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  function handleChange(next: string) {
    const digits = next.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      onComplete(digits);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="sheet__backdrop">
          {/* Tapping the dimmed area dismisses the sheet. */}
          <Pressable className="flex-1" onPress={onClose} />

          <View className="sheet">
            <View className="flex-row items-start justify-between">
              <Text className="type-h2 flex-1 pr-4">Check your email</Text>

              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={onClose}
                hitSlop={12}
                className="mt-1"
              >
                <Close size={18} />
              </TouchableOpacity>
            </View>

            <Text className="type-body-lg mt-2 text-text-secondary">
              We sent a verification code to{" "}
              <Text className="type-body-lg font-poppins-semibold text-text-primary">
                {email || "your inbox"}
              </Text>
              . Enter the 6-digit code below.
            </Text>

            <Pressable className="mt-7" onPress={() => inputRef.current?.focus()}>
              <View className="otp">
                {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                  const active = index === Math.min(code.length, CODE_LENGTH - 1);

                  return (
                    <View
                      key={index}
                      className={`otp__box ${active ? "otp__box--active" : ""}`}
                    >
                      <Text className="otp__digit">{code[index] ?? ""}</Text>
                    </View>
                  );
                })}
              </View>

              {/* Invisible capture field layered over the boxes. */}
              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleChange}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                maxLength={CODE_LENGTH}
                caretHidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                }}
              />
            </Pressable>

            <Text className="type-body-sm mt-6 text-center">
              Didn&apos;t get it? Check your spam folder or{" "}
              <Text className="type-body-sm font-poppins-semibold text-primary">
                resend the code
              </Text>
              .
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
