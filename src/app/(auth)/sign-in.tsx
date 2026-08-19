import { useSignIn } from "@clerk/expo";
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
 * Sign In — mirrors Sign Up's layout with sign-in copy.
 *
 * Email only: signing in is a passwordless code sent to the inbox, so the
 * password field from Sign Up is intentionally absent here. Clerk calls this the
 * `emailCode` strategy — `sendCode()` mails a code, `verifyCode()` checks it,
 * and `finalize()` makes the session active.
 */
export default function SignIn() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [verifying, setVerifying] = useState(false);

  const busy = fetchStatus === "fetching";

  // Anything Clerk can't attribute to a specific field lands in `global`.
  const globalError = errors.global?.[0]?.message ?? null;

  // Clerk holds on to the last request's errors, so a global error raised inside
  // the code sheet would otherwise reappear under the Email field once the sheet
  // closes. Each step shows only its own.
  const formError = verifying ? null : globalError;

  async function handleSignIn() {
    if (busy) {
      return;
    }

    const { error } = await signIn.emailCode.sendCode({
      emailAddress: email.trim(),
    });

    if (error) {
      return;
    }

    setVerifying(true);
  }

  async function handleVerify(code: string) {
    const { error } = await signIn.emailCode.verifyCode({ code });

    if (error) {
      return false;
    }

    // Makes the session active; the route guards take it from here.
    const { error: finalizeError } = await signIn.finalize();

    if (finalizeError) {
      return false;
    }

    setVerifying(false);
    router.replace("/");

    return true;
  }

  async function handleClose() {
    setVerifying(false);
    // Drop the half-finished attempt so pressing Sign In again starts clean.
    await signIn.reset();
  }

  /**
   * Resend only makes sense while the sign-in is still waiting on a code. Once a
   * session exists, Clerk has consumed the attempt and any further call fails
   * with "No sign in attempt was found".
   */
  async function handleResend() {
    if (signIn.createdSessionId) {
      return;
    }

    await signIn.emailCode.sendCode();
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
        <Text className="type-h1 mt-6 text-[34px]">Welcome back</Text>

        <View className="mt-2.5 flex-row items-center gap-2">
          <Text className="type-body-lg text-text-secondary">
            Pick up where you left off
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
        <View className="mt-3">
          <AuthField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            keyboardType="email-address"
            autoComplete="email"
            error={errors.fields.identifier?.message ?? formError}
          />
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sign In"
          accessibilityState={{ disabled: busy }}
          activeOpacity={0.9}
          onPress={handleSignIn}
          disabled={busy}
          className={`btn mt-5 h-16 rounded-2xl ${busy ? "btn--disabled" : ""}`}
          style={shadows.card}
        >
          <Text className="btn__label text-h3">Sign In</Text>
        </TouchableOpacity>

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
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity
            accessibilityRole="link"
            accessibilityLabel="Sign up"
            onPress={() => router.push("/sign-up")}
            hitSlop={8}
          >
            <Text className="link">Sign up</Text>
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
