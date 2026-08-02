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
 * password field from Sign Up is intentionally absent here.
 */
export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
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
          />
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sign In"
          activeOpacity={0.9}
          onPress={() => setVerifying(true)}
          className="btn mt-5 h-16 rounded-2xl"
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
          <SocialAuthGroup />
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
        onClose={() => setVerifying(false)}
        onComplete={handleVerified}
      />
    </SafeAreaView>
  );
}
