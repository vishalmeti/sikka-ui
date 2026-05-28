import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { colors, typography, spacing } from "@/lib/theme";
import { HeroBalanceCard, StoreCard, ActivityRow } from "@/components/home";
import { MOCK_BALANCE, MOCK_STORES, MOCK_ACTIVITY } from "@/lib/mocks/home.mock";

export default function HomeScreen() {
  const { userName, streakDays, totalCoins, monthlyProgressFraction } = MOCK_BALANCE;

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar userName={userName} streakDays={streakDays} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <HeroBalanceCard
            totalCoins={totalCoins}
            monthlyProgress={monthlyProgressFraction}
          />
        </View>

        <StoresSection />
        <ActivitySection />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Sub-sections ────────────────────────────────────────────────────────────

function TopBar({ userName, streakDays }: { userName: string; streakDays: number }) {
  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.greetingLabel}>GOOD EVENING</Text>
        <Text style={styles.greetingName}>{userName}</Text>
      </View>
      <View style={styles.topBarActions}>
        <View style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakCount}>{streakDays}</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StoresSection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>YOUR STORES</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>All {MOCK_STORES.length}  ›</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storeList}
      >
        {MOCK_STORES.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </ScrollView>
    </View>
  );
}

function ActivitySection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>ACTIVITY</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>This week  ⌄</Text>
        </TouchableOpacity>
      </View>
      {MOCK_ACTIVITY.map((item, index) => (
        <ActivityRow key={item.id} item={item} showTopBorder={index > 0} />
      ))}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing["8"] },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing["6"],
    paddingTop: spacing["3"],
    paddingBottom: spacing["2"],
  },
  greetingLabel: {
    fontSize: typography.size.xxs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.widest,
    color: colors.textMuted,
  },
  greetingName: {
    fontSize: typography.size.xl + 1,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    letterSpacing: typography.tracking.snug,
    marginTop: 2,
  },
  topBarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["2"] + 2,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["1"],
    paddingHorizontal: spacing["2"] + 2,
    paddingVertical: spacing["1"] + 2,
    backgroundColor: colors.coralSubtle,
    borderRadius: 999,
  },
  streakEmoji: { fontSize: 12 },
  streakCount: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.coral,
    fontVariant: ["tabular-nums"],
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  bellIcon: { fontSize: 16 },

  heroSection: { marginTop: spacing["2"] },

  section: { marginTop: spacing["8"] },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing["6"],
    marginBottom: spacing["3"] + 2,
  },
  sectionLabel: {
    fontSize: typography.size.xxs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.widest,
    color: colors.textMuted,
  },
  seeAllText: {
    fontSize: typography.size.xs + 0.5,
    color: colors.textSecondary,
  },
  storeList: {
    paddingHorizontal: spacing["6"],
    gap: spacing["3"],
  },
});
