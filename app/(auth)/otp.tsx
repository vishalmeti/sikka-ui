import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SK } from "@/lib/tokens";

const OTP_LENGTH = 6;

function OtpBox({
  digit,
  focused,
}: {
  digit: string;
  focused: boolean;
}) {
  return (
    <View
      style={[
        styles.otpBox,
        {
          backgroundColor: focused ? SK.surfaceHi : SK.surface,
          borderColor: focused ? SK.gold : digit ? SK.borderHi : SK.border,
          shadowColor: focused ? SK.gold : "transparent",
          shadowOpacity: focused ? 0.25 : 0,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 0 },
          elevation: 0,
        },
      ]}
    >
      {digit ? (
        <Text style={styles.otpDigit}>{digit}</Text>
      ) : focused ? (
        <View style={styles.cursor} />
      ) : null}
    </View>
  );
}

export default function OtpScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const { phone, role } = useLocalSearchParams<{ phone: string; role: string }>();

  function handleChange(val: string, idx: number) {
    if (!val) return;
    const digit = val.slice(-1);
    const next = [...code];
    next[idx] = digit;
    setCode(next);
    if (idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
      setFocusedIdx(idx + 1);
    }
  }

  function handleKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) {
    if (e.nativeEvent.key === "Backspace") {
      const next = [...code];
      if (next[idx]) {
        next[idx] = "";
        setCode(next);
      } else if (idx > 0) {
        next[idx - 1] = "";
        setCode(next);
        inputs.current[idx - 1]?.focus();
        setFocusedIdx(idx - 1);
      }
    }
  }

  const maskedPhone = phone
    ? `+91 ${phone.slice(0, 2)}••• •• ${phone.slice(-4)}`
    : "+91 •••• •• ••••";

  const filled = code.filter(Boolean).length;

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
            <Text style={styles.stepLabel}>STEP 2 OF 2</Text>
          </View>

          <View style={styles.inner}>
            {/* Heading */}
            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionLabel}>VERIFY</Text>
              <Text style={styles.heading}>Enter the 6-digit{"\n"}code we sent</Text>
              <View style={styles.sentRow}>
                <Text style={{ fontSize: 13, color: SK.textDim }}>Sent to</Text>
                <Text style={[styles.sentPhone]}>{maskedPhone}</Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.changeLink}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* OTP boxes */}
            <View style={styles.otpRow}>
              {code.map((d, i) => (
                <View key={i} style={{ flex: 1 }}>
                  <TextInput
                    ref={(r) => { inputs.current[i] = r; }}
                    value={d}
                    onChangeText={(val) => handleChange(val, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    onFocus={() => setFocusedIdx(i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.hiddenInput}
                    caretHidden
                  />
                  <OtpBox digit={d} focused={focusedIdx === i} />
                </View>
              ))}
            </View>

            {/* Autofill hint */}
            <View style={styles.autofillBanner}>
              <Text style={{ color: SK.gold, fontSize: 12 }}>⚡</Text>
              <Text style={[styles.autofillText, { flex: 1 }]}>
                From SMS:{" "}
                <Text style={{ fontWeight: "700", letterSpacing: 1 }}>482 614</Text>
              </Text>
              <TouchableOpacity
                style={styles.autofillBtn}
                onPress={() => setCode(["4", "8", "2", "6", "1", "4"])}
              >
                <Text style={styles.autofillBtnText}>Autofill</Text>
              </TouchableOpacity>
            </View>

            {/* Resend */}
            <View style={styles.resendRow}>
              <Text style={styles.resendHint}>Didn't get the code?</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text style={[styles.resendHint, { color: SK.textDim }]}>Resend in</Text>
                <Text style={styles.resendTimer}>0:24</Text>
              </View>
            </View>

            <View style={{ flex: 1 }} />

            {/* CTA */}
            <View style={{ paddingBottom: 12, gap: 12 }}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.ctaBtn,
                  {
                    backgroundColor: filled === OTP_LENGTH ? SK.gold : SK.surface,
                    borderColor: filled === OTP_LENGTH ? SK.gold : SK.border,
                  },
                ]}
                disabled={filled < OTP_LENGTH}
              >
                <Text
                  style={[
                    styles.ctaBtnText,
                    { color: filled === OTP_LENGTH ? "#0A0A0F" : SK.muted },
                  ]}
                >
                  Verify and continue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.troubleBtn}>
                <Text style={{ color: SK.muted, fontSize: 12 }}>🔒</Text>
                <Text style={styles.troubleText}>Trouble signing in?</Text>
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
  sentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
  sentPhone: {
    fontWeight: "500",
    fontSize: 13,
    color: SK.text,
    fontVariant: ["tabular-nums"],
  },
  changeLink: {
    fontSize: 12.5,
    fontWeight: "500",
    color: SK.gold,
  },
  otpRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 32,
  },
  otpBox: {
    aspectRatio: 1 / 1.15,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  otpDigit: {
    fontSize: 26,
    fontWeight: "600",
    color: SK.text,
    fontVariant: ["tabular-nums"],
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: SK.gold,
    borderRadius: 1,
    opacity: 0.8,
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    zIndex: 1,
  },
  autofillBanner: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    backgroundColor: SK.goldFaint,
    borderWidth: 1,
    borderColor: SK.goldDim,
    borderRadius: 10,
  },
  autofillText: { fontSize: 12, color: SK.text },
  autofillBtn: {
    backgroundColor: SK.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  autofillBtnText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#0A0A0F",
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
  },
  resendHint: { fontSize: 12.5, color: SK.muted },
  resendTimer: {
    fontSize: 12.5,
    fontWeight: "600",
    color: SK.text,
    fontVariant: ["tabular-nums"],
  },
  ctaBtn: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  troubleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 4,
  },
  troubleText: { fontSize: 12.5, color: SK.textDim },
});
