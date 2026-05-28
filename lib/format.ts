/** Format a number with Indian locale grouping: 1,00,000 */
export function formatIndianNumber(value: number): string {
  return value.toLocaleString("en-IN");
}

/** Format as Indian rupees: ₹1,00,000 */
export function formatRupees(value: number): string {
  return "₹" + formatIndianNumber(value);
}

/** Approximate coin-to-rupee conversion (1 coin ≈ ₹0.20) */
export function coinsToRupees(coins: number): number {
  return Math.floor(coins * 0.2);
}
