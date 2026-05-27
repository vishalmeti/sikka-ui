export interface Store {
  id: string;
  name: string;
  owner_id: string;
  upi_id: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface LoyaltyPoints {
  id: string;
  user_id: string;
  store_id: string;
  points: number;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  store_id: string;
  amount: number;
  points_earned: number;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    phone?: string;
  };
}
