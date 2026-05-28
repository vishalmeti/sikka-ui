import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import type { StoreTier } from "@/types/home";
import { colors, typography } from "@/lib/theme";

const TIER_COLOR: Record<StoreTier, string> = {
  gold:   colors.accentGold,
  silver: colors.silver,
  bronze: "#C57B3D",
};

const TIER_LABEL: Record<StoreTier, string> = {
  gold: "G",
  silver: "S",
  bronze: "B",
};

interface TierRingProps {
  tier: StoreTier;
  /** 0–1 fill fraction. */
  progress: number;
  size?: number;
}

/**
 * Thin circular progress ring showing tier colour and a single-letter label.
 * Used on store cards and the wallet screen.
 */
export function TierRing({ tier, progress, size = 36 }: TierRingProps) {
  const strokeWidth = 1.5;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const fillColor = TIER_COLOR[tier];

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {/* Track */}
        <Circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke={colors.border}
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <Circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={styles.label}>
        <Text style={[styles.labelText, { color: fillColor }]}>
          {TIER_LABEL[tier]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
});
