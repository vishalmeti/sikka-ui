import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/stores/auth";

import type { UserRole } from "@/types/auth";
import { colors, typography, spacing } from "@/lib/theme";
import { ScreenWrapper, AuthTopBar, Button, SectionLabel, Heading } from "@/components/ui";
import { OtpInput, OTP_LENGTH } from "@/components/auth";

/** Masks all but last 4 digits: "+91 98••• •• 7391" */
function maskPhone(phone: string): string {
  if (!phone || phone.length < 4) return phone;
  const last4 = phone.slice(-4);
  return `+91 ${phone.slice(0, 2)}••• •• ${last4}`;
}

export default function OtpScreen() {
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string; role: UserRole }>();

  const filledCount = code.filter(Boolean).length;
  const isComplete = filledCount === OTP_LENGTH;
  const { setToken } = useAuthStore();

  async function handleBypassVerify() {
    // TODO: replace with real authApi.verifyOtp call once backend is ready
    const devToken = "dev-bypass-token";
    await AsyncStorage.setItem("auth_token", devToken);
    setToken(devToken);
    router.replace("/(tabs)");
  }

  function handleCodeChange(nextCode: string[], nextFocus: number) {
    setCode(nextCode);
    setFocusedIndex(nextFocus);
  }

  return (
    <ScreenWrapper avoidKeyboard>
      <AuthTopBar step="2 of 2" />

      <View style={styles.content}>
        <View style={styles.header}>
          <SectionLabel>Verify</SectionLabel>
          <Heading>Enter the 6-digit{"\n"}code we sent</Heading>
          <View style={styles.sentRow}>
            <Text style={styles.sentLabel}>Sent to</Text>
            <Text style={styles.sentPhone}>{maskPhone(phone ?? "")}</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.changeLink}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.otpSection}>
          <OtpInput
            code={code}
            focusedIndex={focusedIndex}
            onChange={handleCodeChange}
            smsSuggestion="482614"
          />
        </View>

        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't get the code?</Text>
          <View style={styles.timerRow}>
            <Text style={styles.resendLabel}>Resend in</Text>
            <Text style={styles.timer}>0:24</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <Button
            label="Verify and continue"
            accent="gold"
            disabled={!isComplete}
            onPress={handleBypassVerify}
          />
          <TouchableOpacity style={styles.troubleButton}>
            <Text style={styles.troubleIcon}>🔒</Text>
            <Text style={styles.troubleLabel}>Trouble signing in?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing["6"],
    paddingBottom: spacing["5"],
  },
  header: { marginTop: spacing["3"] },
  sentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["2"],
    marginTop: spacing["3"],
    flexWrap: "wrap",
  },
  sentLabel: { fontSize: typography.size.base, color: colors.textSecondary },
  sentPhone: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
    fontVariant: ["tabular-nums"],
  },
  changeLink: {
    fontSize: typography.size.sm + 0.5,
    fontWeight: typography.weight.medium,
    color: colors.accentGold,
  },
  otpSection: { marginTop: spacing["8"] },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing["7"],
  },
  timerRow: { flexDirection: "row", alignItems: "center", gap: spacing["1"] + 2 },
  resendLabel: { fontSize: typography.size.sm + 0.5, color: colors.textMuted },
  timer: {
    fontSize: typography.size.sm + 0.5,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    fontVariant: ["tabular-nums"],
  },
  spacer: { flex: 1 },
  footer: { paddingBottom: spacing["3"], gap: spacing["3"] },
  troubleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["1"] + 2,
    paddingVertical: spacing["1"],
  },
  troubleIcon: { fontSize: typography.size.sm },
  troubleLabel: { fontSize: typography.size.sm + 0.5, color: colors.textSecondary },
});
