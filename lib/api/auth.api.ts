import type { UserRole } from "@/types/auth";
import client from "./client";

export interface RequestOtpPayload {
  phone: string;
  role: UserRole;
}

export interface RequestOtpResponse {
  sessionId: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
  sessionId: string;
}

export interface VerifyOtpResponse {
  token: string;
  user: {
    id: string;
    phone: string;
    role: UserRole;
  };
}

export const authApi = {
  requestOtp: (payload: RequestOtpPayload) =>
    client.post<RequestOtpResponse>("/auth/otp/request", payload),

  verifyOtp: (payload: VerifyOtpPayload) =>
    client.post<VerifyOtpResponse>("/auth/otp/verify", payload),
};
