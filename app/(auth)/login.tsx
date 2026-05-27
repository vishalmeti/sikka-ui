import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import type { UserRole } from "@/types/auth";
import { colors, typography, spacing } from "@/lib/theme";
import { ScreenWrapper, Button, SectionLabel } from "@/components/ui";
import { CoinMark, RoleCard } from "@/components/auth";

export default function WelcomeScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("shopper");
  const router = useRouter();

  function handleContinue() {
    router.push({ pathname: "/(auth)/phone", params: { role: selectedRole } });
  }

  return (
    <ScreenWrapper>
      <View style={styles.ambientGlow} pointerEvents="none" />

      <View style={styles.content}>
        {/* Brand hero */}
        <View style={styles.hero}>
          <CoinMark size={84} />
          <View style={styles.wordmarkBlock}>
            <Text style={styles.wordmark}>Sikka</Text>
            <Text style={styles.tagline}>
              Loyalty coins from the kirana stores{"\n"}you already shop at.
            </Text>
          </View>
        </View>

        {/* Role selection */}
        <View style={styles.roleSection}>
          <SectionLabel>I am a…</SectionLabel>
          <View style={styles.roleRow}>
            <RoleCard
              role="shopper"
              selected={selectedRole === "shopper"}
              onPress={() => setSelectedRole("shopper")}
            />
            <RoleCard
              role="owner"
              selected={selectedRole === "owner"}
              onPress={() => setSelectedRole("owner")}
            />
          </View>
        </View>

        <View style={styles.spacer} />

        {/* Footer CTA */}
        <View style={styles.footer}>
          <Button
            label="Continue with phone  ›"
            accent={selectedRole === "owner" ? "teal" : "gold"}
            onPress={handleContinue}
          />
          <Text style={styles.termsText}>
            By continuing you agree to our{" "}
            <Text style={styles.termsLink}>Terms</Text>
            {" "}and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  ambientGlow: {
    position: "absolute",
    top: -120,
    alignSelf: "center",
    width: 480,
    height: 480,
    borderRadius: 240,
    backgroundColor: colors.accentGoldFaint,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing["6"],
    paddingTop: spacing["10"],
    paddingBottom: spacing["5"],
  },
  hero: { alignItems: "center" },
  wordmarkBlock: { alignItems: "center", marginTop: spacing["5"], gap: spacing["2"] + 2 },
  wordmark: {
    fontSize: typography.size["6xl"],
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    letterSpacing: typography.tracking.tightest,
  },
  tagline: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  roleSection: { marginTop: spacing["11"] },
  roleRow: { flexDirection: "row", gap: spacing["2"] + 2, marginTop: spacing["3"] },
  spacer: { flex: 1 },
  footer: { gap: spacing["3"] + 2 },
  termsText: {
    textAlign: "center",
    fontSize: typography.size.xs,
    color: colors.textMuted,
    lineHeight: 16,
    paddingHorizontal: spacing["2"],
  },
  termsLink: {
    color: colors.textSecondary,
    textDecorationLine: "underline",
  },
});
