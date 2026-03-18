export interface ICoupon {
  id: string;
  code: string;
  description?: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  maxRedemptions?: number | null;
  startsAt?: string | null;
  expiresAt?: string | null;
  isActive: boolean;
  championshipId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CouponDTO {
  id?: string;
  code: string;
  description?: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  maxRedemptions?: number | null;
  startsAt?: string | null;
  expiresAt?: string | null;
  championshipId: string;
  isActive?: boolean;
}

