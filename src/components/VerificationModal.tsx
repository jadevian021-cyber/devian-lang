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

type CodeSheetProps = {
  /** Shown in the body copy so the user knows where the code went. */
  email: string;
  onClose: () => void;
  /** Called with the full code; resolve `false` to clear the boxes. */
  onComplete: (code: string) => Promise<boolean>;
  /** Sends a fresh code to the same address. */
  onResend?: () => void;
  /** Message from Clerk when the code was wrong or expired. */
  error?: string | null;
  /** True while Clerk is checking the code, to block a second submit. */
  submitting?: boolean;
};

type VerificationModalProps = CodeSheetProps & {
  visible: boolean;
};

/**
 * Bottom sheet asking for the 6-digit email verification code.
 *
 * React Native unmounts a Modal's children while it is hidden, so keeping the
 * sheet in its own component means the code state starts empty every time the
 * sheet opens — no resetting required.
 */
export function VerificationModal({
  visible,
  email,
  onClose,
  onComplete,
  onResend,
  error = null,
  submitting = false,
}: VerificationModalProps) {
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

          <CodeSheet
            email={email}
            onClose={onClose}
            onComplete={onComplete}
            onResend={onResend}
            error={error}
            submitting={submitting}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/**
 * The sheet itself.
 *
 * The boxes are display-only: a single transparent TextInput sits on top and
 * captures every keystroke, which keeps backspace and paste working the way
 * users expect. Entering the last digit submits automatically — there is no
 * submit button — and a rejected code empties the boxes ready for another try.
 */
function CodeSheet({
  email,
  onClose,
  onComplete,
  onResend,
  error,
  submitting,
}: CodeSheetProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const inFlight = useRef(false);

  // Give the keyboard a moment to arrive with the sheet before focusing.
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, []);

  async function handleChange(next: string) {
    // A ref rather than the `submitting` prop: React hasn't re-rendered by the
    // time the sixth digit arrives, so the prop is still false and a fast typist
    // (or a paste) can fire a second submit. Clerk consumes the sign-up on the
    // first one, and the duplicate comes back as "No sign up attempt was found".
    if (inFlight.current || submitting) {
      return;
    }

    const digits = next.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      inFlight.current = true;

      try {
        const accepted = await onComplete(digits);

        if (!accepted) {
          setCode("");
        }
      } finally {
        inFlight.current = false;
      }
    }
  }

  function handleResend() {
    // Same reasoning as above — don't touch the sign-up mid-verification.
    if (inFlight.current || submitting) {
      return;
    }

    onResend?.();
  }

  return (
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
          editable={!submitting}
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

      {error ? (
        <Text className="field__error mt-4 text-center">{error}</Text>
      ) : null}

      <Text className="type-body-sm mt-6 text-center">
        Didn&apos;t get it? Check your spam folder or{" "}
        <Text
          accessibilityRole="button"
          onPress={handleResend}
          className="type-body-sm font-poppins-semibold text-primary"
        >
          resend the code
        </Text>
        .
      </Text>
    </View>
  );
}
