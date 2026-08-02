import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors, shadows } from "@/theme";

/**
 * Onboarding screen — the first thing a new user sees.
 *
 * Layout is a single column: logo, headline, subtitle, then the mascot
 * illustration with floating greeting bubbles, and a CTA pinned to the bottom.
 */
export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-6">
        {/* Logo + wordmark */}
        <View className="mt-2 flex-row items-center justify-center gap-2">
          <Image
            source={images.mascotLogo}
            style={{ width: 48, height: 48 }}
            contentFit="contain"
          />
          <Text className="type-h1 text-[34px]">lingua</Text>
        </View>

        {/* Headline */}
        <Text className="type-h1 mt-10 text-[34px] leading-[44px]">
          Your AI language{"\n"}
          <Text className="type-h1 text-[34px] leading-[44px] text-primary">
            teacher
          </Text>
          <Text className="type-h1 text-[34px] leading-[44px]">.</Text>
        </Text>

        {/* Subtitle */}
        <Text className="type-body-lg mt-4 max-w-75 text-text-secondary">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>

        {/* Mascot + greeting bubbles */}
        <View className="flex-1 items-center justify-center">
          <View className="h-full w-full max-h-107.5 max-w-90">
            <Image
              source={images.mascotWelcome}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />

            {/* Hello! — left, light blue */}
            <View className="absolute left-0 top-[14%]">
              <View className="bubble bubble--blue" style={shadows.sm}>
                <Text className="bubble__label">Hello!</Text>
              </View>
              <View
                className="bubble__tail right-5"
                style={{
                  backgroundColor: "#EAF1FF",
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </View>

            {/* ¡Hola! — top right, lavender */}
            <View className="absolute right-3 top-[3%]">
              <View className="bubble" style={shadows.sm}>
                <Text className="bubble__label bubble__label--purple">
                  ¡Hola!
                </Text>
              </View>
              <View
                className="bubble__tail left-6"
                style={{
                  backgroundColor: colors.surface,
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </View>

            {/* 你好! — right, peach */}
            <View className="absolute -right-1 top-[27%]">
              <View className="bubble bubble--peach" style={shadows.sm}>
                <Text className="bubble__label bubble__label--red">你好!</Text>
              </View>
              <View
                className="bubble__tail left-5"
                style={{
                  backgroundColor: "#FDEEE8",
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </View>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Get Started"
          activeOpacity={0.9}
          onPress={() => router.push("/sign-up")}
          className="btn btn--pill mb-6 h-16"
          style={shadows.card}
        >
          <Text className="btn__label text-h3">Get Started</Text>
          {/* Chevron: a square with two borders, rotated 45°. */}
          <View
            className="absolute right-8 h-2.75 w-2.75"
            style={{
              borderTopWidth: 2.5,
              borderRightWidth: 2.5,
              borderColor: colors.background,
              transform: [{ rotate: "45deg" }],
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
