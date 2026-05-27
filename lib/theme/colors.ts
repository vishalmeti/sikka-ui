/**
 * Primitive palette — raw hex/rgba values.
 * Nothing outside this file should reference raw color strings.
 */
const palette = {
  // Neutrals
  ink100: "#0A0A0F",
  ink200: "#13131A",
  ink300: "#1A1A22",
  ink400: "#6B6A72",
  ink500: "#B8B8C0",

  // Cream (foreground on dark)
  cream: "#F0EFE9",
  creamAlpha62: "rgba(240,239,233,0.62)",
  creamAlpha10: "rgba(240,239,233,0.10)",
  creamAlpha06: "rgba(240,239,233,0.06)",

  // Brand — Gold
  gold: "#C9A84C",
  goldAlpha18: "rgba(201,168,76,0.18)",
  goldAlpha08: "rgba(201,168,76,0.08)",

  // Brand — Teal
  teal: "#4C9A84",
  tealAlpha18: "rgba(76,154,132,0.18)",

  // Semantic
  coral: "#FF5C3A",
  coralAlpha16: "rgba(255,92,58,0.16)",
  success: "#3DDC84",

  // On-brand text (dark bg on gold/teal buttons)
  onAccent: "#0A0A0F",
} as const;

/**
 * Semantic color tokens — what screens and components reference.
 * Rename palette entries here when redesigning; consumers are untouched.
 */
export const colors = {
  // Backgrounds
  background: palette.ink100,
  surface: palette.ink200,
  surfaceElevated: palette.ink300,

  // Borders
  border: palette.creamAlpha06,
  borderStrong: palette.creamAlpha10,

  // Accent
  accentGold: palette.gold,
  accentGoldSubtle: palette.goldAlpha18,
  accentGoldFaint: palette.goldAlpha08,
  accentTeal: palette.teal,
  accentTealSubtle: palette.tealAlpha18,

  // Text
  textPrimary: palette.cream,
  textSecondary: palette.creamAlpha62,
  textMuted: palette.ink400,
  textOnAccent: palette.onAccent,

  // Status
  coral: palette.coral,
  coralSubtle: palette.coralAlpha16,
  success: palette.success,
  silver: palette.ink500,
} as const;

export type Colors = typeof colors;
