import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { SK } from "@/lib/tokens";

type Role = "shopper" | "owner";

function RoleCard({
  label,
  sub,
  emoji,
  selected,
  onPress,
}: {
  label: string;
  sub: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.roleCard,
        {
          backgroundColor: selected ? SK.surfaceHi : SK.surface,
          borderColor: selected ? SK.gold : SK.border,
        },
      ]}
    >
      <View
        style={[
          styles.roleIconBox,
          {
            backgroundColor: selected ? SK.goldDim : SK.surface,
            borderColor: selected ? "transparent" : SK.border,
          },
        ]}
      >
        <Text style={{ fontSize: 16 }}>{emoji}</Text>
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[styles.roleLabel, { color: SK.text }]}>{label}</Text>
        <Text style={[styles.roleSub, { color: SK.muted }]}>{sub}</Text>
      </View>
      {selected && (
        <View style={styles.roleCheck}>
          <Text style={{ color: "#0A0A0F", fontSize: 11, fontWeight: "700" }}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function WelcomeScreen() {
  const [role, setRole] = useState<Role>("shopper");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.ambientGlow} pointerEvents="none" />
        <View style={styles.inner}>

          {/* Hero — coin mark + wordmark */}
          <View style={styles.hero}>
            <View style={styles.coinMark}>
              <View style={styles.coinOuter} />
              <View style={styles.coinMid} />
              <View style={styles.coinInner} />
              <Text style={styles.coinGlyph}>स</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 20, gap: 10 }}>
              <Text style={styles.wordmark}>Sikka</Text>
              <Text style={styles.tagline}>
                Loyalty coins from the kirana stores{"\n"}you already shop at.
              </Text>
            </View>
          </View>

          {/* Role picker */}
          <View style={{ marginTop: 44 }}>
            <Text style={styles.sectionLabel}>I AM A…</Text>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
              <RoleCard
                label="Shopper"
                sub={"Earn coins where\nI buy"}
                emoji="👤"
                selected={role === "shopper"}
                onPress={() => setRole("shopper")}
              />
              <RoleCard
                label="Store owner"
                sub={"Run my own\nkirana"}
                emoji="🏪"
                selected={role === "owner"}
                onPress={() => setRole("owner")}
              />
            </View>
          </View>

          <View style={{ flex: 1 }} />

          {/* CTA */}
          <View style={{ gap: 14 }}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.ctaBtn,
                { backgroundColor: role === "owner" ? SK.teal : SK.gold },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/(auth)/phone",
                  params: { role },
                })
              }
            >
              <Text style={styles.ctaBtnText}>Continue with phone  ›</Text>
            </TouchableOpacity>
            <Text style={styles.terms}>
              By continuing you agree to our{" "}
              <Text style={{ color: SK.textDim, textDecorationLine: "underline" }}>
                Terms
              </Text>{" "}
              and{" "}
              <Text style={{ color: SK.textDim, textDecorationLine: "underline" }}>
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const COIN = 84;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: SK.bg },
  container: { flex: 1, backgroundColor: SK.bg },
  ambientGlow: {
    position: "absolute",
    top: -120,
    alignSelf: "center",
    width: 480,
    height: 480,
    borderRadius: 240,
    backgroundColor: SK.goldFaint,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  hero: { alignItems: "center" },
  coinMark: {
    width: COIN,
    height: COIN,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  coinOuter: {
    position: "absolute",
    width: COIN - 0,
    height: COIN - 0,
    borderRadius: COIN / 2,
    borderWidth: 1.2,
    borderColor: SK.gold,
    opacity: 0.4,
  },
  coinMid: {
    position: "absolute",
    width: COIN * 0.71,
    height: COIN * 0.71,
    borderRadius: (COIN * 0.71) / 2,
    borderWidth: 1.4,
    borderColor: SK.gold,
    opacity: 0.7,
  },
  coinInner: {
    position: "absolute",
    width: COIN * 0.46,
    height: COIN * 0.46,
    borderRadius: (COIN * 0.46) / 2,
    borderWidth: 1.6,
    borderColor: SK.gold,
  },
  coinGlyph: {
    fontSize: 20,
    fontWeight: "600",
    color: SK.gold,
    letterSpacing: -0.5,
  },
  wordmark: {
    fontSize: 32,
    fontWeight: "700",
    color: SK.text,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 13,
    color: SK.textDim,
    textAlign: "center",
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: 10.5,
    fontWeight: "600",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: SK.muted,
  },
  roleCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    gap: 10,
  },
  roleIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roleLabel: { fontSize: 14, fontWeight: "600" },
  roleSub: { fontSize: 11.5, lineHeight: 16 },
  roleCheck: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: SK.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBtn: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0A0A0F",
    letterSpacing: -0.2,
  },
  terms: {
    textAlign: "center",
    fontSize: 11,
    color: SK.muted,
    lineHeight: 16,
    paddingHorizontal: 8,
  },
});
