import { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from "react-native";
import { colors, typography, spacing, radii } from "@/lib/theme";

export const OTP_LENGTH = 6;

interface OtpInputProps {
  code: string[];
  focusedIndex: number;
  onChange: (code: string[], focusedIndex: number) => void;
  /** Suggested code parsed from an SMS (display only — tapping fills boxes). */
  smsSuggestion?: string;
}

function OtpCell({ digit, focused }: { digit: string; focused: boolean }) {
  return (
    <View
      style={[
        styles.cell,
        {
          backgroundColor: focused ? colors.surfaceElevated : colors.surface,
          borderColor: focused
            ? colors.accentGold
            : digit
            ? colors.borderStrong
            : colors.border,
          shadowColor: focused ? colors.accentGold : "transparent",
          shadowOpacity: focused ? 0.25 : 0,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 0 },
        },
      ]}
    >
      {digit ? (
        <Text style={styles.digit}>{digit}</Text>
      ) : focused ? (
        <View style={styles.cursor} />
      ) : null}
    </View>
  );
}

/**
 * Six-box OTP input. Manages focus traversal and backspace internally.
 * Exposes a single `onChange` callback with the updated code array and
 * the new focused index — callers hold state, this component drives it.
 */
export function OtpInput({ code, focusedIndex, onChange, smsSuggestion }: OtpInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  function handleDigitChange(value: string, index: number) {
    if (!value) return;
    const digit = value.slice(-1);
    const next = [...code];
    next[index] = digit;
    const nextFocus = index < OTP_LENGTH - 1 ? index + 1 : index;
    inputRefs.current[nextFocus]?.focus();
    onChange(next, nextFocus);
  }

  function handleKeyPress(
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) {
    if (event.nativeEvent.key !== "Backspace") return;
    const next = [...code];
    if (next[index]) {
      next[index] = "";
      onChange(next, index);
    } else if (index > 0) {
      next[index - 1] = "";
      inputRefs.current[index - 1]?.focus();
      onChange(next, index - 1);
    }
  }

  function applySmsSuggestion() {
    if (!smsSuggestion) return;
    const digits = smsSuggestion.replace(/\s/g, "").slice(0, OTP_LENGTH).split("");
    const padded = [...digits, ...Array(OTP_LENGTH).fill("")].slice(0, OTP_LENGTH);
    onChange(padded, OTP_LENGTH - 1);
  }

  return (
    <View>
      {/* Digit boxes */}
      <View style={styles.row}>
        {code.map((digit, index) => (
          <View key={index} style={styles.cellWrapper}>
            <TextInput
              ref={(ref) => { inputRefs.current[index] = ref; }}
              value={digit}
              onChangeText={(val) => handleDigitChange(val, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => onChange(code, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.hiddenInput}
              caretHidden
            />
            <OtpCell digit={digit} focused={focusedIndex === index} />
          </View>
        ))}
      </View>

      {/* SMS autofill banner */}
      {smsSuggestion ? (
        <View style={styles.autofillBanner}>
          <Text style={styles.autofillIcon}>⚡</Text>
          <Text style={styles.autofillText}>
            From SMS:{" "}
            <Text style={styles.autofillCode}>
              {smsSuggestion.replace(/(\d{3})(\d{3})/, "$1 $2")}
            </Text>
          </Text>
          <TouchableOpacity style={styles.autofillButton} onPress={applySmsSuggestion}>
            <Text style={styles.autofillButtonLabel}>Autofill</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing["2"],
  },
  cellWrapper: { flex: 1 },
  cell: {
    aspectRatio: 1 / 1.15,
    borderRadius: radii.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  digit: {
    fontSize: typography.size["4xl"],
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    fontVariant: ["tabular-nums"],
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: colors.accentGold,
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
    marginTop: spacing["3"] + 2,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["2"] + 2,
    padding: spacing["3"],
    backgroundColor: colors.accentGoldFaint,
    borderWidth: 1,
    borderColor: colors.accentGoldSubtle,
    borderRadius: radii.sm,
  },
  autofillIcon: { color: colors.accentGold, fontSize: 12 },
  autofillText: { flex: 1, fontSize: typography.size.sm, color: colors.textPrimary },
  autofillCode: { fontWeight: typography.weight.bold, letterSpacing: 1 },
  autofillButton: {
    backgroundColor: colors.accentGold,
    paddingHorizontal: spacing["3"],
    paddingVertical: spacing["1"] + 2,
    borderRadius: radii.full,
  },
  autofillButtonLabel: {
    fontSize: typography.size.xs + 0.5,
    fontWeight: typography.weight.semibold,
    color: colors.textOnAccent,
  },
});
