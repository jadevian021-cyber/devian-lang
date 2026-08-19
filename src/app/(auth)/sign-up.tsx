import { useSignUp } from "@clerk/expo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthField } from "@/components/AuthField";
import { SocialAuthGroup } from "@/components/SocialAuthGroup";
import { VerificationModal } from "@/components/VerificationModal";
import { ChevronLeft, Sparkle } from "@/components/icons";
import { images } from "@/constants/images";
import { colors, shadows } from "@/theme";

/**
 * Sign Up — create an account with email + password, or a social provider.
 *
 * Clerk's flow is three calls: `password()` starts the sign-up,
 * `verifications.sendEmailCode()` emails a code, and `verifyEmailCode()` checks
 * it. `finalize()` then turns the finished sign-up into the active session.
 */
export default function SignUp() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);

  const busy = fetchStatus === "fetching";

  // Clerk sorts its errors by form field; anything it can't attribute to a
  // field lands in `global`.
  const globalError = errors.global?.[0]?.message ?? null;

  // Clerk holds on to the last request's errors, so a global error raised inside
  // the code sheet would otherwise reappear under the Email field once the sheet
  // closes. Each step shows only its own.
  const formError = verifying ? null : globalError;

  async function handleSignUp() {
    if (busy) {
      return;
    }

    const { error } = await signUp.password({
      emailAddress: email.trim(),
      password,
    });

    if (error) {
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();

    if (sendError) {
      return;
    }

    setVerifying(true);
  }

  async function handleVerify(code: string) {
    const { error } = await signUp.verifications.verifyEmailCode({ code });

    if (error) {
      return false;
    }

    // Makes the new session active; the route guards take it from here.
    const { error: finalizeError } = await signUp.finalize();

    if (finalizeError) {
      return false;
    }

    setVerifying(false);
    router.replace("/");

    return true;
  }

  async function handleClose() {
    setVerifying(false);
    // Drop the half-finished attempt so pressing Sign Up again starts clean.
    await signUp.reset();
  }

  /**
   * Resend only makes sense while a sign-up is waiting on this email. Once it
   * completes, Clerk has consumed the attempt and any further call fails with
   * "No sign up attempt was found".
   */
  async function handleResend() {
    if (!signUp.unverifiedFields.includes("email_address")) {
      return;
    }

    await signUp.verifications.sendEmailCode();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          hitSlop={16}
          className="mt-3 h-8 w-8 justify-center"
        >
          <ChevronLeft size={15} />
        </TouchableOpacity>

        {/* Heading */}
        <Text className="type-h1 mt-6 text-[34px]">Create your account</Text>

        <View className="mt-2.5 flex-row items-center gap-2">
          <Text className="type-body-lg text-text-secondary">
            Start your language journey today
          </Text>
          <Sparkle size={16} color={colors.warning} />
        </View>

        {/* Mascot */}
        <View className="mt-4 h-45 items-center justify-end">
          <Image
            source={images.mascotAuth}
            style={{ width: 230, height: 180 }}
            contentFit="contain"
          />

          {/* Sparkles scattered around the mascot, as in the design. */}
          <View className="absolute left-6 top-8">
            <Sparkle size={18} color={colors.warning} />
          </View>
          <View className="absolute right-8 top-6">
            <Sparkle size={15} color={colors.blue} />
          </View>
          <View className="absolute right-13 top-22">
            <Sparkle size={16} color={colors.warning} />
          </View>
        </View>

        {/* Form */}
        <View className="mt-3 gap-3.5">
          <AuthField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            keyboardType="email-address"
            autoComplete="email"
            error={errors.fields.emailAddress?.message ?? formError}
          />

          <AuthField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secure
            autoComplete="new-password"
            error={errors.fields.password?.message}
          />
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sign Up"
          accessibilityState={{ disabled: busy }}
          activeOpacity={0.9}
          onPress={handleSignUp}
          disabled={busy}
          className={`btn mt-5 h-16 rounded-2xl ${busy ? "btn--disabled" : ""}`}
          style={shadows.card}
        >
          <Text className="btn__label text-h3">Sign Up</Text>
        </TouchableOpacity>

        {/* Clerk's bot protection renders its challenge here when needed. */}
        <View nativeID="clerk-captcha" />

        {/* Divider */}
        <View className="divider mt-7">
          <View className="divider__line" />
          <Text className="divider__label">or continue with</Text>
          <View className="divider__line" />
        </View>

        <View className="mt-6">
          <SocialAuthGroup disabled={busy} />
        </View>

        {/* Footer */}
        <View className="mt-10 flex-row items-center justify-center gap-1.5">
          <Text className="type-body-lg text-text-secondary">
            Already have an account?
          </Text>
          <TouchableOpacity
            accessibilityRole="link"
            accessibilityLabel="Log in"
            onPress={() => router.push("/sign-in")}
            hitSlop={8}
          >
            <Text className="link">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal
        visible={verifying}
        email={email}
        onClose={handleClose}
        onComplete={handleVerify}
        onResend={handleResend}
        error={errors.fields.code?.message ?? globalError}
        submitting={busy}
      />
    </SafeAreaView>
  );
}
