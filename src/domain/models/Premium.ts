export interface PremiumSubscription {
  id: string;
  userId: string;
  plan: PremiumPlan;
  status: 'active' | 'cancelled' | 'expired';
  startDate: number;
  endDate: number;
  renewalDate?: number;
  paymentMethod?: string;
  features: PremiumFeature[];
}

export type PremiumPlan = 'monthly' | 'yearly' | 'lifetime';

export interface PremiumFeature {
  name: string;
  enabled: boolean;
  description: string;
}

export interface PremiumBenefits {
  verifiedBadge: boolean;
  customThemes: boolean;
  largerFileUploads: boolean;
  moreGroupMembers: boolean;
  longerStatusDuration: boolean;
  multiDeviceSupport: boolean;
}
