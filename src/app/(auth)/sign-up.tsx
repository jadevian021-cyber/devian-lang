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
 * Pressing Sign Up opens the verification sheet. Entering all six digits sends
 * the user to the home route. No real auth yet; Clerk lands in a later step.
 */
export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);

  function handleVerified() {
    setVerifying(false);
    router.replace("/");
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
          />

          <AuthField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secure
            autoComplete="new-password"
          />
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sign Up"
          activeOpacity={0.9}
          onPress={() => setVerifying(true)}
          className="btn mt-5 h-16 rounded-2xl"
          style={shadows.card}
        >
          <Text className="btn__label text-h3">Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="divider mt-7">
          <View className="divider__line" />
          <Text className="divider__label">or continue with</Text>
          <View className="divider__line" />
        </View>

        <View className="mt-6">
          <SocialAuthGroup />
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
        onClose={() => setVerifying(false)}
        onComplete={handleVerified}
      />
    </SafeAreaView>
  );
}
