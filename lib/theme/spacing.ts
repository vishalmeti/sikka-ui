/**
 * Spacing scale — 4-pt base grid.
 * Use these everywhere; no raw numbers in component files.
 */
export const spacing = {
  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
  "11": 44,
} as const;

export type Spacing = typeof spacing;
