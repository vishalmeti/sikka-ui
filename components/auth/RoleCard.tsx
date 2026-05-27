import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import type { UserRole } from "@/types/auth";
import { colors, typography, spacing, radii } from "@/lib/theme";

const ROLE_META: Record<UserRole, { label: string; description: string; emoji: string }> = {
  shopper: {
    label: "Shopper",
    description: "Earn coins where I buy",
    emoji: "👤",
  },
  owner: {
    label: "Store owner",
    description: "Run my own kirana",
    emoji: "🏪",
  },
};

interface RoleCardProps {
  role: UserRole;
  selected: boolean;
  onPress: () => void;
}

/**
 * Selectable card for role choice on the welcome screen.
 * All copy and iconography is derived from role — callers only pass the value.
 */
export function RoleCard({ role, selected, onPress }: RoleCardProps) {
  const { label, description, emoji } = ROLE_META[role];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.card,
        {
          backgroundColor: selected ? colors.surfaceElevated : colors.surface,
          borderColor: selected ? colors.accentGold : colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.iconBox,
          {
            backgroundColor: selected ? colors.accentGoldSubtle : colors.surface,
            borderColor: selected ? "transparent" : colors.border,
          },
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {selected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkGlyph}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing["4"] + 2,
    gap: spacing["2"] + 2,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 16 },
  copy: { gap: 3 },
  label: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  description: {
    fontSize: typography.size.xs + 0.5,
    color: colors.textMuted,
    lineHeight: 16,
  },
  checkmark: {
    position: "absolute",
    top: spacing["3"],
    right: spacing["3"],
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accentGold,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkGlyph: {
    color: colors.textOnAccent,
    fontSize: 11,
    fontWeight: typography.weight.bold,
  },
});
