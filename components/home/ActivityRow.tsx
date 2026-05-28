import { View, Text, StyleSheet } from "react-native";
import type { ActivityItem, ActivityKind } from "@/types/home";
import { colors, typography, spacing, radii } from "@/lib/theme";
import { formatIndianNumber } from "@/lib/format";

const KIND_META: Record<
  ActivityKind,
  { label: string; sign: "+" | "−"; color: string; emoji: string }
> = {
  earn:   { label: "Earn",   sign: "+", color: colors.accentGold, emoji: "↗" },
  redeem: { label: "Redeem", sign: "−", color: colors.accentTeal, emoji: "↙" },
  bonus:  { label: "Bonus",  sign: "+", color: colors.accentGold, emoji: "⚡" },
};

interface ActivityRowProps {
  item: ActivityItem;
  showTopBorder?: boolean;
}

/**
 * Single row in the activity feed. Derives all presentation from `ActivityKind`
 * — the parent only passes the data item.
 */
export function ActivityRow({ item, showTopBorder = true }: ActivityRowProps) {
  const { label, sign, color, emoji } = KIND_META[item.kind];

  return (
    <View style={[styles.row, showTopBorder && styles.topBorder]}>
      <View style={[styles.iconBox, { borderColor: colors.border }]}>
        <Text style={[styles.icon, { color }]}>{emoji}</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.storeName} numberOfLines={1}>{item.storeName}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.kindLabel}>{label}</Text>
          <View style={styles.dot} />
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={[styles.delta, { color }]}>
          {sign}{formatIndianNumber(item.coinDelta)}
        </Text>
        <Text style={styles.subLabel}>{item.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["3"] + 2,
    paddingVertical: spacing["3"] + 2,
    paddingHorizontal: spacing["6"],
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  icon: { fontSize: 14 },
  middle: { flex: 1, minWidth: 0, gap: 2 },
  storeName: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: spacing["1"] + 2 },
  kindLabel: { fontSize: typography.size.xs + 0.5, color: colors.textMuted },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.textMuted,
  },
  timestamp: { fontSize: typography.size.xs + 0.5, color: colors.textMuted },
  right: { alignItems: "flex-end", gap: 2 },
  delta: {
    fontSize: typography.size.xl + 1,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.snug,
    fontVariant: ["tabular-nums"],
    lineHeight: 22,
  },
  subLabel: {
    fontSize: typography.size.xxs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.wider,
    textTransform: "uppercase",
    color: colors.textMuted,
  },
});
