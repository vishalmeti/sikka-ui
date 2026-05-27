export type UserRole = "shopper" | "owner";

export interface AuthRouteParams {
  role: UserRole;
  phone?: string;
  sessionId?: string;
}
