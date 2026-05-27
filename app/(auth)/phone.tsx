import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SK } from "@/lib/tokens";

export default function PhoneScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>

          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <Text style={{ color: SK.textDim, fontSize: 18 }}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.stepLabel}>STEP 1 OF 2</Text>
          </View>

          <View style={styles.inner}>
            {/* Heading */}
            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionLabel}>SIGN IN</Text>
              <Text style={styles.heading}>What's your{"\n"}phone number?</Text>
              <Text style={styles.subtext}>
                We'll text a one-time code. No password to forget.
              </Text>
            </View>

            {/* Phone input */}
            <View style={{ marginTop: 32 }}>
              <View style={styles.inputRow}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryFlag}>🇮🇳</Text>
                  <Text style={styles.countryNum}>+91</Text>
                  <Text style={{ color: SK.muted, fontSize: 10 }}>▾</Text>
                </View>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="98212 47391"
                  placeholderTextColor={SK.muted}
                  keyboardType="phone-pad"
                  style={styles.phoneInput}
                  maxLength={12}
                />
              </View>
              <View style={styles.secureNote}>
                <Text style={{ color: SK.muted, fontSize: 11 }}>🔒</Text>
                <Text style={[styles.secureText, { color: SK.muted }]}>
                  SMS sent over secure DLT route. Standard rates apply.
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }} />

            {/* CTA */}
            <View style={{ paddingBottom: 12 }}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.ctaBtn,
                  {
                    backgroundColor:
                      phone.replace(/\s/g, "").length >= 10
                        ? SK.gold
                        : SK.surface,
                  },
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/(auth)/otp",
                    params: { phone: phone.trim(), role },
                  })
                }
                disabled={phone.replace(/\s/g, "").length < 10}
              >
                <Text
                  style={[
                    styles.ctaBtnText,
                    {
                      color:
                        phone.replace(/\s/g, "").length >= 10
                          ? "#0A0A0F"
                          : SK.muted,
                    },
                  ]}
                >
                  Send code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: SK.bg },
  container: { flex: 1, backgroundColor: SK.bg },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: SK.surface,
    borderWidth: 1,
    borderColor: SK.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: SK.muted,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: 10.5,
    fontWeight: "600",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: SK.muted,
    marginBottom: 12,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: SK.text,
    letterSpacing: -0.6,
    lineHeight: 34,
  },
  subtext: {
    marginTop: 12,
    fontSize: 13,
    color: SK.textDim,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: SK.surface,
    borderWidth: 1,
    borderColor: SK.borderHi,
    borderRadius: 14,
    overflow: "hidden",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 18,
    borderRightWidth: 1,
    borderRightColor: SK.border,
  },
  countryFlag: { fontSize: 18 },
  countryNum: {
    fontWeight: "600",
    fontSize: 16,
    color: SK.text,
    fontVariant: ["tabular-nums"],
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 18,
    fontWeight: "500",
    color: SK.text,
    letterSpacing: 0.5,
    fontVariant: ["tabular-nums"],
  },
  secureNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  secureText: { fontSize: 11.5, flex: 1 },
  ctaBtn: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: SK.border,
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
});
