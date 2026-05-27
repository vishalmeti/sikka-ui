import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, typography, spacing, radii } from "@/lib/theme";

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const COUNTRY_CODE = "+91";
const COUNTRY_FLAG = "🇮🇳";
const PHONE_PLACEHOLDER = "98212 47391";
const MAX_LENGTH = 12;

/**
 * Phone number field with a fixed India country-code prefix.
 * Caller owns only the raw number string; masking and formatting happen here.
 */
export function PhoneInput({ value, onChangeText }: PhoneInputProps) {
  return (
    <View>
      <View style={styles.inputRow}>
        <View style={styles.countryPrefix}>
          <Text style={styles.flag}>{COUNTRY_FLAG}</Text>
          <Text style={styles.code}>{COUNTRY_CODE}</Text>
          <Text style={styles.chevron}>▾</Text>
        </View>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={PHONE_PLACEHOLDER}
          placeholderTextColor={colors.textMuted}
          keyboardType="phone-pad"
          maxLength={MAX_LENGTH}
          style={styles.input}
          autoFocus
        />
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintIcon}>🔒</Text>
        <Text style={styles.hintText}>
          SMS sent over secure DLT route. Standard rates apply.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radii.lg,
    overflow: "hidden",
  },
  countryPrefix: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["1"] + 2,
    paddingHorizontal: spacing["3"] + 2,
    paddingVertical: spacing["4"] + 2,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  flag: { fontSize: 18 },
  code: {
    fontWeight: typography.weight.semibold,
    fontSize: typography.size.xl,
    color: colors.textPrimary,
    fontVariant: ["tabular-nums"],
  },
  chevron: { color: colors.textMuted, fontSize: 10 },
  input: {
    flex: 1,
    paddingHorizontal: spacing["4"],
    paddingVertical: spacing["4"] + 2,
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
    letterSpacing: typography.tracking.wide,
    fontVariant: ["tabular-nums"],
  },
  hint: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["1"] + 2,
    marginTop: spacing["2"] + 2,
  },
  hintIcon: { fontSize: 11 },
  hintText: {
    fontSize: typography.size.xs + 0.5,
    color: colors.textMuted,
    flex: 1,
  },
});
