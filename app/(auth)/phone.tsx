import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import type { UserRole } from "@/types/auth";
import { spacing } from "@/lib/theme";
import { ScreenWrapper, AuthTopBar, Button, SectionLabel, Heading, Subtext } from "@/components/ui";
import { PhoneInput } from "@/components/auth";

const MIN_DIGITS = 10;

function isPhoneValid(phone: string): boolean {
  return phone.replace(/\s/g, "").length >= MIN_DIGITS;
}

export default function PhoneScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: UserRole }>();

  function handleSendCode() {
    router.push({ pathname: "/(auth)/otp", params: { phone: phone.trim(), role } });
  }

  return (
    <ScreenWrapper avoidKeyboard>
      <AuthTopBar step="1 of 2" />

      <View style={styles.content}>
        <View style={styles.header}>
          <SectionLabel>Sign in</SectionLabel>
          <Heading>What's your{"\n"}phone number?</Heading>
          <Subtext>We'll text a one-time code. No password to forget.</Subtext>
        </View>

        <View style={styles.inputSection}>
          <PhoneInput value={phone} onChangeText={setPhone} />
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <Button
            label="Send code"
            accent="gold"
            disabled={!isPhoneValid(phone)}
            onPress={handleSendCode}
          />
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
  inputSection: { marginTop: spacing["8"] },
  spacer: { flex: 1 },
  footer: { paddingBottom: spacing["3"] },
});
