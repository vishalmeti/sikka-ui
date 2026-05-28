import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors, typography, spacing, radii } from "@/lib/theme";
import { formatIndianNumber, formatRupees, coinsToRupees } from "@/lib/format";

interface HeroBalanceCardProps {
  totalCoins: number;
  /** 0–1 fraction of monthly target completed. */
  monthlyProgress: number;
}

const ARC_SIZE = 280;
const ARC_RADIUS = 130;
const ARC_STROKE = 1.5;
const ARC_CENTER = ARC_SIZE / 2;
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS;

function ProgressArc({ progress }: { progress: number }) {
  return (
    <Svg
      width={ARC_SIZE}
      height={ARC_SIZE}
      style={[StyleSheet.absoluteFill, styles.arc]}
    >
      <Circle
        cx={ARC_CENTER} cy={ARC_CENTER} r={ARC_RADIUS}
        fill="none"
        stroke={colors.border}
        strokeWidth={ARC_STROKE}
      />
      <Circle
        cx={ARC_CENTER} cy={ARC_CENTER} r={ARC_RADIUS}
        fill="none"
        stroke={colors.accentGold}
        strokeWidth={ARC_STROKE}
        strokeDasharray={ARC_CIRCUMFERENCE}
        strokeDashoffset={ARC_CIRCUMFERENCE * (1 - progress)}
        strokeLinecap="round"
        rotation={-90}
        origin={`${ARC_CENTER}, ${ARC_CENTER}`}
      />
    </Svg>
  );
}

/**
 * Full-width hero card on the home screen.
 * Shows total coin balance, rupee equivalent, and a circular monthly-progress arc.
 */
export function HeroBalanceCard({ totalCoins, monthlyProgress }: HeroBalanceCardProps) {
  const rupeeValue = formatRupees(coinsToRupees(totalCoins));
  const progressPercent = Math.round(monthlyProgress * 100);

  return (
    <View style={styles.card}>
      {/* Gold radial glow */}
      <View style={styles.glowLayer} pointerEvents="none" />

      {/* Shimmer band */}
      <View style={styles.shimmerBand} pointerEvents="none" />

      {/* Progress arc — centred behind the text block */}
      <View style={styles.arcContainer}>
        <ProgressArc progress={monthlyProgress} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.balanceLabel}>TOTAL SIKKA BALANCE</Text>

        <Text style={styles.balanceNumber}>{formatIndianNumber(totalCoins)}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{rupeeValue}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{progressPercent}% of monthly target</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing["6"],
    paddingTop: spacing["10"],
    paddingBottom: spacing["8"],
    paddingHorizontal: spacing["6"],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xl,
    overflow: "hidden",
  },
  glowLayer: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.accentGoldFaint,
    borderRadius: radii.xl,
  },
  shimmerBand: {
    position: "absolute",
    left: "-10%",
    right: "-10%",
    top: "38%",
    height: 80,
    backgroundColor: colors.accentGoldFaint,
    transform: [{ rotate: "-6deg" }],
  },
  arcContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    marginTop: -(ARC_SIZE / 2),
    width: ARC_SIZE,
    height: ARC_SIZE,
    opacity: 0.9,
  },
  arc: {
    alignSelf: "center",
  },
  content: {
    alignItems: "center",
    gap: spacing["1"],
  },
  balanceLabel: {
    fontSize: typography.size.xxs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.widest,
    color: colors.textMuted,
    marginBottom: spacing["4"] + 2,
  },
  balanceNumber: {
    fontSize: 68,
    fontWeight: typography.weight.semibold,
    color: colors.accentGold,
    letterSpacing: typography.tracking.tightest,
    fontVariant: ["tabular-nums"],
    lineHeight: 76,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["1"] + 2,
    marginTop: spacing["3"] + 2,
  },
  metaText: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    fontVariant: ["tabular-nums"],
  },
  metaDot: {
    fontSize: typography.size.base,
    color: colors.textMuted,
  },
});
