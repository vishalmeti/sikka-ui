import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "@/lib/theme";

interface CoinMarkProps {
  size?: number;
}

/**
 * Sikka brand mark — three concentric rings with the Devanagari glyph "स".
 * Self-contained; knows nothing about layout context.
 */
export function CoinMark({ size = 84 }: CoinMarkProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1.2,
            opacity: 0.4,
          },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: size * 0.71,
            height: size * 0.71,
            borderRadius: (size * 0.71) / 2,
            borderWidth: 1.4,
            opacity: 0.7,
          },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: size * 0.46,
            height: size * 0.46,
            borderRadius: (size * 0.46) / 2,
            borderWidth: 1.6,
          },
        ]}
      />
      <Text style={[styles.glyph, { fontSize: size * 0.24 }]}>स</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderColor: colors.accentGold,
  },
  glyph: {
    fontWeight: typography.weight.semibold,
    color: colors.accentGold,
    letterSpacing: -0.5,
  },
});
