export type StoreTier = "gold" | "silver" | "bronze";

export type ActivityKind = "earn" | "redeem" | "bonus";

export interface CustomerStore {
  id: string;
  name: string;
  tier: StoreTier;
  coins: number;
  /** 0–1 fraction representing progress toward the next tier. */
  tierProgress: number;
  visitCount: number;
}

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  storeName: string;
  coinDelta: number;
  label: string;
  timestamp: string;
}
