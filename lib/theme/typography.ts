/**
 * Type scale — font sizes, weights, line heights, letter spacing.
 * All values are design-system constants; nothing is hardcoded in components.
 */
export const typography = {
  // Font families
  fontSans: "Inter, system-ui, sans-serif" as const,
  fontMono: "SpaceGrotesk_600SemiBold, Inter, sans-serif" as const,

  // Size scale (sp / pt — unitless for React Native)
  size: {
    xxs: 10.5,
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 15,
    xl: 16,
    "2xl": 18,
    "3xl": 20,
    "4xl": 26,
    "5xl": 28,
    "6xl": 32,
  },

  // Weight map
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
  },

  // Letter spacing (em-like — used directly in RN style)
  tracking: {
    tightest: -1,
    tight: -0.6,
    snug: -0.2,
    normal: 0,
    wide: 0.5,
    wider: 1.4,
    widest: 1.6,
  },
} as const;

export type Typography = typeof typography;
