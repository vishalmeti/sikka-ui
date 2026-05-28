import { Text } from "react-native";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import { colors, typography, spacing } from "@/lib/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: spacing["1"] + 2,
          paddingTop: spacing["2"],
          height: 60,
        },
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: typography.size.xxs,
          fontWeight: typography.weight.semibold,
          letterSpacing: typography.tracking.wider,
          textTransform: "uppercase",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} /> }}
      />
      <Tabs.Screen
        name="scan"
        options={{ title: "Scan", tabBarIcon: ({ focused }) => <TabIcon emoji="⬛" focused={focused} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "You", tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} /> }}
      />
    </Tabs>
  );
}

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>;
}
