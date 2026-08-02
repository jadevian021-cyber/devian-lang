import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6">
      <Text className="type-h2 text-center text-primary">Lingua</Text>

      <Link href="/onboarding" className="type-h4 text-primary">
        Open onboarding
      </Link>
    </View>
  );
}
