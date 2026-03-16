import type { Customer, Campaign, AnalyticsOverview, CreditHistory, DesignTemplate } from '@/types';

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '5551234567', countryCode: '+1', gender: 'female', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Mike Chen', email: 'mike@example.com', phone: '5559876543', countryCode: '+1', gender: 'male', status: 'active', createdAt: '2024-02-01' },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', phone: '5555678901', countryCode: '+1', gender: 'female', status: 'active', createdAt: '2024-02-15' },
  { id: '4', name: 'James Wilson', email: 'james@example.com', phone: '5553456789', countryCode: '+44', gender: 'male', status: 'inactive', createdAt: '2024-03-01' },
  { id: '5', name: 'Priya Patel', email: 'priya@example.com', phone: '9876543210', countryCode: '+91', gender: 'female', status: 'active', createdAt: '2024-03-10' },
  { id: '6', name: 'Alex Rivera', email: 'alex@example.com', phone: '5554567890', countryCode: '+1', gender: 'other', status: 'active', createdAt: '2024-03-20' },
  { id: '7', name: 'Tomoko Sato', email: 'tomoko@example.com', phone: '9012345678', countryCode: '+81', gender: 'female', status: 'active', createdAt: '2024-04-05' },
  { id: '8', name: 'Daniel Brown', email: 'daniel@example.com', phone: '5556789012', countryCode: '+1', gender: 'male', status: 'inactive', createdAt: '2024-04-15' },
];

export const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Spring Sale Blast', channel: 'email', status: 'completed', audienceCount: 2450, creditsUsed: 2450, sentAt: '2024-03-01', createdAt: '2024-02-28', stats: { sent: 2450, delivered: 2380, opened: 1190, clicked: 476, failed: 70, openRate: 50, clickRate: 20 } },
  { id: '2', name: 'Flash Deal SMS', channel: 'sms', status: 'completed', audienceCount: 1200, creditsUsed: 2400, sentAt: '2024-03-15', createdAt: '2024-03-14', stats: { sent: 1200, delivered: 1180, opened: 944, clicked: 354, failed: 20, openRate: 80, clickRate: 30 } },
  { id: '3', name: 'New Arrivals WhatsApp', channel: 'whatsapp', status: 'sent', audienceCount: 800, creditsUsed: 2400, sentAt: '2024-04-01', createdAt: '2024-03-30', stats: { sent: 800, delivered: 790, opened: 711, clicked: 316, failed: 10, openRate: 90, clickRate: 40 } },
  { id: '4', name: 'Summer Collection Email', channel: 'email', status: 'scheduled', audienceCount: 3200, creditsUsed: 3200, scheduledAt: '2024-05-01', createdAt: '2024-04-20' },
  { id: '5', name: 'Weekend Promo', channel: 'sms', status: 'draft', audienceCount: 0, creditsUsed: 0, createdAt: '2024-04-25' },
];

export const mockAnalytics: AnalyticsOverview = {
  totalCustomers: 8420,
  campaignsSent: 24,
  creditsRemaining: 4250,
  successRate: 94.5,
  totalReach: 45200,
  openRate: 68.4,
  chartData: [
    { month: 'Jan', sent: 1200, opened: 840, clicked: 360 },
    { month: 'Feb', sent: 1800, opened: 1260, clicked: 540 },
    { month: 'Mar', sent: 2400, opened: 1680, clicked: 720 },
    { month: 'Apr', sent: 3200, opened: 2240, clicked: 960 },
    { month: 'May', sent: 2800, opened: 1960, clicked: 840 },
    { month: 'Jun', sent: 3600, opened: 2520, clicked: 1080 },
  ],
  channelData: [
    { name: 'Email', value: 45, color: 'hsl(221.2, 83.2%, 53.3%)' },
    { name: 'SMS', value: 30, color: 'hsl(262.1, 83.3%, 57.8%)' },
    { name: 'WhatsApp', value: 25, color: 'hsl(142, 71%, 45%)' },
  ],
};

export const mockCreditHistory: CreditHistory[] = [
  { id: '1', type: 'purchase', amount: 5000, description: 'Growth Pack Purchase', date: '2024-04-01' },
  { id: '2', type: 'usage', amount: -2450, description: 'Spring Sale Blast Campaign', date: '2024-03-01' },
  { id: '3', type: 'usage', amount: -2400, description: 'Flash Deal SMS Campaign', date: '2024-03-15' },
  { id: '4', type: 'purchase', amount: 10000, description: 'Enterprise Pack Purchase', date: '2024-02-01' },
  { id: '5', type: 'usage', amount: -2400, description: 'New Arrivals WhatsApp', date: '2024-04-01' },
];

export const mockTemplates: DesignTemplate[] = [
  { id: '1', name: 'Summer Sale Banner', category: 'Sale', thumbnail: '', type: 'email' },
  { id: '2', name: 'Diwali Festival', category: 'Festival', thumbnail: '', type: 'instagram' },
  { id: '3', name: 'New Product Launch', category: 'Product Launch', thumbnail: '', type: 'whatsapp' },
  { id: '4', name: 'Flash Sale Alert', category: 'Sale', thumbnail: '', type: 'email' },
  { id: '5', name: 'Christmas Special', category: 'Festival', thumbnail: '', type: 'instagram' },
  { id: '6', name: 'Announcement Card', category: 'Announcement', thumbnail: '', type: 'whatsapp' },
];
