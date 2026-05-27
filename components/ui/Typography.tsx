import { Text, StyleSheet, type TextProps } from "react-native";
import { colors, typography, spacing } from "@/lib/theme";

/** Tiny all-caps label used above headings and sections. */
export function SectionLabel({ style, ...props }: TextProps) {
  return <Text style={[styles.sectionLabel, style]} {...props} />;
}

/** Primary screen heading — large, tight tracking. */
export function Heading({ style, ...props }: TextProps) {
  return <Text style={[styles.heading, style]} {...props} />;
}

/** Secondary body text below headings. */
export function Subtext({ style, ...props }: TextProps) {
  return <Text style={[styles.subtext, style]} {...props} />;
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: typography.size.xxs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.widest,
    textTransform: "uppercase",
    color: colors.textMuted,
    marginBottom: spacing["3"],
  },
  heading: {
    fontSize: typography.size["5xl"],
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    letterSpacing: typography.tracking.tight,
    lineHeight: 34,
  },
  subtext: {
    marginTop: spacing["3"],
    fontSize: typography.size.base,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
