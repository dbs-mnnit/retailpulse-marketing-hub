import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  { name: 'Starter', price: 29, contacts: '1,000', features: ['1,000 contacts', 'Basic analytics', '10 templates', 'Email campaigns', '500 credits/mo'], current: false },
  { name: 'Growth', price: 99, contacts: '10,000', features: ['10,000 contacts', 'Advanced analytics', 'Unlimited templates', 'AI design studio', '5,000 credits/mo', 'SMS & WhatsApp'], current: true, popular: true },
  { name: 'Enterprise', price: 299, contacts: 'Unlimited', features: ['Unlimited contacts', 'Custom analytics', 'White-label', 'Dedicated support', '20,000 credits/mo', 'API access', 'Priority support'], current: false },
];

const billingHistory = [
  { date: '2024-04-01', description: 'Growth Plan - Monthly', amount: '$99.00', status: 'Paid' },
  { date: '2024-03-01', description: 'Growth Plan - Monthly', amount: '$99.00', status: 'Paid' },
  { date: '2024-02-01', description: 'Starter Plan - Monthly', amount: '$29.00', status: 'Paid' },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your plan and billing</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Current Plan: Growth</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div><span className="text-muted-foreground">Price</span><div className="font-semibold">$99/month</div></div>
          <div><span className="text-muted-foreground">Next Billing</span><div className="font-semibold">May 1, 2024</div></div>
          <div><span className="text-muted-foreground">Contacts Used</span><div className="font-semibold">8,420 / 10,000</div></div>
          <div><span className="text-muted-foreground">Credits/mo</span><div className="font-semibold">5,000</div></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`relative bg-background rounded-2xl p-6 shadow-card ${plan.current ? 'ring-2 ring-primary' : ''}`}>
            {plan.current && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">Current</span>}
            <h3 className="font-display font-bold text-lg mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4"><span className="text-3xl font-bold">${plan.price}</span><span className="text-muted-foreground">/mo</span></div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary flex-shrink-0" />{f}</li>)}
            </ul>
            <Button className={`w-full rounded-xl ${plan.current ? '' : 'gradient-bg text-primary-foreground'}`} variant={plan.current ? 'outline' : 'default'} disabled={plan.current}>
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Billing History</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border"><th className="text-left py-3 font-medium text-muted-foreground">Date</th><th className="text-left py-3 font-medium text-muted-foreground">Description</th><th className="text-left py-3 font-medium text-muted-foreground">Amount</th><th className="text-left py-3 font-medium text-muted-foreground">Status</th></tr></thead>
          <tbody>
            {billingHistory.map((b, i) => (
              <tr key={i} className="border-b border-border last:border-0"><td className="py-3">{b.date}</td><td className="py-3">{b.description}</td><td className="py-3 font-medium">{b.amount}</td><td className="py-3"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{b.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
