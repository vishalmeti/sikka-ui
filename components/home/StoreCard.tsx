import { View, Text, StyleSheet } from "react-native";
import type { CustomerStore } from "@/types/home";
import { colors, typography, spacing, radii } from "@/lib/theme";
import { formatIndianNumber } from "@/lib/format";
import { TierRing } from "@/components/ui/TierRing";

interface StoreCardProps {
  store: CustomerStore;
}

/**
 * Horizontally-scrollable card showing a single enrolled store.
 * Displays the store name, coin balance, tier ring, and visit count.
 */
export function StoreCard({ store }: StoreCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.storeIconBox}>
          <Text style={styles.storeEmoji}>🏪</Text>
        </View>
        <TierRing tier={store.tier} progress={store.tierProgress} size={36} />
      </View>

      <View style={styles.body}>
        <Text style={styles.storeName} numberOfLines={1}>
          {store.name}
        </Text>
        <Text style={styles.coinBalance}>
          {formatIndianNumber(store.coins)}
        </Text>
        <Text style={styles.visitLabel}>
          SIKKA • {store.visitCount} VISITS
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 168,
    flexShrink: 0,
    padding: spacing["4"],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    gap: spacing["4"],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  storeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  storeEmoji: { fontSize: 16 },
  body: { gap: spacing["1"] + 2 },
  storeName: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
    marginBottom: spacing["2"],
  },
  coinBalance: {
    fontSize: typography.size["4xl"] + 2,
    fontWeight: typography.weight.semibold,
    color: colors.accentGold,
    letterSpacing: typography.tracking.tightest,
    fontVariant: ["tabular-nums"],
    lineHeight: 34,
  },
  visitLabel: {
    marginTop: spacing["1"] + 2,
    fontSize: typography.size.xxs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.widest,
    color: colors.textMuted,
  },
});
