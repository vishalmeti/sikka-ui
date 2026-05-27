import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors, typography, spacing, radii } from "@/lib/theme";

interface AuthTopBarProps {
  /** e.g. "1 of 2" — rendered as "STEP 1 OF 2" */
  step: string;
}

/**
 * Top chrome shared by every step in the auth flow: back chevron + step label.
 */
export function AuthTopBar({ step }: AuthTopBarProps) {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.chevron}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.stepLabel}>STEP {step.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing["6"],
    paddingTop: spacing["3"],
    paddingBottom: spacing["2"],
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  chevron: {
    color: colors.textSecondary,
    fontSize: typography.size["2xl"],
    lineHeight: 24,
  },
  stepLabel: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.wider,
    color: colors.textMuted,
  },
});
