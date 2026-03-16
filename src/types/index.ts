export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: 'email' | 'sms' | 'whatsapp';
  status: 'draft' | 'scheduled' | 'sent' | 'completed' | 'failed';
  audienceCount: number;
  creditsUsed: number;
  sentAt?: string;
  scheduledAt?: string;
  createdAt: string;
  stats?: CampaignStats;
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  openRate: number;
  clickRate: number;
}

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  label: string;
  popular?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  contacts: number;
  features: string[];
  popular?: boolean;
}

export interface DesignTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  type: 'email' | 'instagram' | 'whatsapp';
}

export interface AnalyticsOverview {
  totalCustomers: number;
  campaignsSent: number;
  creditsRemaining: number;
  successRate: number;
  totalReach: number;
  openRate: number;
  chartData: Array<{ month: string; sent: number; opened: number; clicked: number }>;
  channelData: Array<{ name: string; value: number; color: string }>;
}

export interface CreditHistory {
  id: string;
  type: 'purchase' | 'usage';
  amount: number;
  description: string;
  date: string;
}
