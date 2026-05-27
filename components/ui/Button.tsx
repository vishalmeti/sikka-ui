import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type TouchableOpacityProps,
} from "react-native";
import { colors, typography, radii, spacing } from "@/lib/theme";

type ButtonVariant = "primary" | "ghost";
type ButtonAccent = "gold" | "teal";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  accent?: ButtonAccent;
}

const accentBackgrounds: Record<ButtonAccent, string> = {
  gold: colors.accentGold,
  teal: colors.accentTeal,
};

/**
 * Full-width tappable button. Variant controls fill vs. outline.
 * Accent controls which brand color is used. Disabled state is inferred
 * from the `disabled` prop — no separate prop needed.
 */
export function Button({
  label,
  variant = "primary",
  accent = "gold",
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      style={[
        styles.base,
        isPrimary
          ? { backgroundColor: disabled ? colors.surface : accentBackgrounds[accent] }
          : styles.ghost,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.label,
          {
            color: isPrimary
              ? disabled
                ? colors.textMuted
                : colors.textOnAccent
              : colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    paddingVertical: spacing["4"],
    paddingHorizontal: spacing["5"],
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: colors.border,
  },
  label: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.snug,
  },
});
