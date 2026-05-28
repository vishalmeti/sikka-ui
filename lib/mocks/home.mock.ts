import type { CustomerStore, ActivityItem } from "@/types/home";

export const MOCK_STORES: CustomerStore[] = [
  { id: "1", name: "Ramesh Stores",    tier: "gold",   coins: 847,  tierProgress: 0.85, visitCount: 12 },
  { id: "2", name: "Sharma Kirana",    tier: "silver", coins: 312,  tierProgress: 0.62, visitCount: 7  },
  { id: "3", name: "Patel General",    tier: "silver", coins: 188,  tierProgress: 0.38, visitCount: 4  },
  { id: "4", name: "Anand Provisions", tier: "bronze", coins: 64,   tierProgress: 0.32, visitCount: 2  },
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "a1", kind: "earn",   storeName: "Ramesh Stores",    coinDelta: 47,  label: "₹235 spent",        timestamp: "Today, 6:42 PM"        },
  { id: "a2", kind: "earn",   storeName: "Sharma Kirana",    coinDelta: 22,  label: "₹110 spent",        timestamp: "Yesterday, 8:11 PM"    },
  { id: "a3", kind: "redeem", storeName: "Ramesh Stores",    coinDelta: 200, label: "₹40 discount",      timestamp: "Yesterday, 12:30 PM"   },
  { id: "a4", kind: "earn",   storeName: "Patel General",    coinDelta: 35,  label: "₹175 spent",        timestamp: "Mon, 7:24 PM"          },
  { id: "a5", kind: "bonus",  storeName: "Ramesh Stores",    coinDelta: 100, label: "5-visit milestone", timestamp: "Sun, 5:18 PM"          },
];

export const MOCK_BALANCE = {
  totalCoins: 1247,
  monthlyProgressFraction: 0.68,
  streakDays: 14,
  userName: "Aarav",
};
